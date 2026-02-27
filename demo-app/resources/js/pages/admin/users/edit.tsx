import { Head, useForm } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

interface Role {
    id: number;
    name: string;
    display_name: string;
    permissions: string[];
}

interface User {
    id: number;
    name: string;
    email: string;
    app_role_id: number | null;
    permissions: string[];
    dynamic_role?: Role;
}

interface EditUserProps {
    user: User;
    roles: Role[];
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Admin', href: '/admin' },
    { title: 'Users', href: '/admin/users' },
    { title: 'Edit', href: '#' },
];

const availablePermissions = [
    'users.view', 'users.create', 'users.edit', 'users.delete',
    'roles.view', 'roles.create', 'roles.edit', 'roles.delete',
    'doctors.view', 'doctors.create', 'doctors.edit', 'doctors.delete',
    'patients.view', 'patients.create', 'patients.edit', 'patients.delete',
    'questionnaires.view', 'questionnaires.create', 'questionnaires.edit', 'questionnaires.delete',
    'patient-data.view', 'patient-data.create', 'patient-data.edit', 'patient-data.delete',
    'analytics.view', 'audit-logs.view',
    'file-uploads.create', 'file-uploads.view',
    'settings.view', 'settings.edit',
    'reports.view', 'reports.export',
];

export default function EditUser({ user, roles }: EditUserProps) {
    const { data, setData, put, processing, errors } = useForm({
        name: user.name,
        email: user.email,
        password: '',
        app_role_id: user.app_role_id?.toString() || 'none',
        permissions: user.permissions || [],
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/admin/users/${user.id}`);
    };

    const togglePermission = (permission: string) => {
        const newPermissions = data.permissions.includes(permission)
            ? data.permissions.filter(p => p !== permission)
            : [...data.permissions, permission];
        setData('permissions', newPermissions);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit User" />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-3xl bg-gradient-to-b from-background/80 to-background p-4 md:p-6 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.45),transparent_58%),radial-gradient(rgba(15,23,42,0.06)_1.4px,transparent_1.4px)] [background-size:auto,30px_30px] dark:bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_58%),radial-gradient(rgba(255,255,255,0.09)_1.4px,transparent_1.4px)]">
                <Card>
                    <CardHeader>
                        <CardTitle>Edit User: {user.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid gap-4 md:grid-cols-2">
                                <div>
                                    <Label htmlFor="name">Name</Label>
                                    <Input
                                        id="name"
                                        value={data.name}
                                        onChange={e => setData('name', e.target.value)}
                                    />
                                    {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                                </div>
                                <div>
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={data.email}
                                        onChange={e => setData('email', e.target.value)}
                                    />
                                    {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                                </div>
                            </div>
                            
                            <div>
                                <Label htmlFor="password">Password (leave blank to keep current)</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    value={data.password}
                                    onChange={e => setData('password', e.target.value)}
                                    placeholder="New password (optional)"
                                />
                                {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
                            </div>

                            <div>
                                <Label htmlFor="role">Role</Label>
                                <Select value={data.app_role_id} onValueChange={(value) => setData('app_role_id', value)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a role (optional)" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="none">No Role</SelectItem>
                                        {roles.map(role => (
                                            <SelectItem key={role.id} value={role.id.toString()}>
                                                {role.display_name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.app_role_id && <p className="text-sm text-red-500">{errors.app_role_id}</p>}
                            </div>

                            <div>
                                <Label>Individual Permissions</Label>
                                <div className="grid gap-2 mt-2 md:grid-cols-2">
                                    {availablePermissions.map(permission => (
                                        <div key={permission} className="flex items-center space-x-2">
                                            <Checkbox
                                                id={permission}
                                                checked={data.permissions.includes(permission)}
                                                onCheckedChange={() => togglePermission(permission)}
                                            />
                                            <Label htmlFor={permission} className="text-sm">
                                                {permission}
                                            </Label>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <Button type="submit" disabled={processing}>
                                    Update User
                                </Button>
                                <Button type="button" variant="outline" asChild>
                                    <a href="/admin/users">Cancel</a>
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}