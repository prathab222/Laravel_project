import { Head, Link } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { Plus, Edit, Trash2 } from 'lucide-react';

interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    dynamic_role?: {
        id: number;
        display_name: string;
    };
    permissions: string[];
    created_at: string;
}

interface UsersIndexProps {
    users: User[];
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Admin', href: '/admin' },
    { title: 'Users', href: '/admin/users' },
];

export default function UsersIndex({ users }: UsersIndexProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="User Management" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold">User Management</h1>
                    <Button asChild>
                        <Link href="/admin/users/create">
                            <Plus className="h-4 w-4 mr-2" />
                            Create User
                        </Link>
                    </Button>
                </div>
                
                <div className="space-y-4">
                    {users.map((user) => (
                        <Card key={user.id}>
                            <CardHeader>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <CardTitle className="text-lg">{user.name}</CardTitle>
                                        <p className="text-sm text-muted-foreground">{user.email}</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <Badge variant={user.role === 'super_admin' ? 'destructive' : 'secondary'}>
                                            {user.role}
                                        </Badge>
                                        {user.dynamic_role && (
                                            <Badge variant="outline">
                                                {user.dynamic_role.display_name}
                                            </Badge>
                                        )}
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div>
                                        <h4 className="font-medium mb-2">Individual Permissions:</h4>
                                        <div className="flex flex-wrap gap-1">
                                            {user.permissions?.length > 0 ? (
                                                user.permissions.map(permission => (
                                                    <Badge key={permission} variant="outline" className="text-xs">
                                                        {permission}
                                                    </Badge>
                                                ))
                                            ) : (
                                                <span className="text-sm text-muted-foreground">No individual permissions</span>
                                            )}
                                        </div>
                                    </div>
                                    
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-muted-foreground">
                                            Created: {new Date(user.created_at).toLocaleDateString()}
                                        </span>
                                        <div className="flex gap-2">
                                            <Button size="sm" variant="outline" asChild>
                                                <Link href={`/admin/users/${user.id}/edit`}>
                                                    <Edit className="h-3 w-3 mr-1" />
                                                    Edit
                                                </Link>
                                            </Button>
                                            {user.role !== 'super_admin' && (
                                                <Button size="sm" variant="destructive">
                                                    <Trash2 className="h-3 w-3 mr-1" />
                                                    Delete
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}