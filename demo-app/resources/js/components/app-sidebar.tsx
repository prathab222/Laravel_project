import { Link } from '@inertiajs/react';
import { BookOpen, Folder, LayoutGrid, Users, Shield, Settings, BarChart3 } from 'lucide-react';
import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import type { NavItem } from '@/types';
import AppLogo from './app-logo';
import { dashboard } from '@/routes';
import { usePage } from '@inertiajs/react';

interface PageProps {
    auth: {
        user: {
            id: number;
            name: string;
            email: string;
            role: string;
            isSuperAdmin?: boolean;
        };
    };
    userPermissions?: string[];
}

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: LayoutGrid,
    },
];

const getPermissionBasedNavItems = (permissions: string[] = []): NavItem[] => {
    const items: NavItem[] = [];
    
    // Ensure permissions is an array
    const permissionArray = Array.isArray(permissions) ? permissions : [];
    
    if (permissionArray.includes('users.view')) {
        items.push({
            title: 'User Management',
            href: '/admin/users',
            icon: Users,
        });
    }
    
    if (permissionArray.includes('roles.view')) {
        items.push({
            title: 'Role Management',
            href: '/admin/roles',
            icon: Shield,
        });
    }
    
    if (permissionArray.includes('doctors.view')) {
        items.push({
            title: 'Doctor Management',
            href: '/admin/doctors',
            icon: Users,
        });
    }
    
    if (permissionArray.includes('patients.view')) {
        items.push({
            title: 'Patient Management',
            href: '/admin/patients',
            icon: Users,
        });
    }
    
    if (permissionArray.includes('questionnaires.view')) {
        items.push({
            title: 'Questionnaires',
            href: '/admin/questionnaires',
            icon: LayoutGrid,
        });
    }
    
    if (permissionArray.includes('patient-data.view')) {
        items.push({
            title: 'Patient Data',
            href: '/admin/patient-data',
            icon: LayoutGrid,
        });
    }
    
    if (permissionArray.includes('analytics.view')) {
        items.push({
            title: 'Analytics',
            href: '/admin/analytics',
            icon: BarChart3,
        });
    }
    
    if (permissionArray.includes('audit-logs.view')) {
        items.push({
            title: 'Audit Logs',
            href: '/admin/audit-logs',
            icon: LayoutGrid,
        });
    }
    
    if (permissionArray.includes('file-uploads.view')) {
        items.push({
            title: 'File Uploads',
            href: '/admin/file-uploads',
            icon: LayoutGrid,
        });
    }
    
    if (permissionArray.includes('settings.view')) {
        items.push({
            title: 'System Settings',
            href: '/admin/settings',
            icon: Settings,
        });
    }
    
    if (permissionArray.includes('reports.view')) {
        items.push({
            title: 'Reports',
            href: '/admin/reports',
            icon: BarChart3,
        });
    }
    
    return items;
};


const footerNavItems: NavItem[] = [
    // {
    //     title: 'Repository',
    //     href: 'https://github.com/laravel/react-starter-kit',
    //     icon: Folder,
    // },
    // {
    //     title: 'Documentation',
    //     href: 'https://laravel.com/docs/starter-kits#react',
    //     icon: BookOpen,
    // },
];

export function AppSidebar() {
    const { auth, userPermissions } = usePage<PageProps>().props;
    const permissionBasedItems = getPermissionBasedNavItems(userPermissions);

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
                {permissionBasedItems.length > 0 && <NavMain items={permissionBasedItems} />}
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
