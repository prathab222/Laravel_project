<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RolePermissionSeeder extends Seeder
{
    public function run(): void
    {
        // Reset cached roles and permissions
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // Create permissions
        $permissions = [
            // System Management
            'manage-roles',
            'configure-templates',
            'view-analytics',
            'full-system-control',
            
            // User Management
            'manage-doctors',
            'manage-patients',
            'manage-data-operators',
            
            // Dashboard & Reports
            'view-dashboard',
            'generate-reports',
            
            // Questionnaires
            'create-questionnaires',
            'fill-questionnaires',
            
            // Patient Data
            'manage-patient-data',
            'enter-patient-data',
            'update-patient-data',
            'view-patient-data',
            
            // Reports & Results
            'upload-reports',
            'view-results',
        ];

        foreach ($permissions as $permission) {
            Permission::create(['name' => $permission]);
        }

        // Create roles and assign permissions
        
        // Super Admin - Full system control
        $superAdmin = Role::create(['name' => 'super_admin']);
        $superAdmin->givePermissionTo([
            'full-system-control',
            'manage-roles',
            'configure-templates',
            'view-analytics',
            'manage-doctors',
            'manage-patients',
            'manage-data-operators',
            'view-dashboard',
            'generate-reports',
            'create-questionnaires',
            'manage-patient-data',
            'view-patient-data',
        ]);

        // Admin - Manage doctors and patients, view dashboards, generate reports
        $admin = Role::create(['name' => 'admin']);
        $admin->givePermissionTo([
            'manage-doctors',
            'manage-patients',
            'manage-data-operators',
            'view-dashboard',
            'generate-reports',
            'view-patient-data',
        ]);

        // Doctor - Create questionnaires, manage patient data, generate reports
        $doctor = Role::create(['name' => 'doctor']);
        $doctor->givePermissionTo([
            'create-questionnaires',
            'manage-patient-data',
            'view-patient-data',
            'generate-reports',
            'view-dashboard',
        ]);

        // Data Entry Operator - Enter and update patient data only
        $dataEntry = Role::create(['name' => 'data_entry_operator']);
        $dataEntry->givePermissionTo([
            'enter-patient-data',
            'update-patient-data',
            'view-patient-data',
        ]);

        // Patient - Fill questionnaires, upload reports, view results
        $patient = Role::create(['name' => 'patient']);
        $patient->givePermissionTo([
            'fill-questionnaires',
            'upload-reports',
            'view-results',
        ]);
    }
}
