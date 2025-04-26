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

        if ($request->has('new_written_content')) {
            $page->written_content = $request->input('new_written_content')
            ? $request->input('new_written_content')
            : "";
        }
        if ($request->has('new_changed_content')) {
            $page->changed_content = $request->input('new_changed_content')
            ? $request->input('new_changed_content')
            : "";
        }
        if ($request->has('is_changed_by_prompt')) {
            $page->is_changed_by_prompt = $request->input('is_changed_by_prompt');
        }

        $page->save();

        return response()->json($page);
    }
}
