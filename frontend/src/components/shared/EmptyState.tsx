import React from 'react';
import { LucideIcon } from 'lucide-react';
import { Button } from './Button';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-3xl bg-slate-50/20 dark:bg-slate-900/10 backdrop-blur-sm max-w-lg mx-auto animate-fadeIn">
      <div className="p-4 bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 rounded-2xl mb-4 shadow-inner">
        <Icon className="w-10 h-10" />
      </div>
      <h3 className="text-lg font-bold text-slate-850 dark:text-slate-100">
        {title}
      </h3>
      <p className="text-slate-500 dark:text-slate-400 text-sm max-w-sm mt-2 leading-relaxed">
        {description}
      </p>
      {actionLabel && onAction && (
        <Button 
          onClick={onAction} 
          variant="outline" 
          size="sm" 
          className="mt-6 rounded-xl"
        >
          {actionLabel}
        </Button>
      )}
    </div>
  );
};
