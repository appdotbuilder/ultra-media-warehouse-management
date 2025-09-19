import React from 'react';
import { AppShell } from '@/components/app-shell';
import { AppSidebar } from '@/components/app-sidebar';
import { AppHeader } from '@/components/app-header';
import { AppContent } from '@/components/app-content';

interface AppLayoutProps {
    children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {

    return (
        <AppShell variant="sidebar">
            <AppSidebar />
            <div className="flex flex-1 flex-col">
                <AppHeader />
                <AppContent>
                    {children}
                </AppContent>
            </div>
        </AppShell>
    );
}