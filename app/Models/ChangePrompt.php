<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUlids;

class ChangePrompt extends Model
{
    use HasUlids;
    
    protected $fillable = [
        'name',
        'prompt',
        'is_deleted',
    ];
}
