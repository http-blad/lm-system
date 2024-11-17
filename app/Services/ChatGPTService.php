<?php
// ChatGPTService to Handle ChatGPT API Integration Including Modules

namespace App\Services;

use Illuminate\Support\Facades\Http;

class ChatGPTService
{
    protected $apiEndpoint;
    protected $apiKey;

    public function __construct()
    {
        $this->apiEndpoint = env('https://api.openai.com/v1/chat/completions');
        $this->apiKey = env('CHATGPT_API_KEY');
    }

    public function processModuleContent($text, $module)
    {
        // Custom prompt for each module
        $prompt = $this->getModulePrompt($text, $module);

        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . $this->apiKey,
        ])->post($this->apiEndpoint, [
            'prompt' => $prompt,
            'max_tokens' => 1000,
        ]);

        if ($response->successful()) {
            return $response->json()['choices'][0]['text'];
        }

        throw new \Exception('Error communicating with ChatGPT API');
    }

    protected function getModulePrompt($text, $module)
    {
        switch ($module) {
            case 'visualization':
                return "Analyze the following content and provide key highlights suitable for visualization:\n" . $text;
            case 'reading-writing':
                return "Provide a summary and generate questions that would help a Grade 12 student enhance their reading and writing skills based on this content:\n" . $text;
            case 'auditory':
                return "Convert the following content into a script suitable for auditory learning:\n" . $text;
            case 'kinesthetic':
                return "Create a set of kinesthetic activities for students to better understand the following topic:\n" . $text;
            default:
                throw new \Exception('Unknown module type provided');
        }
    }

    public function generatePreTestAndPostTest($content)
    {
        // Custom prompt to generate pre-test and post-test questions from given content
        $prompt = "Generate a pre-test and a post-test based on the following content:\n$content";

        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . $this->apiKey,
        ])->post($this->apiEndpoint, [
            'prompt' => $prompt,
            'max_tokens' => 1000,
        ]);

        if ($response->successful()) {
            return $response->json()['choices'][0]['text'];
        }

        throw new \Exception('Error communicating with ChatGPT API for generating pre- and post-tests');
    }
}
