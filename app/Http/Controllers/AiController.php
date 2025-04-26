<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use OpenAI\Laravel\Facades\OpenAI;

class AiController extends Controller
{
    public function generate(Request $request)
    {
        $user_input = $request->input('prompt');

        $response = OpenAI::chat()->create([
            'model' => 'gpt-4o-mini',
            'messages' => [
                ['role' => 'system', 'content' => 'あなたは親切なアシスタントです。'],
                ['role' => 'user', 'content' => $user_input],
            ],
        ]);

        return response()->json([
            'result' => $response['choices'][0]['message']['content'],
        ]);
    }
}
