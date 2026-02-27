import { Head, useForm } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

interface Role {
    id: number;
    name: string;
    display_name: string;
    description: string;
    permissions: string[];
    is_active: boolean;
}

interface EditRoleProps {
    role: Role;
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Admin', href: '/admin' },
    { title: 'Roles', href: '/admin/roles' },
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

export default function EditRole({ role }: EditRoleProps) {
    const { data, setData, put, processing, errors } = useForm({
        name: role.name,
        display_name: role.display_name,
        description: role.description || '',
        permissions: role.permissions || [],
        is_active: role.is_active,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/admin/roles/${role.id}`);
    };

    const togglePermission = (permission: string) => {
        const newPermissions = data.permissions.includes(permission)
            ? data.permissions.filter(p => p !== permission)
            : [...data.permissions, permission];
        setData('permissions', newPermissions);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Role" />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-3xl bg-gradient-to-b from-background/80 to-background p-4 md:p-6 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.45),transparent_58%),radial-gradient(rgba(15,23,42,0.06)_1.4px,transparent_1.4px)] [background-size:auto,30px_30px] dark:bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_58%),radial-gradient(rgba(255,255,255,0.09)_1.4px,transparent_1.4px)]">
                <Card>
                    <CardHeader>
                        <CardTitle>Edit Role: {role.display_name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid gap-4 md:grid-cols-2">
                                <div>
                                    <Label htmlFor="name">Role Name</Label>
                                    <Input
                                        id="name"
                                        value={data.name}
                                        onChange={e => setData('name', e.target.value)}
                                    />
                                    {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                                </div>
                                <div>
                                    <Label htmlFor="display_name">Display Name</Label>
                                    <Input
                                        id="display_name"
                                        value={data.display_name}
                                        onChange={e => setData('display_name', e.target.value)}
                                    />
                                    {errors.display_name && <p className="text-sm text-red-500">{errors.display_name}</p>}
                                </div>
                            </div>
                            
                            <div>
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    value={data.description}
                                    onChange={e => setData('description', e.target.value)}
                                />
                            </div>

                            <div>
                                <Label>Permissions</Label>
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
                                    Update Role
                                </Button>
                                <Button type="button" variant="outline" asChild>
                                    <a href="/admin/roles">Cancel</a>
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}