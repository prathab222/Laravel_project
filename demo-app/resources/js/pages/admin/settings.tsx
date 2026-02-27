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
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-3xl bg-gradient-to-b from-background/80 to-background p-4 md:p-6 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.45),transparent_58%),radial-gradient(rgba(15,23,42,0.06)_1.4px,transparent_1.4px)] [background-size:auto,30px_30px] dark:bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_58%),radial-gradient(rgba(255,255,255,0.09)_1.4px,transparent_1.4px)]">
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