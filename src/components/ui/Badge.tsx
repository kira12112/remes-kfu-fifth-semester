import { cn } from '@/lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'available' | 'coming-soon' | 'in-progress' | 'completed' | 'outline';
  size?: 'sm' | 'md';
  className?: string;
}

export function Badge({ children, variant = 'default', size = 'md', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center font-medium rounded-full whitespace-nowrap',
        size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-sm',
        variant === 'default' && 'bg-stone-100 text-stone-700',
        variant === 'available' && 'bg-emerald-100 text-emerald-800',
        variant === 'coming-soon' && 'bg-purple-100 text-purple-800',
        variant === 'in-progress' && 'bg-blue-100 text-blue-800',
        variant === 'completed' && 'bg-teal-100 text-teal-800',
        variant === 'outline' && 'border border-stone-200 text-stone-600',
        className
      )}
    >
      {children}
    </span>
  );
}
