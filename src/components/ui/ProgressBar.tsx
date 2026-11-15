import { cn } from '@/lib/utils';

interface ProgressBarProps {
  value: number; // 0 - 100
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'accent' | 'success';
  showLabel?: boolean;
  label?: string;
  className?: string;
}

export function ProgressBar({
  value,
  size = 'md',
  color = 'primary',
  showLabel,
  label,
  className,
}: ProgressBarProps) {
  const clampedValue = Math.min(100, Math.max(0, Math.round(value)));

  return (
    <div className={cn('w-full', className)}>
      {(showLabel || label) && (
        <div className="flex justify-between items-center mb-1 text-xs">
          {label && <span className="text-stone-600 font-medium">{label}</span>}
          {showLabel && <span className="text-stone-500 font-semibold">{clampedValue}%</span>}
        </div>
      )}
      <div
        className={cn(
          'w-full bg-stone-100 rounded-full overflow-hidden',
          size === 'sm' && 'h-1.5',
          size === 'md' && 'h-2.5',
          size === 'lg' && 'h-4'
        )}
        role="progressbar"
        aria-valuenow={clampedValue}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className={cn(
            'h-full rounded-full transition-all duration-500 ease-out',
            color === 'primary' && 'bg-primary-600',
            color === 'accent' && 'bg-amber-500',
            color === 'success' && 'bg-emerald-500'
          )}
          style={{ width: `${clampedValue}%` }}
        />
      </div>
    </div>
  );
}
