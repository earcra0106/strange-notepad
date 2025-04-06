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
        $pages = Page::whereIn('notepad_id', $notepads->pluck('id'))->get();

        // メモ帳のページ数をカウント
        $notepads->each(function ($notepad) use ($pages) {
            $notepad->page_count = $pages->where('notepad_id', $notepad->id)->count();
        });
        
        return Inertia::render('Home', [
            'notepads' => $notepads,
            'pages' => $pages,
        ]);
    }
}
