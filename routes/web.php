<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\NotepadController;
use App\Http\Controllers\PageController;
use App\Http\Controllers\ChatController;

Route::get('/', function () {
    return redirect('/home');
    // return Inertia::render('Welcome', [
    //     'canLogin' => Route::has('login'),
    //     'canRegister' => Route::has('register'),
    //     'laravelVersion' => Application::VERSION,
    //     'phpVersion' => PHP_VERSION,
    // ]);
});

Route::get('/dashboard', function () {
    return redirect('/home');
    // return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::prefix('notepad')->group(function () {
        Route::post('/', [NotepadController::class, 'store'])->name('notepad.store');
        Route::patch('/', [NotepadController::class, 'update'])->name('notepad.update');
        Route::delete('/', [NotepadController::class, 'destroy'])->name('notepad.destroy');
        Route::patch('/page', [PageController::class, 'update'])->name('page.update');
    });
});

Route::get('/home', [NotepadController::class, 'index'])->name('notepad.index');

require __DIR__.'/auth.php';
