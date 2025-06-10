<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AiController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/ai/generate', [AiController::class, 'generate'])->name('ai.generate');
Route::post('/ai/change-note-content', [AiController::class, 'changeNoteContent'])->name('ai.changeNoteContent');