<?php

namespace Database\Factories;

use App\Models\Notepad;
use App\Models\Page;
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
        $notepadId = Notepad::query()->inRandomOrder()->value('id') ?? Notepad::factory()->create()->id;

        $maxPageNumber = Page::where('notepad_id', $notepadId)->max('page_number') ?? 0;

        return [
            'notepad_id' => $notepadId,
            'page_number' => $maxPageNumber + 1,
            'written_content' => '',
            'changed_content' => '',
            'is_changed_by_prompt' => false,
        ];
    }
}
