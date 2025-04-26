<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ChangePrompt>
 */
class ChangePromptFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => 'テストの変更をする',
            'prompt' => '本文の冒頭に「これはテストの変更です。\\n」と加える。',
            'is_deleted' => false,
        ];
    }
}
