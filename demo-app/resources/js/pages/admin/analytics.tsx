import { Head } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Admin', href: '/admin' },
    { title: 'Analytics', href: '/admin/analytics' },
];

export default function Analytics() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Analytics" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Analytics Dashboard</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>Analytics and reporting functionality will be implemented here.</p>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}