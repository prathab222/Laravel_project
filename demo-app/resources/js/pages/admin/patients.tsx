import { Head } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Admin', href: '/admin' },
    { title: 'Patients', href: '/admin/patients' },
];

export default function PatientManagement() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Patient Management" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Patient Management</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>Patient management functionality will be implemented here.</p>
                        <p className="text-sm text-muted-foreground mt-2">
                            This module will handle patient registration, profiles, and medical records.
                        </p>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}