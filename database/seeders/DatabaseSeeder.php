<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\ModifierPrompt;
use App\Models\ChangePrompt;
use App\Models\Notepad;
use App\Models\Page;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $testUser = User::factory()->create([
            'name' => 'test',
            'email' => 'test@test',
            'password' => bcrypt('test'),
        ]);

        $testModifierPrompt = ModifierPrompt::factory()->create([
            'name' => 'test',
            'prompt' => 'test',
            'is_deleted' => false,
        ]);

        $testChangePrompt = ChangePrompt::factory()->create([
            'name' => 'test',
            'prompt' => 'test',
            'is_deleted' => false,
        ]);

        $testNotepad = Notepad::factory()->create([
            'user_id' => $testUser->id,
            'name' => 'test',
            'modifier_prompt_id' => $testModifierPrompt->id,
            'change_prompt_id' => $testChangePrompt->id,
            'original_user_id' => $testUser->id,
            'is_deleted' => false,
        ]);

        $testpages = [];
        for ($i = 1; $i <= 10; $i++) {
            $testpages[] = Page::factory()->create([
                'notepad_id' => $testNotepad->id,
                'page_number' => $i,
                'changed_content' => 'test changed text on page ' . $i,
            ]);
        }

        // 追加のデータを生成
        User::factory(5)->create();
        ModifierPrompt::factory(5)->create();
        ChangePrompt::factory(5)->create();
        Notepad::factory(5)->create();
        Page::factory(5)->create();
    }
}
