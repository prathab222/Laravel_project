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
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-3xl bg-gradient-to-b from-background/80 to-background p-4 md:p-6 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.45),transparent_58%),radial-gradient(rgba(15,23,42,0.06)_1.4px,transparent_1.4px)] [background-size:auto,30px_30px] dark:bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_58%),radial-gradient(rgba(255,255,255,0.09)_1.4px,transparent_1.4px)]">
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