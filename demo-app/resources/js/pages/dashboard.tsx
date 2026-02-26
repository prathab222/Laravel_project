import { Head } from '@inertiajs/react';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { dashboard } from '@/routes';
import { Users, Settings, BarChart3, Shield } from 'lucide-react';

interface DashboardProps {
    isSuperAdmin?: boolean;
    userRole?: string;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

export default function Dashboard({ isSuperAdmin = false, userRole = 'user' }: DashboardProps) {
    const superAdminOptions = [
        {
            title: 'User Management',
            description: 'Manage all users, roles, and permissions',
            icon: Users,
            href: '/admin/users',
            color: 'bg-blue-500',
        },
        {
            title: 'System Settings',
            description: 'Configure application settings and preferences',
            icon: Settings,
            href: '/admin/settings',
            color: 'bg-green-500',
        },
        {
            title: 'Reports & Analytics',
            description: 'View system reports and analytics',
            icon: BarChart3,
            href: '/admin/reports',
            color: 'bg-purple-500',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                {isSuperAdmin && (
                    <div className="mb-6">
                        <div className="flex items-center gap-2 mb-4">
                            <Shield className="h-5 w-5 text-red-500" />
                            <h2 className="text-xl font-semibold">Super Admin Panel</h2>
                            <Badge variant="destructive">Admin Access</Badge>
                        </div>
                        <div className="grid gap-4 md:grid-cols-3">
                            {superAdminOptions.map((option) => {
                                const IconComponent = option.icon;
                                return (
                                    <Card key={option.title} className="hover:shadow-md transition-shadow cursor-pointer">
                                        <CardHeader className="pb-3">
                                            <div className="flex items-center gap-3">
                                                <div className={`p-2 rounded-lg ${option.color} text-white`}>
                                                    <IconComponent className="h-5 w-5" />
                                                </div>
                                                <div>
                                                    <CardTitle className="text-lg">{option.title}</CardTitle>
                                                </div>
                                            </div>
                                        </CardHeader>
                                        <CardContent>
                                            <CardDescription className="mb-4">
                                                {option.description}
                                            </CardDescription>
                                            <Button 
                                                onClick={() => window.location.href = option.href}
                                                className="w-full"
                                            >
                                                Access {option.title}
                                            </Button>
                                        </CardContent>
                                    </Card>
                                );
                            })}
                        </div>
                    </div>
                )}
                
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                </div>
                <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                    <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                </div>
            </div>
        </AppLayout>
    );
}
