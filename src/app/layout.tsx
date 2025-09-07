import type { Metadata } from 'next';
import { Toaster } from '@/components/ui/toaster';
import './globals.css';
import KonamiWatcher from '@/components/jaehyunverse/konami-watcher';
import CursorTrail from '@/components/jaehyunverse/shared/cursor-trail';
import StarryBackground from '@/components/jaehyunverse/shared/starry-background';
import BouncingHearts from '@/components/jaehyunverse/shared/bouncing-hearts';

export const metadata: Metadata = {
  title: 'Jaehyunverse',
  description: 'Welcome to the Jaehyunverse - a magical wonderland for fans!',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700;900&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <StarryBackground />
        <BouncingHearts />
        <CursorTrail />
        <KonamiWatcher />
        <main>{children}</main>
        <Toaster />
      </body>
    </html>
  );
}
