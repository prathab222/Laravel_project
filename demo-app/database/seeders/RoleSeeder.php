<?php

namespace Database\Seeders;

use App\Models\Role;
use App\Models\Permission;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    public function run(): void
    {
        // Define permissions
        $permissions = [
            // System Management
            ['name' => 'manage_system', 'description' => 'Full system control'],
            ['name' => 'manage_roles', 'description' => 'Manage user roles'],
            ['name' => 'configure_templates', 'description' => 'Configure system templates'],
            ['name' => 'view_analytics', 'description' => 'View system analytics'],
            
            // User Management
            ['name' => 'manage_doctors', 'description' => 'Manage doctor accounts'],
            ['name' => 'manage_patients', 'description' => 'Manage patient accounts'],
            ['name' => 'manage_users', 'description' => 'Manage all users'],
            
            // Dashboard & Reports
            ['name' => 'view_dashboard', 'description' => 'View dashboard'],
            ['name' => 'generate_reports', 'description' => 'Generate reports'],
            ['name' => 'view_reports', 'description' => 'View reports'],
            
            // Questionnaire Management
            ['name' => 'create_questionnaires', 'description' => 'Create questionnaires'],
            ['name' => 'manage_questionnaires', 'description' => 'Manage questionnaires'],
            ['name' => 'fill_questionnaires', 'description' => 'Fill questionnaires'],
            
            // Patient Data
            ['name' => 'manage_patient_data', 'description' => 'Manage patient data'],
            ['name' => 'enter_patient_data', 'description' => 'Enter patient data'],
            ['name' => 'update_patient_data', 'description' => 'Update patient data'],
            ['name' => 'view_patient_data', 'description' => 'View patient data'],
            
            // File Management
            ['name' => 'upload_reports', 'description' => 'Upload medical reports'],
            ['name' => 'view_results', 'description' => 'View prediction results'],
        ];

        foreach ($permissions as $permission) {
            Permission::firstOrCreate(['name' => $permission['name']], $permission);
        }

        // Define roles with their permissions
        $rolesData = [
            [
                'name' => 'super_admin',
                'description' => 'Super Admin - Full system control',
                'permissions' => [
                    'manage_system',
                    'manage_roles',
                    'configure_templates',
                    'view_analytics',
                    'manage_users',
                    'manage_doctors',
                    'manage_patients',
                    'view_dashboard',
                    'generate_reports',
                    'view_reports',
                    'create_questionnaires',
                    'manage_questionnaires',
                    'manage_patient_data',
                    'view_patient_data',
                ]
            ],
            [
                'name' => 'admin',
                'description' => 'Admin - Manage doctors and patients',
                'permissions' => [
                    'manage_doctors',
                    'manage_patients',
                    'view_dashboard',
                    'generate_reports',
                    'view_reports',
                    'view_patient_data',
                    'view_analytics',
                ]
            ],
            [
                'name' => 'doctor',
                'description' => 'Doctor - Medical professional',
                'permissions' => [
                    'create_questionnaires',
                    'manage_questionnaires',
                    'manage_patient_data',
                    'view_patient_data',
                    'generate_reports',
                    'view_reports',
                    'view_dashboard',
                ]
            ],
            [
                'name' => 'data_entry_operator',
                'description' => 'Data Entry Operator - Enter and update patient data',
                'permissions' => [
                    'enter_patient_data',
                    'update_patient_data',
                    'view_patient_data',
                ]
            ],
            [
                'name' => 'patient',
                'description' => 'Patient - Fill questionnaires and view results',
                'permissions' => [
                    'fill_questionnaires',
                    'upload_reports',
                    'view_results',
                    'view_patient_data',
                ]
            ],
        ];

        foreach ($rolesData as $roleData) {
            $role = Role::firstOrCreate(
                ['name' => $roleData['name']],
                ['description' => $roleData['description']]
            );

            // Attach permissions to role
            $permissionIds = Permission::whereIn('name', $roleData['permissions'])->pluck('id');
            $role->permissions()->sync($permissionIds);
        }
    }
}
