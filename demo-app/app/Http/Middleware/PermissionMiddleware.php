<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class PermissionMiddleware
{
    public function handle(Request $request, Closure $next, string $permission): Response
    {
        if (!auth()->check()) {
            abort(401, 'Unauthorized');
        }

        $user = auth()->user();
        
        if ($user->isSuperAdmin() || $user->hasPermission($permission)) {
            return $next($request);
        }

        abort(403, 'Access denied. Required permission: ' . $permission);
    }
}