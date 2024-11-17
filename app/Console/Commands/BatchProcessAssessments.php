<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Services\ChatGPTService;
use App\Services\PDFConverterService;
use App\Services\GoogleTTSService;
use Illuminate\Support\Facades\Log;
use App\Models\Assessment;
use App\Models\ProcessedAssessment;
use Throwable;

class BatchProcessAssessments extends Command
{
    protected $signature = 'assessments:batch-process';

    protected $description = 'Batch process assessments using ChatGPT API';

    protected $chatGPTService;
    protected $pdfConverterService;
    protected $googleTTSService;

    public function __construct(ChatGPTService $chatGPTService, PDFConverterService $pdfConverterService, GoogleTTSService $googleTTSService)
    {
        parent::__construct();
        $this->chatGPTService = $chatGPTService;
        $this->pdfConverterService = $pdfConverterService;
        $this->googleTTSService = $googleTTSService;
    }

    public function handle()
    {
        try {
            // Fetching unprocessed assessments
            $assessments = Assessment::where('status', 'unprocessed')->limit(10)->get();

            foreach ($assessments as $assessment) {
                // Convert PDF to text if necessary
                if ($assessment->file_path && $assessment->module === 'pdf') {
                    $content = $this->pdfConverterService->convertPDFToText($assessment->file_path);
                } else {
                    $content = $assessment->content;
                }

                // Processing each assessment using ChatGPT API
                $response = $this->chatGPTService->processText($content);

                // Handling Google TTS if module is auditory
                if ($assessment->module === 'auditory') {
                    $outputFileName = 'assessment_' . $assessment->id . '.mp3';
                    $ttsFilePath = $this->googleTTSService->convertTextToSpeech($response, $outputFileName);
                    $response .= "\n Audio version created at: " . $ttsFilePath;
                }

                // Storing processed result in the database
                ProcessedAssessment::create([
                    'assessment_id' => $assessment->id,
                    'processed_content' => $response,
                ]);

                // Updating assessment status to processed
                $assessment->update(['status' => 'processed']);
            }

            $this->info('Batch processing of assessments completed successfully.');
        } catch (Throwable $e) {
            Log::error('Error occurred during batch processing: ' . $e->getMessage());
            $this->error('An error occurred during batch processing. Please check logs for details.');
        }
    }
}
