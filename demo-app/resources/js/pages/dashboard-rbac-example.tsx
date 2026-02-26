import { Head } from '@inertiajs/react';
import { RoleGuard, PermissionGuard, useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import AppLayout from '@/layouts/app-layout';

export default function Dashboard() {
    const { user, hasRole, hasPermission } = useAuth();

    return (
        <AppLayout>
            <Head title="Dashboard" />

            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold">Cancer Prediction Tool</h1>
                    <p className="text-muted-foreground">Welcome, {user.name}</p>
                </div>

                <div className="flex gap-2">
                    {user.roles?.map((role) => (
                        <Badge key={role.id} variant="secondary">
                            {role.name.replace('_', ' ')}
                        </Badge>
                    ))}
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {/* Patient - Fill questionnaires, upload reports, view results */}
                    <PermissionGuard permissions="fill-questionnaires">
                        <Card>
                            <CardHeader>
                                <CardTitle>Fill Questionnaire</CardTitle>
                                <CardDescription>Complete cancer risk assessment</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Button className="w-full">Start Questionnaire</Button>
                            </CardContent>
                        </Card>
                    </PermissionGuard>

                    <PermissionGuard permissions="upload-reports">
                        <Card>
                            <CardHeader>
                                <CardTitle>Upload Reports</CardTitle>
                                <CardDescription>Upload medical reports</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Button className="w-full">Upload</Button>
                            </CardContent>
                        </Card>
                    </PermissionGuard>

                    <PermissionGuard permissions="view-results">
                        <Card>
                            <CardHeader>
                                <CardTitle>View Results</CardTitle>
                                <CardDescription>Check your prediction results</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Button className="w-full">View Results</Button>
                            </CardContent>
                        </Card>
                    </PermissionGuard>

                    {/* Data Entry Operator - Enter and update patient data */}
                    <PermissionGuard permissions={['enter-patient-data', 'update-patient-data']}>
                        <Card>
                            <CardHeader>
                                <CardTitle>Patient Data Entry</CardTitle>
                                <CardDescription>Enter and update patient information</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Button className="w-full">Manage Data</Button>
                            </CardContent>
                        </Card>
                    </PermissionGuard>

                    {/* Doctor - Create questionnaires, manage patient data, generate reports */}
                    <PermissionGuard permissions="create-questionnaires">
                        <Card>
                            <CardHeader>
                                <CardTitle>Create Questionnaire</CardTitle>
                                <CardDescription>Design new assessment forms</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Button className="w-full">Create</Button>
                            </CardContent>
                        </Card>
                    </PermissionGuard>

                    <PermissionGuard permissions="manage-patient-data">
                        <Card>
                            <CardHeader>
                                <CardTitle>Patient Management</CardTitle>
                                <CardDescription>Manage patient records</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Button className="w-full">Manage Patients</Button>
                            </CardContent>
                        </Card>
                    </PermissionGuard>

                    {/* Admin - Manage doctors and patients, view dashboards, generate reports */}
                    <PermissionGuard permissions="manage-doctors">
                        <Card>
                            <CardHeader>
                                <CardTitle>Manage Doctors</CardTitle>
                                <CardDescription>Add and manage doctor accounts</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Button className="w-full">Manage Doctors</Button>
                            </CardContent>
                        </Card>
                    </PermissionGuard>

                    <PermissionGuard permissions="view-dashboard">
                        <Card>
                            <CardHeader>
                                <CardTitle>Analytics Dashboard</CardTitle>
                                <CardDescription>View system statistics</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Button className="w-full">View Dashboard</Button>
                            </CardContent>
                        </Card>
                    </PermissionGuard>

                    <PermissionGuard permissions="generate-reports">
                        <Card>
                            <CardHeader>
                                <CardTitle>Generate Reports</CardTitle>
                                <CardDescription>Create system reports</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Button className="w-full">Generate</Button>
                            </CardContent>
                        </Card>
                    </PermissionGuard>

                    {/* Super Admin - Full system control */}
                    <RoleGuard roles="super_admin">
                        <Card className="border-red-200 bg-red-50">
                            <CardHeader>
                                <CardTitle className="text-red-900">System Administration</CardTitle>
                                <CardDescription className="text-red-700">
                                    Full system control and configuration
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Button className="w-full" variant="destructive">Admin Panel</Button>
                            </CardContent>
                        </Card>
                    </RoleGuard>

                    <PermissionGuard permissions="manage-roles">
                        <Card>
                            <CardHeader>
                                <CardTitle>Role Management</CardTitle>
                                <CardDescription>Manage user roles and permissions</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Button className="w-full">Manage Roles</Button>
                            </CardContent>
                        </Card>
                    </PermissionGuard>

                    <PermissionGuard permissions="configure-templates">
                        <Card>
                            <CardHeader>
                                <CardTitle>Configure Templates</CardTitle>
                                <CardDescription>Manage system templates</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Button className="w-full">Configure</Button>
                            </CardContent>
                        </Card>
                    </PermissionGuard>

                    <PermissionGuard permissions="view-analytics">
                        <Card>
                            <CardHeader>
                                <CardTitle>System Analytics</CardTitle>
                                <CardDescription>View detailed analytics</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Button className="w-full">View Analytics</Button>
                            </CardContent>
                        </Card>
                    </PermissionGuard>
                </div>
            </div>
        </AppLayout>
    );
}
