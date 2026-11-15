import { cn } from '@/lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'flat';
  interactive?: boolean;
}

export function Card({ className, variant = 'default', interactive, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'bg-white rounded-[10px] overflow-hidden',
        variant === 'default' && 'shadow-card border border-stone-100',
        variant === 'elevated' && 'shadow-elevated',
        variant === 'flat' && 'border border-stone-200',
        interactive && 'cursor-pointer transition-all duration-200 hover:shadow-elevated hover:-translate-y-0.5 active:translate-y-0',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('p-5 pb-0', className)} {...props}>{children}</div>;
}

export function CardContent({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('p-5', className)} {...props}>{children}</div>;
}

export function CardFooter({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('px-5 pb-5 pt-0', className)} {...props}>{children}</div>;
}
