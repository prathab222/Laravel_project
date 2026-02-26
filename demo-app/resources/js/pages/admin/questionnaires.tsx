import { Head } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Admin', href: '/admin' },
    { title: 'Questionnaires', href: '/admin/questionnaires' },
];

export default function Questionnaires() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Questionnaires" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Questionnaire Management</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>Questionnaire creation and management functionality will be implemented here.</p>
                        <p className="text-sm text-muted-foreground mt-2">
                            This module will handle creating, editing, and managing patient questionnaires.
                        </p>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}