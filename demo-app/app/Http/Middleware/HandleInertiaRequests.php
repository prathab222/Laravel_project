<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $userPermissions = [];
        
        if ($request->user()) {
            $user = $request->user()->load('dynamicRole');
            
            if ($user->isSuperAdmin()) {
                $userPermissions = [
                    'users.view', 'users.create', 'users.edit', 'users.delete',
                    'roles.view', 'roles.create', 'roles.edit', 'roles.delete',
                    'doctors.view', 'doctors.create', 'doctors.edit', 'doctors.delete',
                    'patients.view', 'patients.create', 'patients.edit', 'patients.delete',
                    'questionnaires.view', 'questionnaires.create', 'questionnaires.edit', 'questionnaires.delete',
                    'patient-data.view', 'patient-data.create', 'patient-data.edit', 'patient-data.delete',
                    'analytics.view', 'audit-logs.view',
                    'file-uploads.create', 'file-uploads.view',
                    'settings.view', 'settings.edit', 'reports.view', 'reports.export',
                ];
            } else {
                $userPerms = $user->permissions ?? [];
                
                // If user has individual permissions, use only those
                // Otherwise, use role permissions
                if (!empty($userPerms)) {
                    $userPermissions = $userPerms;
                } else {
                    $rolePerms = $user->dynamicRole?->permissions ?? [];
                    $userPermissions = $rolePerms;
                }
                
                // Ensure it's a proper indexed array
                $userPermissions = array_values($userPermissions);
            }
        }
        
        return [
            ...parent::share($request),
            'name' => config('app.name'),
            'auth' => [
                'user' => $request->user(),
            ],
            'userPermissions' => $userPermissions,
            'sidebarOpen' => ! $request->hasCookie('sidebar_state') || $request->cookie('sidebar_state') === 'true',
        ];
    }
}
