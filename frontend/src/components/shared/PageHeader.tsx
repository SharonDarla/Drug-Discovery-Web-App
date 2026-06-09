import React from 'react';
import { cn } from '@/lib/utils';

interface PageHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  subtitle?: string;
  gradientTitle?: string;
  centered?: boolean;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  gradientTitle,
  centered = true,
  className,
  ...props
}) => {
  return (
    <div
      className={cn(
        "flex flex-col mb-10 max-w-3xl mx-auto animate-fadeIn",
        centered ? "items-center text-center" : "items-start text-left",
        className
      )}
      {...props}
    >
      <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-800 dark:text-slate-100 flex flex-wrap justify-center gap-x-2">
        <span>{title}</span>
        {gradientTitle && (
          <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
            {gradientTitle}
          </span>
        )}
      </h1>
      {subtitle && (
        <p className="mt-3 text-sm sm:text-base text-slate-500 dark:text-slate-400 leading-relaxed max-w-2xl">
          {subtitle}
        </p>
      )}
      <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mt-4" />
    </div>
  );
};
