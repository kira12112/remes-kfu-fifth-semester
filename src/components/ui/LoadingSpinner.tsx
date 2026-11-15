import { cn } from '@/lib/utils';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  label?: string;
}

export function LoadingSpinner({ size = 'md', className, label }: LoadingSpinnerProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center gap-3 py-6', className)} role="status">
      <div
        className={cn(
          'animate-spin rounded-full border-2 border-stone-200 border-t-primary-600',
          size === 'sm' && 'h-5 w-5',
          size === 'md' && 'h-8 w-8',
          size === 'lg' && 'h-12 w-12'
        )}
      />
      {label && <p className="text-xs text-stone-500 font-medium">{label}</p>}
      <span className="sr-only">Loading...</span>
    </div>
  );
}
