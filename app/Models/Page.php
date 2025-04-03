<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUlids;

class Page extends Model
{
    use HasUlids;

    protected $fillable = [
        'notepad_id', 'page_number', 'written_content', 'changed_content'
    ];

    public function notepad()
    {
        return $this->belongsTo(Notepad::class);
    }
}
