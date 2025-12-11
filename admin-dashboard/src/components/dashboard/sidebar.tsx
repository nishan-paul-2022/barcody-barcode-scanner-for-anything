'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BarChart, Users, Scan, Settings, LayoutDashboard } from 'lucide-react';

import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  className?: string;
}

export function Sidebar({ className, ...props }: SidebarNavProps) {
  const pathname = usePathname();

  const items = [
    {
      title: 'Dashboard',
      href: '/', // Assuming dashboard is at root
      icon: LayoutDashboard,
    },
    {
      title: 'Analytics',
      href: '/analytics',
      icon: BarChart,
    },
    {
      title: 'Users',
      href: '/users',
      icon: Users,
    },
    {
      title: 'Scans',
      href: '/scans',
      icon: Scan,
    },
    {
      title: 'Settings',
      href: '/settings',
      icon: Settings,
    },
  ];

  return (
    <nav
      className={cn(
        'flex space-x-2 lg:flex-col lg:space-y-1 lg:space-x-0',
        className
      )}
      {...props}
    >
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            buttonVariants({ variant: 'ghost' }),
            pathname === item.href
              ? 'bg-muted hover:bg-muted'
              : 'hover:bg-transparent hover:underline',
            'justify-start'
          )}
        >
          <item.icon className="mr-2 h-4 w-4" />
          {item.title}
        </Link>
      ))}
    </nav>
  );
}
