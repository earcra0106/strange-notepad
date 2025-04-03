<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUlids;

class Notepad extends Model
{
    use HasUlids;

    protected $fillable = [
        'user_id',
        'expected_modifier_prompt_id',
        'expected_change_prompt_id',
        'original_user_id',
        
    ];

    // リレーション
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function modifierPrompt()
    {
        return $this->belongsTo(ModifierPrompt::class, 'expected_modifier_prompt_id');
    }

    public function changePrompt()
    {
        return $this->belongsTo(ChangePrompt::class, 'expected_change_prompt_id');
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
