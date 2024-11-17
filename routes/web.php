<?php

use Illuminate\Support\Facades\Route;

require __DIR__.'/auth.php';

use App\Http\Controllers\ModuleVisualizationController;

// Web Routes for Modules 
Route::get('/visualization', [ModuleVisualizationController::class, 'visualizationModule']);
Route::get('/reading-writing', [ModuleVisualizationController::class, 'readingWritingModule']);
Route::get('/auditory', [ModuleVisualizationController::class, 'auditoryModule']);
Route::get('/kinesthetic', [ModuleVisualizationController::class, 'kinestheticModule']);