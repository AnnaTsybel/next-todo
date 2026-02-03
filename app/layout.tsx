import type { Metadata } from 'next';

import ClientProvider from '@app/components/wrappers/ClientWrapper';
import { Toaster } from '@app/components/ui/Toaster';
import ThemeProvider from '@app/components/wrappers/ThemeProvider';

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
                    <ThemeProvider>{children}</ThemeProvider>
                </ClientProvider>
            </body>
        </html>
    );
}
