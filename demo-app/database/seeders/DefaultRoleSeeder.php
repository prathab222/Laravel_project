<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Seeder;

class DefaultRoleSeeder extends Seeder
{
    public function run(): void
    {
        // Delete existing roles safely
        Role::query()->delete();
        
        $roles = [
            [
                'name' => 'admin',
                'display_name' => 'Administrator',
                'description' => 'Manage doctors and patients, view dashboards, generate reports',
                'permissions' => [
                    'users.view', 'users.create', 'users.edit', 'users.delete',
                    'doctors.view', 'doctors.create', 'doctors.edit', 'doctors.delete',
                    'patients.view', 'patients.create', 'patients.edit', 'patients.delete',
                    'analytics.view', 'reports.view', 'reports.export',
                ],
            ],
            [
                'name' => 'doctor',
                'display_name' => 'Doctor',
                'description' => 'Create questionnaires, manage patient data, generate reports',
                'permissions' => [
                    'questionnaires.view', 'questionnaires.create', 'questionnaires.edit', 'questionnaires.delete',
                    'patient-data.view', 'patient-data.create', 'patient-data.edit', 'patient-data.delete',
                    'patients.view', 'reports.view',
                ],
            ],
            [
                'name' => 'data_entry_operator',
                'display_name' => 'Data Entry Operator',
                'description' => 'Enter and update patient data only',
                'permissions' => [
                    'patient-data.view', 'patient-data.create', 'patient-data.edit',
                    'patients.view',
                ],
            ],
            [
                'name' => 'patient',
                'display_name' => 'Patient',
                'description' => 'Fill questionnaires, upload reports, view results',
                'permissions' => [
                    'questionnaires.view',
                    'file-uploads.create', 'file-uploads.view',
                    'patient-data.view',
                ],
            ],
        ];

        foreach ($roles as $roleData) {
            Role::create($roleData);
        }
    }
}