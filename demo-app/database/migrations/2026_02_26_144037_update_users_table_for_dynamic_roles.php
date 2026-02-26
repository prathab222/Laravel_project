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
        Schema::table('users', function (Blueprint $table) {
            if (!Schema::hasColumn('users', 'app_role_id')) {
                $table->foreignId('app_role_id')->nullable()->constrained('app_roles')->onDelete('set null');
            }
            if (!Schema::hasColumn('users', 'permissions')) {
                $table->json('permissions')->nullable();
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            if (Schema::hasColumn('users', 'app_role_id')) {
                $table->dropForeign(['app_role_id']);
                $table->dropColumn('app_role_id');
            }
            if (Schema::hasColumn('users', 'permissions')) {
                $table->dropColumn('permissions');
            }
        });
    }
};
