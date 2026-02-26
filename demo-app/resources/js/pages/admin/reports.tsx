import { Head } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { Users, Activity, Database, Shield } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Admin', href: '/admin' },
    { title: 'Reports', href: '/admin/reports' },
];

export default function AdminReports() {
    const stats = [
        { title: 'Total Users', value: '1,234', icon: Users, color: 'text-blue-500' },
        { title: 'Active Sessions', value: '89', icon: Activity, color: 'text-green-500' },
        { title: 'Database Size', value: '2.4 GB', icon: Database, color: 'text-purple-500' },
        { title: 'Security Events', value: '12', icon: Shield, color: 'text-red-500' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Reports & Analytics" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="grid gap-4 md:grid-cols-4">
                    {stats.map((stat) => {
                        const IconComponent = stat.icon;
                        return (
                            <Card key={stat.title}>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                                    <IconComponent className={`h-4 w-4 ${stat.color}`} />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{stat.value}</div>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
                
                <Card>
                    <CardHeader>
                        <CardTitle>System Analytics</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center p-4 border rounded">
                                <span>User Registration Trend</span>
                                <span className="text-green-500">+15% this month</span>
                            </div>
                            <div className="flex justify-between items-center p-4 border rounded">
                                <span>System Performance</span>
                                <span className="text-blue-500">Excellent</span>
                            </div>
                            <div className="flex justify-between items-center p-4 border rounded">
                                <span>Security Status</span>
                                <span className="text-green-500">All Clear</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}