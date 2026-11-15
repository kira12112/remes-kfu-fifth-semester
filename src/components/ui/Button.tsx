import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  loading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', loading, disabled, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          'inline-flex items-center justify-center font-medium transition-all duration-200',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          'rounded-md',
          size === 'sm' && 'h-8 px-3 text-sm gap-1.5',
          size === 'md' && 'h-10 px-4 text-sm gap-2',
          size === 'lg' && 'h-12 px-6 text-base gap-2',
          size === 'icon' && 'h-10 w-10',
          variant === 'primary' && 'bg-primary-700 text-white hover:bg-primary-800 active:bg-primary-900 shadow-sm',
          variant === 'secondary' && 'bg-stone-100 text-stone-900 hover:bg-stone-200 active:bg-stone-300',
          variant === 'outline' && 'border border-stone-200 bg-white text-stone-700 hover:bg-stone-50 hover:border-stone-300',
          variant === 'ghost' && 'text-stone-700 hover:bg-stone-100 active:bg-stone-200',
          variant === 'danger' && 'bg-red-600 text-white hover:bg-red-700',
          className
        )}
        {...props}
      >
        {loading ? (
          <span className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
        ) : children}
      </button>
    );
  }
);
Button.displayName = 'Button';
