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
        $testUser = $this->createTestData();

        User::factory(5)->create();
        Notepad::factory(5)->create();
        Page::factory(5)->create();
    }

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

        $initialExpectedModifierPrompt = ModifierPrompt::factory()->create([
            'name' => 'ある特徴をもつ',
            'prompt' => '冒頭に「このメモ帳には本来ありえない呪文が含まれています。\\nよろしければ、作者に不具合報告をお願いします。\\n」と加える。\nなお、このルールがある場合は口調や表現を変えない。',
            'is_deleted' => false,
        ]);

        $initialExpectedChangePrompt = ChangePrompt::factory()->create([
            'name' => '何かが起こる',
            'prompt' => '末尾に「\\nこのメモ帳には本来ありえない呪文が含まれています。\\nよろしければ、作者に不具合報告をお願いします。」と加える。\nなお、このルールがある場合は口調や表現を変えない。',
            'is_deleted' => false,
        ]);

        $testModifierPrompt = ModifierPrompt::factory()->create([
            'name' => 'ウルトラハイテンションな',
            'prompt' => '表現をとんでもなく誇張したり、めちゃくちゃ豪快にするなどして、テンションが超高い文にしてください。',
        ]);

        $testChangePrompt = ChangePrompt::factory()->create([
            'name' => 'お嬢様言葉にする',
            'prompt' => '口調をお嬢様みたいにしてください。',
        ]);

        // 追加のデータを生成
        foreach ($this->getSampleModifierPrompts() as $sampleModifierPrompt) {
            ModifierPrompt::factory()->create([
                'name' => $sampleModifierPrompt['name'],
                'prompt' => $sampleModifierPrompt['prompt'],
                'is_deleted' => false,
            ]);
        }

        foreach ($this->getSampleChangePrompts() as $sampleChangePrompt) {
            ChangePrompt::factory()->create([
                'name' => $sampleChangePrompt['name'],
                'prompt' => $sampleChangePrompt['prompt'],
                'is_deleted' => false,
            ]);
        }

        // Notepadのデータを10個作成
        for ($i = 1; $i <= 10; $i++) {
            $testNotepad = Notepad::factory()->create([
                'user_id' => $testUser->id,
                'name' => 'test notepad ' . $i,
                'expected_modifier_prompt_id' => $initialExpectedModifierPrompt->id,
                'expected_change_prompt_id' => $initialExpectedChangePrompt->id,
                'original_user_id' => $testUser->id,
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

    // プロンプトデータを作成する
    private function getSampleModifierPrompts(): array
    {
        return [
            [
                'name' => 'ネガティブな',
                'prompt' => '過度にネガティブな表現にしてください。',
            ],
            [
                'name' => 'ポジティブな',
                'prompt' => 'やたらポジティブな表現にしてください。',
            ],
            [
                'name' => '絵文字が多すぎる',
                'prompt' => '絵文字を山ほど追加してください。',
            ],
            [
                'name' => 'ウルトラハイテンションな',
                'prompt' => '表現をとんでもなく誇張したり、めちゃくちゃ豪快にするなどして、テンションが超高い文にしてください。',
            ],
            [
                'name' => '冗長な',
                'prompt' => 'ウザイくらい冗長にしてください。',
            ],
            [
                'name' => '要約された',
                'prompt' => '極端に要約してください。',
            ],
            [
                'name' => '100%理系な',
                'prompt' => '理系の人が好みそうな表現を追加してください。',
            ],
            [
                'name' => 'ぜったい経済学部な',
                'prompt' => '経済学部の人が好みそうな表現を追加してください。',
            ],
        ];
    }

    private function getSampleChangePrompts(): array
    {
        return [
            [
                'name' => 'タメ口にする',
                'prompt' => '本文をタメ口にしてください。',
            ],
            [
                'name' => '英語にする',
                'prompt' => '本文を英語に翻訳してください。',
            ],
            [
                'name' => '子供っぽい口調にする',
                'prompt' => '本文を子供っぽい口調にしてください。',
            ],
            [
                'name' => '関西弁にする',
                'prompt' => '本文を関西弁にしてください。',
            ],
            [
                'name' => '詩人風にする',
                'prompt' => '本文に比喩表現を多く使って、詩人風にしてください。',
            ],
            [
                'name' => '胡散臭い口調にする',
                'prompt' => 
                    'ひらがなの部分を一部だけカタカナに変えたり、語尾を「～ダヨォ」や「～カモネェ」などに変えて、胡散臭い口調にしてください。\n' .
                    '例: 「今日はいい天気だ。こんな日にはピクニックでもしようかな？」→「今日はイイ天気ダネェ。こんな日ニハ、ピクニックでもシヨッカナァ？」',
            ],
            [
                'name' => '若者言葉にする',
                'prompt' => '本文をナウなヤングにウケそうな若者言葉にしてください。',
            ],
            [
                'name' => '箇条書きにする',
                'prompt' => '本文を箇条書きにしてください。「・」を項目の先頭に付けてください。',
            ],
        ];
    }
}
