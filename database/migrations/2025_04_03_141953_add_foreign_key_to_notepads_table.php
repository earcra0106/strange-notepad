<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('notepads', function (Blueprint $table) {
            $table->ulid('user_id')->after('id')->nullable();
            $table->foreign('user_id')
                ->references('id')
                ->on('users')
                ->cascadeOnDelete()
                ->cascadeOnUpdate();

            $table->ulid('modifier_prompt_id')->after('explained_change_prompt_id')->nullable();
            $table->foreign('modifier_prompt_id')
                ->references('id')
                ->on('modifier_prompts')
                ->onDelete('set null')
                ->cascadeOnUpdate();

            $table->ulid('change_prompt_id')->after('modifier_prompt_id')->nullable();
            $table->foreign('change_prompt_id')
                ->references('id')
                ->on('change_prompts')
                ->onDelete('set null')
                ->cascadeOnUpdate();

            $table->ulid('original_user_id')->after('change_prompt_id')->nullable();
            $table->foreign('original_user_id')
                ->references('id')
                ->on('users');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('notepads', function (Blueprint $table) {
            $table->dropForeign(['user_id']);
            $table->dropColumn('user_id');

            $table->dropForeign(['modifier_prompt_id']);
            $table->dropColumn('modifier_prompt_id');

            $table->dropForeign(['change_prompt_id']);
            $table->dropColumn('change_prompt_id');

            $table->dropForeign(['original_user_id']);
            $table->dropColumn('original_user_id');
        });
    }
};
