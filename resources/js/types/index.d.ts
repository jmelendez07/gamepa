import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';
import type { PageProps as InertiaPageProps } from '@inertiajs/core';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    roles: Role[];
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

export interface Role {
    id: string;
    name: string;
}

export interface IExercise {
    id: number;
    operation: string;
    steps?: ISteps[];
}

export interface ICard {
    id: number;
    name: string;
    stats: number;
    exercises: IExercise[];
}

export interface ISteps {
    id: number;
    description: string;
    order: number;
    options: IOptions[];
}

export interface IOptions {
    id: number;
    label: string;
    isCorrect: boolean;
}

export interface PageProps extends InertiaPageProps {
    auth: {
        user: User | null;
    };
    flash?: {
        success?: string;
        error?: string;
    };
    [key: string]: unknown;
}