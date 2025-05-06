<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ModifierPrompt>
 */
class ModifierPromptFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => 'テストの特徴をもつ',
            'prompt' => '本文の末尾に「\\nテストの特徴です。」と加える。',
            'is_deleted' => false,
        ];
    }
}
