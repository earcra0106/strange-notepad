<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Concerns\HasUlids;

class Notepad extends Model
{
    use HasFactory, HasUlids;

    protected $fillable = [
        'user_id',
        'name',
        'expected_modifier_prompt_id',
        'expected_change_prompt_id',
        'modifier_prompt_id',
        'change_prompt_id',
        'original_user_id',
        'is_deleted',
    ];

    // リレーション
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function modifierPrompt()
    {
        return $this->belongsTo(ModifierPrompt::class);
    }

    public function changePrompt()
    {
        return $this->belongsTo(ChangePrompt::class);
    }

    public function originalUser()
    {
        return $this->belongsTo(User::class, 'original_user_id');
    }

    public function pages()
    {
        return $this->hasMany(Page::class);
    }
}
