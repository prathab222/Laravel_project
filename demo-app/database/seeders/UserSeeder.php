<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Role;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        $users = [
            [
                'name' => 'Dr. John Smith',
                'email' => 'doctor@example.com',
                'password' => Hash::make('doctor123'),
                'role' => 'user',
                'role_name' => 'doctor',
                'email_verified_at' => now(),
            ],
            [
                'name' => 'Data Entry User',
                'email' => 'dataentry@example.com',
                'password' => Hash::make('dataentry123'),
                'role' => 'user',
                'role_name' => 'data_entry_operator',
                'email_verified_at' => now(),
            ],
            [
                'name' => 'Patient User',
                'email' => 'patient@example.com',
                'password' => Hash::make('patient123'),
                'role' => 'user',
                'role_name' => 'patient',
                'email_verified_at' => now(),
            ],
            [
                'name' => 'Admin User',
                'email' => 'admin@example.com',
                'password' => Hash::make('admin123'),
                'role' => 'user',
                'role_name' => 'admin',
                'email_verified_at' => now(),
            ],
        ];

        foreach ($users as $userData) {
            $roleName = $userData['role_name'];
            unset($userData['role_name']);
            
            $role = Role::where('name', $roleName)->first();
            if ($role) {
                $userData['app_role_id'] = $role->id;
            }
            
            User::create($userData);
        }
    }
}