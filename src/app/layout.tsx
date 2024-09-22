// app/layout.tsx
import './globals.css';
import { Inter } from 'next/font/google';
import { AuthProvider } from './context/AuthContext';
import { TaskProvider } from './context/TaskContext'; // Import TaskProvider
import Navbar from '@/components/Navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Task Manager',
  description: 'Manage your tasks efficiently',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <TaskProvider>
            <Navbar />
            <main className="container mx-auto mt-4">
              {children}
            </main>
          </TaskProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
