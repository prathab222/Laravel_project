import { Head, Link } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { Plus, Edit, Trash2 } from 'lucide-react';

interface Role {
    id: number;
    name: string;
    display_name: string;
    description: string;
    permissions: string[];
    is_active: boolean;
    users_count: number;
}

interface RolesIndexProps {
    roles: Role[];
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Admin', href: '/admin' },
    { title: 'Roles', href: '/admin/roles' },
];

export default function RolesIndex({ roles }: RolesIndexProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Role Management" />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-3xl bg-gradient-to-b from-background/80 to-background p-4 md:p-6 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.45),transparent_58%),radial-gradient(rgba(15,23,42,0.06)_1.4px,transparent_1.4px)] [background-size:auto,30px_30px] dark:bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_58%),radial-gradient(rgba(255,255,255,0.09)_1.4px,transparent_1.4px)]">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Role Management</h1>
                    <Button asChild>
                        <Link href="/admin/roles/create">
                            <Plus className="h-4 w-4 mr-2" />
                            Create Role
                        </Link>
                    </Button>
                </div>
                
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {roles.map((role) => (
                        <Card key={role.id}>
                            <CardHeader>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <CardTitle className="text-lg">{role.display_name}</CardTitle>
                                        <p className="text-sm text-muted-foreground">{role.name}</p>
                                    </div>
                                    <Badge variant={role.is_active ? 'default' : 'secondary'}>
                                        {role.is_active ? 'Active' : 'Inactive'}
                                    </Badge>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm mb-4">{role.description}</p>
                                <div className="flex justify-between items-center mb-4">
                                    <span className="text-sm">Users: {role.users_count}</span>
                                    <span className="text-sm">Permissions: {role.permissions?.length || 0}</span>
                                </div>
                                <div className="flex gap-2">
                                    <Button size="sm" variant="outline" asChild>
                                        <Link href={`/admin/roles/${role.id}/edit`}>
                                            <Edit className="h-3 w-3 mr-1" />
                                            Edit
                                        </Link>
                                    </Button>
                                    <Button size="sm" variant="destructive">
                                        <Trash2 className="h-3 w-3 mr-1" />
                                        Delete
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}