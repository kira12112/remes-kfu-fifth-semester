import { cn } from '@/lib/utils';

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

export function EmptyState({ icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center text-center py-12 px-4', className)}>
      {icon && <div className="mb-3 text-stone-300">{icon}</div>}
      <h3 className="text-base font-semibold text-stone-800 mb-1">{title}</h3>
      {description && <p className="text-stone-500 text-xs sm:text-sm max-w-sm mb-4 leading-relaxed">{description}</p>}
      {action}
    </div>
  );
}
