import { Head } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Admin', href: '/admin' },
    { title: 'Settings', href: '/admin/settings' },
];

export default function AdminSettings() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="System Settings" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="grid gap-6 md:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Application Settings</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <Label htmlFor="app-name">Application Name</Label>
                                <Input id="app-name" defaultValue="Laravel App" />
                            </div>
                            <div>
                                <Label htmlFor="app-url">Application URL</Label>
                                <Input id="app-url" defaultValue="http://localhost" />
                            </div>
                            <Button>Save Settings</Button>
                        </CardContent>
                    </Card>
                    
                    <Card>
                        <CardHeader>
                            <CardTitle>Security Settings</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                                <Input id="session-timeout" type="number" defaultValue="120" />
                            </div>
                            <div>
                                <Label htmlFor="max-login-attempts">Max Login Attempts</Label>
                                <Input id="max-login-attempts" type="number" defaultValue="5" />
                            </div>
                            <Button>Update Security</Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}