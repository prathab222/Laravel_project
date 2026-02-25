<?php

use App\Models\User;
use Illuminate\Support\Facades\Artisan;

test('manual migration works', function () {
    $exitCode = Artisan::call('migrate:fresh', [
        '--force' => true,
    ]);

    echo "Migration Exit Code: " . $exitCode . "\n";
    echo "Migration Output: " . Artisan::output() . "\n";

    $user = User::factory()->create();

    expect($user->exists)->toBeTrue();
    expect(User::count())->toBe(1);
});
