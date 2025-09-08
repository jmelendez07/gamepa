import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem } from "@/types";
import { Head } from "@inertiajs/react";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Panel de Control',
        href: route('dashboard'),
    },
    {
        title: 'Enemigos',
        href: route('enemies.index'),
    },
];

export default function EnemiesIndex() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Enemigos" />
        </AppLayout>
    );
}