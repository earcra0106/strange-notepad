<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use \App\Models\Page;

class PageController extends Controller
{
    public function update(Request $request)
    {
        $pageId = $request->input('page_id');
        
        if (!$pageId) {
            return response()->json(['message' => 'Page ID is required'], 400);
        }

        $page = Page::where('id', $pageId)
            ->first();

        if (!$page) {
            return response()->json(['message' => 'Page not found'], 404);
        }

        $newWrittenContent = $request->input('new_written_content');
        $newChangedContent = $request->input('new_changed_content');

        $page->written_content = $newWrittenContent ?? $page->written_content;
        $page->changed_content = $newChangedContent ?? $page->changed_content;
        $page->is_changed_by_prompt = $request->input('is_changed_by_prompt', false);
        $page->save();

        return response()->json($page);
    }
}
