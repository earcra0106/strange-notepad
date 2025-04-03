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
        User::factory(5)->create();

        // User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
        
        ModifierPrompt::factory(5)->create();
        ChangePrompt::factory(5)->create();
        Notepad::factory(5)->create();
        Page::factory(5)->create();
    }
}
