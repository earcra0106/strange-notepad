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
    /*
     * テストデータ一式を生成する。
     */
    private function createTestData(): User
    {
        $testUser = User::factory()->create([
            'name' => 'test',
            'email' => 'test@test',
            'password' => bcrypt('test'),
        ]);

        $testModifierPrompt = ModifierPrompt::factory()->create([
            'name' => 'テストの特徴をもつ',
            'prompt' => 'test modifier prompt',
            'is_deleted' => false,
        ]);

        $testChangePrompt = ChangePrompt::factory()->create([
            'name' => 'テストの変更をする',
            'prompt' => 'test change prompt',
            'is_deleted' => false,
        ]);

        // Notepadのデータを10個作成
        for ($i = 1; $i <= 10; $i++) {
            $testNotepad = Notepad::factory()->create([
                'user_id' => $testUser->id,
                'name' => 'test notepad ' . $i,
                'modifier_prompt_id' => $testModifierPrompt->id,
                'change_prompt_id' => $testChangePrompt->id,
                'original_user_id' => $testUser->id,
                'is_deleted' => false,
            ]);

            // Pageのデータを10個作成
            for ($j = 1; $j <= 10; $j++) {
                Page::factory()->create([
                    'notepad_id' => $testNotepad->id,
                    'page_number' => $j,
                    'written_content' => 'notepad ' . $i . ' test written text on page ' . $j,
                    'changed_content' => 'notepad ' . $i . ' test changed text on page ' . $j,
                ]);
            }
        }

        return $testUser;
    }

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $testUser = $this->createTestData();

        // 追加のデータを生成
        User::factory(5)->create();
        ModifierPrompt::factory(5)->create();
        ChangePrompt::factory(5)->create();
        Notepad::factory(5)->create();
        Page::factory(5)->create();
    }
}
