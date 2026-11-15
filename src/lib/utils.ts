import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string): string {
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(dateString));
}

export function getStatusColor(status: string): string {
  switch (status) {
    case 'available':
      return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    case 'in-progress':
      return 'bg-blue-50 text-blue-700 border-blue-200';
    case 'completed':
      return 'bg-teal-50 text-teal-700 border-teal-200';
    case 'coming-soon':
      return 'bg-purple-50 text-purple-700 border-purple-200';
    default:
      return 'bg-stone-50 text-stone-700 border-stone-200';
  }
}

export function getStatusLabel(status: string): string {
  switch (status) {
    case 'available':
      return 'Available';
    case 'in-progress':
      return 'In Progress';
    case 'completed':
      return 'Completed';
    case 'coming-soon':
      return 'Coming Soon';
    default:
      return status;
  }
}
