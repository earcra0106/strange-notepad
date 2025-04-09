<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\NotepadController;
use App\Http\Controllers\PageController;

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
    Route::post('/home', [NotepadController::class, 'store'])->name('notepad.store');
    Route::delete('/home', [NotepadController::class, 'destroy'])->name('notepad.destroy');
    Route::patch('/home/notepad', [NotepadController::class, 'update'])->name('notepad.update');
    Route::patch('/home/page', [PageController::class, 'update'])->name('page.udate');
});

Route::get('/home', [NotepadController::class, 'index'])->name('notepad.index');

require __DIR__.'/auth.php';
