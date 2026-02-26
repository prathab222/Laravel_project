import { Head } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Admin', href: '/admin' },
    { title: 'Patient Data', href: '/admin/patient-data' },
];

export default function PatientData() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Patient Data" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Patient Data Management</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>Patient data entry and management functionality will be implemented here.</p>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}