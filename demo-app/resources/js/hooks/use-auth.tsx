import { usePage } from '@inertiajs/react';

type Role = {
    id: number;
    name: string;
};

type Permission = {
    id: number;
    name: string;
};

type User = {
    id: number;
    name: string;
    email: string;
    roles: Role[];
    permissions: Permission[];
};

type PageProps = {
    auth: {
        user: User;
    };
};

export function useAuth() {
    const { auth } = usePage<PageProps>().props;
    
    const hasRole = (role: string): boolean => {
        return auth.user?.roles?.some(r => r.name === role) ?? false;
    };

    const hasAnyRole = (roles: string[]): boolean => {
        return auth.user?.roles?.some(r => roles.includes(r.name)) ?? false;
    };

    const hasPermission = (permission: string): boolean => {
        return auth.user?.permissions?.some(p => p.name === permission) ?? false;
    };

    const hasAnyPermission = (permissions: string[]): boolean => {
        return auth.user?.permissions?.some(p => permissions.includes(p.name)) ?? false;
    };

    return {
        user: auth.user,
        hasRole,
        hasAnyRole,
        hasPermission,
        hasAnyPermission,
    };
}

type RoleGuardProps = {
    roles: string | string[];
    children: React.ReactNode;
    fallback?: React.ReactNode;
};

export function RoleGuard({ roles, children, fallback = null }: RoleGuardProps) {
    const { hasAnyRole } = useAuth();
    const rolesArray = Array.isArray(roles) ? roles : [roles];
    return hasAnyRole(rolesArray) ? <>{children}</> : <>{fallback}</>;
}

type PermissionGuardProps = {
    permissions: string | string[];
    children: React.ReactNode;
    fallback?: React.ReactNode;
};

export function PermissionGuard({ permissions, children, fallback = null }: PermissionGuardProps) {
    const { hasAnyPermission } = useAuth();
    const permissionsArray = Array.isArray(permissions) ? permissions : [permissions];
    return hasAnyPermission(permissionsArray) ? <>{children}</> : <>{fallback}</>;
}
