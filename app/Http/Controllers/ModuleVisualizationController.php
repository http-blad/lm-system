<?php

// ModuleVisualizationController for Handling Modules
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ProcessedAssessment;
use App\Models\Assessment;

class ModuleVisualizationController extends Controller
{
    // Visualization Module
    public function visualizationModule()
    {
        // Data for visualization from assessments
        $data = ProcessedAssessment::all();
        // Render visualization view
        return view('visualization', compact('data'));
    }

    // Reading and Writing Module
    public function readingWritingModule()
    {
        // Fetching processed reading and writing assessments
        $assessments = ProcessedAssessment::where('module', 'reading-writing')->get();
        return view('reading-writing', compact('assessments'));
    }

    // Auditory Module
    public function auditoryModule()
    {
        // Fetching auditory learning contents
        $auditoryContents = ProcessedAssessment::where('module', 'auditory')->get();
        return view('auditory', compact('auditoryContents'));
    }

    // Kinesthetic Module
    public function kinestheticModule()
    {
        // Fetching kinesthetic activities and assessments
        $kinestheticData = ProcessedAssessment::where('module', 'kinesthetic')->get();
        return view('kinesthetic', compact('kinestheticData'));
    }
}