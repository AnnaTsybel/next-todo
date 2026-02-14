import type { Metadata } from 'next';

import { Toaster } from '@app/components/ui/Toaster';
import ClientProvider from '@app/components/wrappers/ClientWrapper';
import ThemeProvider from '@app/components/wrappers/ThemeProvider';

import { Modal } from './components/ui/Modal';
import { StoreProvider } from './components/wrappers/StoreProvider';

import './globals.css';

export const metadata: Metadata = {
    title: 'Todo App',
    description: 'Organize your tasks and boost your productivity with this Todo App.',
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className="antialiased">
                <Toaster />
                <ClientProvider>
                    <StoreProvider>
                        <Modal />
                        <ThemeProvider>{children}</ThemeProvider>
                    </StoreProvider>
                </ClientProvider>
            </body>
        </html>
    );
}
