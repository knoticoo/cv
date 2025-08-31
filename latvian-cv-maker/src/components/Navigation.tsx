'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';
import { Button } from '@/components/ui/button';
import { Globe, FileText, Layout, User, Mail, HelpCircle, Crown, UserCircle, LogOut } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';

export default function Navigation() {
  const t = useTranslations('navigation');
  const pathname = usePathname();
  const locale = useLocale();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const session = localStorage.getItem('user-session');
      setUser(session ? JSON.parse(session) : null);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user-session');
    setUser(null);
    window.location.href = '/';
  };

  const navItems = [
    { href: '/', label: t('home'), icon: FileText },
    { href: '/create', label: t('createCV'), icon: User },
    ...(user ? [{ href: '/profile', label: 'Mans Profils', icon: UserCircle }] : []),
    { href: '/templates', label: t('templates'), icon: Layout },
    { href: '/premium', label: 'Premium', icon: Crown },
    { href: '/cover-letter', label: t('coverLetter'), icon: Mail },
    { href: '/help', label: t('help'), icon: HelpCircle },
  ];

  return (
    <nav className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-latvian-red to-red-600 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl text-foreground">
              CV Maker
            </span>
            <span className="text-xs bg-latvian-red text-white px-2 py-1 rounded-full">
              🇱🇻 LV
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              
              return (
                <Link key={item.href} href={item.href}>
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    size="sm"
                    className="flex items-center space-x-2"
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </Button>
                </Link>
              );
            })}
          </div>

          {/* Language Switcher & Auth */}
          <div className="flex items-center space-x-2">
            <LanguageSwitcher />
            
            {user ? (
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground hidden sm:block">
                  {user.firstName}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                  className="flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">Iziet</span>
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link href="/auth/login">
                  <Button variant="ghost" size="sm">
                    Ielogoties
                  </Button>
                </Link>
                <Link href="/auth/register">
                  <Button size="sm">
                    Reģistrēties
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden pb-4">
          <div className="flex flex-wrap gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              
              return (
                <Link key={item.href} href={item.href}>
                  <Button
                    variant={isActive ? "default" : "outline"}
                    size="sm"
                    className="flex items-center space-x-1"
                  >
                    <Icon className="w-3 h-3" />
                    <span className="text-xs">{item.label}</span>
                  </Button>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}