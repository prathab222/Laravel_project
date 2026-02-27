import { Head } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { dashboard } from '@/routes';
import { Users, Settings, BarChart3, Shield, ArrowRight } from 'lucide-react';

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
            color: 'bg-[#adce9f]',
        },
        {
            title: 'System Settings',
            description: 'Configure application settings and preferences',
            icon: Settings,
            href: '/admin/settings',
            color: 'bg-[#9fc591]',
        },
        {
            title: 'Reports & Analytics',
            description: 'View system reports and analytics',
            icon: BarChart3,
            href: '/admin/reports',
            color: 'bg-[#8eb880]',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-3xl bg-gradient-to-b from-background/80 to-background p-4 md:p-6 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.45),transparent_58%),radial-gradient(rgba(15,23,42,0.06)_1.4px,transparent_1.4px)] [background-size:auto,30px_30px] dark:bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_58%),radial-gradient(rgba(255,255,255,0.09)_1.4px,transparent_1.4px)]">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
                        <p className="text-sm text-muted-foreground">
                            Hello {userRole}. Here is your workspace overview.
                        </p>
                    </div>
                </div>
                {isSuperAdmin && (
                    <div>
                        <div className="mb-4 flex items-center gap-2">
                            <Shield className="h-5 w-5 text-muted-foreground" />
                            <h2 className="text-xl font-semibold tracking-tight">Super Admin</h2>
                            <Badge variant="outline">Elevated Access</Badge>
                        </div>
                        <div className="grid gap-4 md:grid-cols-3">
                            {superAdminOptions.map((option) => {
                                const IconComponent = option.icon;
                                return (
                                    <Card key={option.title} className="transition-shadow hover:shadow-md">
                                        <CardHeader className="pb-3">
                                            <div className="flex items-center gap-3">
                                                <div className={`rounded-xl p-2 ${option.color} text-white`}>
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
                                                Open {option.title}
                                                <ArrowRight className="h-4 w-4" />
                                            </Button>
                                        </CardContent>
                                    </Card>
                                );
                            })}
                        </div>
                    </div>
                )}
                
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <Card>
                        <CardHeader className="pb-1">
                            <CardDescription>Users</CardDescription>
                            <CardTitle className="text-3xl">1,284</CardTitle>
                        </CardHeader>
                        <CardContent className="text-sm text-muted-foreground">
                            +4.8% from last month
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-1">
                            <CardDescription>Active Sessions</CardDescription>
                            <CardTitle className="text-3xl">94</CardTitle>
                        </CardHeader>
                        <CardContent className="text-sm text-muted-foreground">
                            37 in the last hour
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-1">
                            <CardDescription>System Health</CardDescription>
                            <CardTitle className="text-3xl">99.9%</CardTitle>
                        </CardHeader>
                        <CardContent className="text-sm text-muted-foreground">
                            No incidents detected
                        </CardContent>
                    </Card>
                </div>
                <Card>
                    <CardHeader>
                        <CardTitle>Today</CardTitle>
                        <CardDescription>
                            Priority items across your workspace.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-3 text-sm">
                        <div className="rounded-2xl border border-border/70 bg-background/60 p-4">
                            Review pending user approvals and role updates.
                        </div>
                        <div className="rounded-2xl border border-border/70 bg-background/60 p-4">
                            Validate audit log anomalies flagged in the last 24 hours.
                        </div>
                        <div className="rounded-2xl border border-border/70 bg-background/60 p-4">
                            Export monthly performance report for leadership.
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
