import { Head } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Admin', href: '/admin' },
    { title: 'File Uploads', href: '/admin/file-uploads' },
];

export default function FileUploads() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="File Uploads" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <Card>
                    <CardHeader>
                        <CardTitle>File Upload Management</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>File upload and document management functionality will be implemented here.</p>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}