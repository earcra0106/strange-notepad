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
            'modifierPrompts' => ModifierPrompt::where('is_deleted', false)->get(),
            'changePrompts' => ChangePrompt::where('is_deleted', false)->get(),
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

    public function update(Request $request)
    {
        $notepadId = $request->input('notepad_id');
        
        if (!$notepadId) {
            return response()->json(['message' => 'Notepad ID is required'], 400);
        }

        $notepad = Notepad::where('user_id', auth()->id())
            ->where('id', $notepadId)
            ->where('is_deleted', false)
            ->first();

        if (!$notepad) {
            return response()->json(['message' => 'Notepad not found'], 404);
        }

        $newName = $request->input('new_name');
        $newExpectedModifierPrompt_id = $request->input('new_expected_modifier_prompt_id');
        $newExpectedChangePrompt_id = $request->input('new_expected_change_prompt_id');

        $notepad->name = $newName ?? $notepad->name;
        $notepad->expected_modifier_prompt_id = $newExpectedModifierPrompt_id ?? $notepad->expected_modifier_prompt_id;
        $notepad->expected_change_prompt_id = $newExpectedChangePrompt_id ?? $notepad->expected_change_prompt_id;
        $notepad->save();
        $notepad->load(['modifierPrompt', 'changePrompt', 'originalUser', 'pages']);

        return response()->json($notepad);
    }

    public function destroy(Request $request)
    {
        $notepadId = $request->input('notepad_id');
        
        if (!$notepadId) {
            return response()->json(['message' => 'Notepad ID is required'], 400);
        }

        $notepad = Notepad::where('user_id', auth()->id())
            ->where('id', $notepadId)
            ->where('is_deleted', false)
            ->first();
        if ($notepad) {
            $notepad->is_deleted = true;
            $notepad->save();
        }

        return response()->json(['message' => 'Notepad deleted successfully']);
    }
}
