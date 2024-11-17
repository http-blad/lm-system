<?php
// GoogleTTSService to Handle Text to Speech Conversion 

namespace App\Services;

use Google\Cloud\TextToSpeech\V1\TextToSpeechClient;
use Google\Cloud\TextToSpeech\V1\SynthesisInput;
use Google\Cloud\TextToSpeech\V1\VoiceSelectionParams;
use Google\Cloud\TextToSpeech\V1\AudioConfig;
use Google\Cloud\TextToSpeech\V1\AudioEncoding;
use Illuminate\Support\Facades\Storage;

class GoogleTTSService
{
    protected $textToSpeechClient;

    public function __construct()
    {
        $this->textToSpeechClient = new TextToSpeechClient([
            'credentials' => json_decode(env('GOOGLE_APPLICATION_CREDENTIALS_JSON'), true)
        ]);
    }

    public function convertTextToSpeech($text, $outputFileName)
    {
        // Set the text input to be synthesized
        $synthesisInputText = (new SynthesisInput())
            ->setText($text);

        // Build the voice request, select the language code and the voice
        $voice = (new VoiceSelectionParams())
            ->setLanguageCode('en-US')
            ->setSsmlGender(
                VoiceSelectionParams\SsmlVoiceGender::NEUTRAL
            );

        // Select the type of audio file to return
        $audioConfig = (new AudioConfig())
            ->setAudioEncoding(AudioEncoding::MP3);

        // Perform the text-to-speech request on the text input with the selected voice parameters and audio file type
        $response = $this->textToSpeechClient->synthesizeSpeech($synthesisInputText, $voice, $audioConfig);

        // Get the audio content from the response
        $audioContent = $response->getAudioContent();

        // Save the audio content to a local file
        $filePath = 'tts_output/' . $outputFileName;
        Storage::disk('local')->put($filePath, $audioContent);

        return $filePath;
    }
}
