import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, BookOpen, Search, BarChart3, GraduationCap, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { to: '/', icon: Home, label: 'Home' },
  { to: '/subjects', icon: BookOpen, label: 'Subjects' },
  { to: '/search', icon: Search, label: 'Search' },
  { to: '/progress', icon: BarChart3, label: 'Progress' },
];

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-surface-warm text-stone-900 flex flex-col font-sans antialiased selection:bg-primary-100 selection:text-primary-900">
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200/80 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Logo & Product Title */}
          <Link to="/" className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 rounded-xl p-1">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-700 to-primary-900 text-white flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-base sm:text-lg tracking-tight text-stone-900 leading-none">
                  Reme's KFU
                </span>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-primary-700 bg-primary-50 px-1.5 py-0.5 rounded border border-primary-200/50">
                  5th Sem
                </span>
              </div>
              <p className="text-[11px] text-stone-500 font-medium leading-tight mt-0.5 hidden xs:block">
                Kazan Federal University Medical Platform
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1.5" aria-label="Main Navigation">
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = item.to === '/' ? location.pathname === '/' : location.pathname.startsWith(item.to);
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={cn(
                    'flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-200',
                    isActive
                      ? 'bg-primary-50 text-primary-800 font-semibold shadow-xs border border-primary-100'
                      : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100/80'
                  )}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* User Badge / Quick Greeting */}
          <div className="hidden sm:flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-stone-50 border border-stone-200/80 text-xs font-medium text-stone-700">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Riham · KFU DM</span>
            </div>
          </div>

          {/* Mobile hamburger button */}
          <button
            type="button"
            className="md:hidden p-2 rounded-xl text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Dropdown Panel */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-stone-200 bg-white px-4 py-3 space-y-1 animate-slide-up shadow-md">
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = item.to === '/' ? location.pathname === '/' : location.pathname.startsWith(item.to);
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    'flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-primary-50 text-primary-800 font-semibold'
                      : 'text-stone-700 hover:bg-stone-50'
                  )}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
            <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500 px-3">
              <span>Riham's Medical Space</span>
              <span className="font-semibold text-primary-700">5th Semester</span>
            </div>
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <main className="flex-1 pb-24 md:pb-12">
        {children}
      </main>

      {/* Mobile Bottom Navigation Bar (Thumb Friendly) */}
      <nav
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-stone-200/90 shadow-[0_-4px_16px_rgba(0,0,0,0.04)] px-3 py-2 pb-[max(0.5rem,env(safe-area-inset-bottom))]"
        aria-label="Mobile Navigation"
      >
        <div className="flex items-center justify-around max-w-md mx-auto">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = item.to === '/' ? location.pathname === '/' : location.pathname.startsWith(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  'flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all duration-200 min-w-[60px]',
                  isActive
                    ? 'text-primary-800 scale-105'
                    : 'text-stone-500 hover:text-stone-800'
                )}
                aria-current={isActive ? 'page' : undefined}
              >
                <div
                  className={cn(
                    'w-9 h-7 rounded-lg flex items-center justify-center transition-colors',
                    isActive ? 'bg-primary-100/70 text-primary-800' : 'text-stone-500'
                  )}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <span className={cn('text-[11px] mt-0.5 tracking-tight', isActive ? 'font-bold text-primary-900' : 'font-medium')}>
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
