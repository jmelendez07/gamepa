import { ReactNode } from 'react';
import EpicPageTransition from '@/components/epic-page-transition';

interface PublicLayoutProps {
    children: ReactNode;
}

export default function PublicLayout({ children }: PublicLayoutProps) {
    return (
        <EpicPageTransition>
            {children}
        </EpicPageTransition>
    );
}