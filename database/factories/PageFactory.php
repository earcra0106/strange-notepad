<?php

namespace Database\Factories;

use App\Models\Notepad;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Page>
 */
class PageFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'notepad_id' => Notepad::factory(),
            'page_number' => $this->faker->numberBetween(1, 100),
            'written_content' => $this->faker->realText(50, 2),
            'changed_content' => $this->faker->realText(50, 2),
        ];
    }
}
