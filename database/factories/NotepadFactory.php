<?php

namespace Database\Factories;

use App\Models\User;
use App\Models\ModifierPrompt;
use App\Models\ChangePrompt;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Notepad>
 */
class NotepadFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        // デフォルトのModifierPromptとChangePromptを取得
        $expectedModifierPrompt = ModifierPrompt::query()
            ->orderBy('id', 'asc')
            ->first();

        $expectedChangePrompt = ChangePrompt::query()
            ->orderBy('id', 'asc')
            ->first();

        // ランダムに選択されたModifierPromptとChangePromptを取得
        // 一番最初のものを除外してランダムに選ぶ
        $modifierPrompt = ModifierPrompt::query()
            ->where('id' , '!=', $expectedModifierPrompt->id)
            ->where('is_deleted', false)
            ->inRandomOrder()
            ->first();
        
        $changePrompt = ChangePrompt::query()
            ->where('id' , '!=', $expectedChangePrompt->id)
            ->where('is_deleted', false)
            ->inRandomOrder()
            ->first();

        return [
            'name' => '未知のメモ帳',
            'expected_modifier_prompt_id' => $expectedModifierPrompt->id,
            'expected_change_prompt_id' => $expectedChangePrompt->id,
            'modifier_prompt_id' => $modifierPrompt->id,
            'change_prompt_id' => $changePrompt->id,
            'is_deleted' => false,
        ];
    }
}
