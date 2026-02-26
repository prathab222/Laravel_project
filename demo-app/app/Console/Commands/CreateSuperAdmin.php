<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Hash;

class CreateSuperAdmin extends Command
{
    protected $signature = 'make:super-admin {--email=admin@admin.com} {--password=admin123} {--name=Super Admin}';
    protected $description = 'Create a super admin user';

    public function handle()
    {
        $email = $this->option('email');
        $password = $this->option('password');
        $name = $this->option('name');

        if (User::where('email', $email)->exists()) {
            $this->error("User with email {$email} already exists!");
            return 1;
        }

        $user = User::create([
            'name' => $name,
            'email' => $email,
            'password' => Hash::make($password),
            'role' => 'super_admin',
            'email_verified_at' => now(),
        ]);

        $this->info("Super admin created successfully!");
        $this->info("Email: {$email}");
        $this->info("Password: {$password}");
        $this->warn("Please change the password after first login!");

        return 0;
    }
}