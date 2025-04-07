<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use \App\Models\Notepad;
use \App\Models\Page;

class NotepadController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // ユーザーのメモ帳を取得
        $notepads = Notepad::where('user_id', auth()->id())
            ->with(['modifierPrompt', 'changePrompt', 'originalUser', 'pages'])
            ->where('is_deleted', false)
            ->get();

        // メモ帳に紐づいたページを取得
        $pages = Page::whereIn('notepad_id', $notepads->pluck('id'))
            ->orderBy('page_number')
            ->get();

        return Inertia::render('Main/Home', [
            'notepads' => $notepads,
            'pages' => $pages,
        ]);
    }

    public function create()
    {
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string|max:1000',
        ]);

        $notepad = Notepad::create([
            'user_id' => auth()->id(),
            'title' => $request->title,
            'description' => $request->description,
        ]);

        return redirect()->route('notepad.index')->with('success', 'Notepad created successfully.');
    }

    public function show(Notepad $notepad)
    {
        return Inertia::render('Notepad/Show', [
            'notepad' => $notepad->load(['modifierPrompt', 'changePrompt', 'originalUser']),
        ]);
    }
}
