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
        // マスタデータを作成する
        foreach ($this->getMasterModifierPrompt() as $masterData) {
            ModifierPrompt::factory()->create([
                'name' => $masterData['name'],
                'prompt' => $masterData['prompt'],
                'is_deleted' => false,
            ]);
        }

        foreach ($this->getMasterChangePrompts() as $masterData) {
            ChangePrompt::factory()->create([
                'name' => $masterData['name'],
                'prompt' => $masterData['prompt'],
                'is_deleted' => false,
            ]);
        }

        if (app()->isLocal()) {
            $testUser = $this->createTestData();
        }
    }

    /*
     * テストデータを作成する
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
            'prompt' => '冒頭に「このメモ帳には本来ありえないジュモンが含まれています。\nよろしければ、作者に不具合の起きた状況をお伝えください。\n」と加えてください。\nなお、このルールがある場合は口調や表現を変えないでください。',
            'is_deleted' => false,
        ]);

        $initialExpectedChangePrompt = ChangePrompt::factory()->create([
            'name' => '何かが起こる',
            'prompt' => '末尾に「\nこのメモ帳には本来ありえないジュモンが含まれています。\nよろしければ、作者に不具合の起きた状況をお伝えください。」と加えてください。\nなお、このルールがある場合は口調や表現を変えないでください。',
            'is_deleted' => false,
        ]);

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
    private function getMasterModifierPrompt(): array
    {
        return [
            [
                'name' => 'ネガティブな',
                'prompt' => '過度にネガティブな表現にしてください。\n
                例: 「今日は雨が降っている。」→「今日は雨が降っていて、どうしようもなく気分が沈む。」',
            ],
            [
                'name' => 'ポジティブな',
                'prompt' => 'やたらポジティブな表現にしてください。\n
                例: 「今日は雨が降っている。」→「今日は雨が降っていて、自然の恵みを感じる素晴らしい日だ！」',
            ],
            [
                'name' => '絵文字が多すぎる',
                'prompt' => '絵文字を山ほど追加してください。\n
                例: 「今日は雨が降っている。」→「今日は雨が降っているよ☔️😭🌧️😱💦🌂😢🌈」',
            ],
            [
                'name' => 'ウルトラハイテンションな',
                'prompt' => '表現をとんでもなく誇張したり、めちゃくちゃ豪快にするなどして、テンションが超高い文にしてください。\n
                例: 「今日は雨が降っている。」→「やっばーーーい！！今日は雨がドッシャーーーンと降ってて、テンション爆上がりだぜぇぇぇ！！！」',
            ],
            [
                'name' => '嘘過ぎる',
                'prompt' => 'あらゆる内容において元の文章と反対の内容にしてください。\n
                例: 「今日は雨が降っている。」→「今日は晴れだ。」',
            ],
            [
                'name' => '要約された',
                'prompt' => '極端に要約してください。極端に。\n
                例: 「今日は雨が降っている。」→「雨。」',
            ],
            [
                'name' => 'アナウンサーっぽい',
                'prompt' => 'アナウンサーのような情報的な表現にしてください。\n
                例: 「今日は雨が降っている。」→「本日は、全国的に降雨が観測されており、特に関東地方では強い雨が降り続いております。」',
            ],
            [
                'name' => 'コミュ障な',
                'prompt' => 'コミュ障の人が話すような語彙力を絞った表現にしてください。\n
                例: 「今日は雨が降っている。」→「あの、今日は、雨が、降ってるんですよね…」',
            ],
            [
                'name' => 'クソデカ',
                'prompt' => '形容詞をやかましいくらい派手に付け足してください。テンションは元の文章を維持してください。\n
                例: 「今日は雨が降っている。」→「今日というこの日は、街一帯を押し流すレベルの猛烈な雨が歴史的な勢いで降り注ぎまくっている。」',
            ],
        ];
    }

    private function getMasterChangePrompts(): array
    {
        return [
            [
                'name' => 'お嬢様言葉にする',
                'prompt' => '口調をお嬢様みたいにしてください。\n
                例: 「あなたはとても素敵な方ですね。」→「あなた様はとても素敵な方でいらっしゃいますわ。」',
            ],
            [
                'name' => 'タメ口にする',
                'prompt' => '本文をタメ口にしてください。\n
                例: 「あなたはとても素敵な方ですね。」→「お前、めっちゃいいやつじゃん。」',
            ],
            [
                'name' => 'クールな感じにする',
                'prompt' => '本文をクールでキザな口調にしてください。\n
                例: 「あなたはとても素敵な方ですね。」→「君は、なかなかいいセンスを持っているようだ。」',
            ],
            [
                'name' => '子供っぽい口調にする',
                'prompt' => '本文を子供っぽい口調にしてください。\n
                例: 「あなたはとても素敵な方ですね。」→「キミってすっごくいい人だね！」',
            ],
            [
                'name' => '関西弁にする',
                'prompt' => '本文を関西弁にしてください。\n
                例: 「あなたはとても素敵な方ですね。」→「あんた、めっちゃええ人やな。」',
            ],
            [
                'name' => '詩人風にする',
                'prompt' => '本文に比喩表現を多く使って、詩人風にしてください。\n
                例: 「あなたはとても素敵な方ですね。」→「あなた様は、まるで春の陽射しのように、心を温めてくださる存在でございます。」',
            ],
            [
                'name' => 'ギャルにする',
                'prompt' => '本文をギャルっぽい口調にしてください。\n
                例: 「あなたはとても素敵な方ですね。」→ 「あんた、マジでイケてるじゃん」',
            ],
            [
                'name' => '箇条書きにする',
                'prompt' => '本文を箇条書きにしてください。「・」を項目の先頭に付けてください。\n
                例: 「あなたはとても素敵な方ですね。」→「・あなたはとても素敵な方です。\n・あなたの存在は素晴らしいです。」',
            ],
            [
                'name' => 'ハゲ',
                'prompt' => '「ハゲ」という言葉を織り交ぜた文章にしてください。\n
                例: 「あなたはとても素敵な方ですね。」→ 「あなたはとても素敵なハゲですね。」',
            ],
        ];
    }
}
