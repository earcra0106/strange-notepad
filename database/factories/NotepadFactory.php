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
        $owner = User::factory();
        return [
            'user_id' => $owner,
            'name' => $this->faker->name,
            'expected_modifier_prompt_id' => '',
            'expected_change_prompt_id' => '',
            'modifier_prompt_id' => ModifierPrompt::query()->inRandomOrder()->value('id') ?? ModifierPrompt::factory(),
            'change_prompt_id' => ChangePrompt::query()->inRandomOrder()->value('id') ?? ChangePrompt::factory(),
            'original_user_id' => $owner,
            'is_deleted' => false,
        ];
    }
}
