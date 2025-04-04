<?php

namespace App\Http\Controllers;

use App\Models\Notepad;
use Illuminate\Http\Request;
use Inertia\Inertia;

class NotepadController extends Controller
{
    public function index() {
        // $notepads = Notepad::all();
        $notepads = Notepad::with('pages')->get();

        return Inertia::render('Home', [
            'notepads' => $notepads,
        ]);
    }
}
