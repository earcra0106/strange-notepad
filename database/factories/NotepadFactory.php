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
        $owner = User::factory()->create();
        
        $expectedModifierPrompt = ModifierPrompt::query()
            ->orderBy('id', 'asc')
            ->first() ?? ModifierPrompt::factory()->create();

        $expectedChangePrompt = ChangePrompt::query()
            ->orderBy('id', 'asc')
            ->first() ?? ChangePrompt::factory()->create();

        $modifierPrompt = ModifierPrompt::query()
            ->where('id' , '!=', $expectedModifierPrompt->id)
            ->where('is_deleted', false)
            ->inRandomOrder()
            ->first() ?? ModifierPrompt::factory()->create();
        
        $changePrompt = ChangePrompt::query()
            ->where('id' , '!=', $expectedChangePrompt->id)
            ->where('is_deleted', false)
            ->inRandomOrder()
            ->first() ?? ChangePrompt::factory()->create();

        return [
            'user_id' => $owner->id,
            'name' => '未知のメモ帳',
            'expected_modifier_prompt_id' => $expectedModifierPrompt->id,
            'expected_change_prompt_id' => $expectedChangePrompt->id,
            'modifier_prompt_id' => $modifierPrompt->id,
            'change_prompt_id' => $changePrompt->id,
            'original_user_id' => $owner->id,
            'is_deleted' => false,
        ];
    }
}
