import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { getEnv } from '@/lib/config';
import { AuthProvider } from '@/hooks/useAuth';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: getEnv().NEXT_PUBLIC_APP_NAME || 'TodoMaster',
    template: `%s | ${getEnv().NEXT_PUBLIC_APP_NAME || 'TodoMaster'}`,
  },
  description: 'TodoMaster - Organize your life, boost productivity, and achieve your goals with our intuitive task management solution.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" style={{ colorScheme: 'dark' }}>
      <body className={`${inter.className} bg-surface-dark select-none`}>
        <div className="relative min-h-screen w-full transition-all duration-700">
          <AuthProvider>{children}</AuthProvider>
        </div>
      </body>
    </html>
  );
}
