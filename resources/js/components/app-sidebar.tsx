import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { BookOpen, ShieldCheck, Folder, LayoutGrid, Users, Earth, Dumbbell, GalleryHorizontalEnd, Swords, GraduationCap } from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    {
        title: 'Panel de Control',
        href: route('dashboard'),
        icon: LayoutGrid,
    },
    {
        title: 'Usuarios',
        href: route('users.index'),
        icon: Users,
    },
    {
        title: 'Docentes',
        href: route('teachers.index'),
        icon: GraduationCap,
    }
];

const gameplayNavItems: NavItem[] = [
    {
        title: 'Planetas',
        href: route('planets.index'),
        icon: Earth,
    },
    {
        title: 'Ejercicios',
        href: route('exercises.index'),
        icon: Dumbbell,
    },
    {
        title: 'Cartas',
        href: route('cards.index'),
        icon: GalleryHorizontalEnd,
    },
    {
        title: 'Enemigos',
        href: route('enemies.index'),
        icon: Swords,
    },
    {
        title: 'Heroes',
        href: route('heroes.index'),
        icon: ShieldCheck,
    }
];

const footerNavItems: NavItem[] = [
    {
        title: 'Repository',
        href: 'https://github.com/laravel/react-starter-kit',
        icon: Folder,
    },
    {
        title: 'Documentation',
        href: 'https://laravel.com/docs/starter-kits#react',
        icon: BookOpen,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={route('dashboard')} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} gameplayItems={gameplayNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
