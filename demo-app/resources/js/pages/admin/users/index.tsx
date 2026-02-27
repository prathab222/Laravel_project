import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
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
    const [deletingUserId, setDeletingUserId] = useState<number | null>(null);

    const handleDelete = (user: User) => {
        if (user.role === 'super_admin') return;

        const confirmed = window.confirm(
            `Delete user "${user.name}"? This action cannot be undone.`,
        );

        if (!confirmed) return;

        router.delete(`/admin/users/${user.id}`, {
            preserveScroll: true,
            onStart: () => setDeletingUserId(user.id),
            onFinish: () => setDeletingUserId(null),
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="User Management" />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-3xl bg-gradient-to-b from-background/80 to-background p-4 md:p-6 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.45),transparent_58%),radial-gradient(rgba(15,23,42,0.06)_1.4px,transparent_1.4px)] [background-size:auto,30px_30px] dark:bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_58%),radial-gradient(rgba(255,255,255,0.09)_1.4px,transparent_1.4px)]">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-semibold tracking-tight">User Management</h1>
                    <Button asChild>
                        <Link href="/admin/users/create">
                            <Plus className="h-4 w-4 mr-2" />
                            Create User
                        </Link>
                    </Button>
                </div>

                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-base font-medium text-muted-foreground">
                            Total Users: {users.length}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto rounded-2xl border border-border/70">
                            <table className="w-full min-w-[920px] text-sm">
                                <thead className="bg-muted/60 text-left">
                                    <tr>
                                        <th className="px-4 py-3 font-medium">User</th>
                                        <th className="px-4 py-3 font-medium">System Role</th>
                                        <th className="px-4 py-3 font-medium">Dynamic Role</th>
                                        <th className="px-4 py-3 font-medium">Permissions</th>
                                        <th className="px-4 py-3 font-medium">Created</th>
                                        <th className="px-4 py-3 font-medium text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.length === 0 && (
                                        <tr>
                                            <td
                                                colSpan={6}
                                                className="px-4 py-8 text-center text-muted-foreground"
                                            >
                                                No users found.
                                            </td>
                                        </tr>
                                    )}
                                    {users.map((user) => (
                                        <tr key={user.id} className="border-t border-border/60">
                                            <td className="px-4 py-3 align-top">
                                                <div className="font-medium">{user.name}</div>
                                                <div className="text-muted-foreground">{user.email}</div>
                                            </td>
                                            <td className="px-4 py-3 align-top">
                                                <Badge
                                                    variant={
                                                        user.role === 'super_admin'
                                                            ? 'destructive'
                                                            : 'secondary'
                                                    }
                                                >
                                                    {user.role}
                                                </Badge>
                                            </td>
                                            <td className="px-4 py-3 align-top">
                                                {user.dynamic_role ? (
                                                    <Badge variant="outline">
                                                        {user.dynamic_role.display_name}
                                                    </Badge>
                                                ) : (
                                                    <span className="text-muted-foreground">-</span>
                                                )}
                                            </td>
                                            <td className="px-4 py-3 align-top">
                                                <div className="flex flex-wrap gap-1">
                                                    {user.permissions?.length > 0 ? (
                                                        <>
                                                            {user.permissions
                                                                .slice(0, 3)
                                                                .map((permission) => (
                                                                    <Badge
                                                                        key={permission}
                                                                        variant="outline"
                                                                        className="text-xs"
                                                                    >
                                                                        {permission}
                                                                    </Badge>
                                                                ))}
                                                            {user.permissions.length > 3 && (
                                                                <Badge variant="outline" className="text-xs">
                                                                    +{user.permissions.length - 3} more
                                                                </Badge>
                                                            )}
                                                        </>
                                                    ) : (
                                                        <span className="text-muted-foreground">
                                                            No individual permissions
                                                        </span>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-4 py-3 align-top text-muted-foreground">
                                                {new Date(user.created_at).toLocaleDateString()}
                                            </td>
                                            <td className="px-4 py-3 align-top">
                                                <div className="flex justify-end gap-2">
                                                    <Button size="sm" variant="outline" asChild>
                                                        <Link href={`/admin/users/${user.id}/edit`}>
                                                            <Edit className="h-3 w-3 mr-1" />
                                                            Edit
                                                        </Link>
                                                    </Button>
                                                    <Button
                                                        size="sm"
                                                        variant="destructive"
                                                        onClick={() => handleDelete(user)}
                                                        disabled={
                                                            user.role === 'super_admin' ||
                                                            deletingUserId === user.id
                                                        }
                                                        title={
                                                            user.role === 'super_admin'
                                                                ? 'Super admin cannot be deleted'
                                                                : 'Delete user'
                                                        }
                                                    >
                                                        <Trash2 className="h-3 w-3 mr-1" />
                                                        Delete
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
