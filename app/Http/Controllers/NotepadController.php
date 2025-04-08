<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use \App\Models\Notepad;
use \App\Models\Page;
use \App\Models\ModifierPrompt;
use \App\Models\ChangePrompt;

class NotepadController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $notepads = Notepad::where('user_id', auth()->id())
            ->with(['modifierPrompt', 'changePrompt', 'originalUser', 'pages'])
            ->where('is_deleted', false)
            ->get();

        return Inertia::render('Main/Home', [
            'notepads' => $notepads,
        ]);
    }

    public function store(Request $request)
    {
        $modifierPrompt = \App\Models\ModifierPrompt::where('is_deleted', false)->inRandomOrder()->first();
        $changePrompt = \App\Models\ChangePrompt::where('is_deleted', false)->inRandomOrder()->first();

        $notepad = Notepad::factory()->create([
            'user_id' => auth()->id(),
            'name' => '未知のメモ帳',
            'expected_modifier_prompt_id' => null,
            'expected_change_prompt_id' => null,
            'modifier_prompt_id' => $modifierPrompt->id,
            'change_prompt_id' => $changePrompt->id,
            'original_user_id' => auth()->id(),
            'is_deleted' => false,
        ]);

        // Pageのデータを10個作成
        for ($i = 1; $i <= 10; $i++) {
            Page::factory()->create([
                'notepad_id' => $notepad->id,
                'page_number' => $i,
                'written_content' => '',
                'changed_content' => '',
            ]);
        }

        $notepad->load(['modifierPrompt', 'changePrompt', 'originalUser', 'pages']);

        return response()->json($notepad);
    }

    public function show(Notepad $notepad)
    {
        return Inertia::render('Notepad/Show', [
            'notepad' => $notepad->load(['modifierPrompt', 'changePrompt', 'originalUser']),
        ]);
    }
}
