
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface TrendCardProps {
  title: string;
  description: string;
  timestamp: string;
  tags: string[];
  metric?: {
    label: string;
    value: string | number;
    trend: 'up' | 'down' | 'neutral';
  };
  className?: string;
}

const TrendCard: React.FC<TrendCardProps> = ({
  title,
  description,
  timestamp,
  tags,
  metric,
  className
}) => {
  return (
    <Card className={cn("overflow-hidden border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900/50 backdrop-blur-sm p-4 shadow-sm hover:shadow-lg transition-all duration-200 hover:-translate-y-1 rounded-xl flex flex-col justify-between h-full", className)}>
      <CardHeader className="p-0 pb-2">
        <CardTitle className="text-lg font-semibold text-slate-800 dark:text-slate-100">{title}</CardTitle>
        <CardDescription className="text-xs text-slate-500 dark:text-slate-400">{timestamp}</CardDescription>
      </CardHeader>
      <CardContent className="p-0 pt-2 flex-1 flex flex-col justify-between">
        <div>
          <p className="text-sm text-slate-650 dark:text-slate-350 mb-4 leading-relaxed">{description}</p>
          
          {metric && (
            <div className="flex items-center gap-2 mb-4">
              <div className="text-2xl font-black font-mono text-slate-800 dark:text-slate-150">{metric.value}</div>
              <div className="text-[10px] uppercase tracking-wider text-slate-400 dark:text-slate-550 font-bold">{metric.label}</div>
              {metric.trend === 'up' && (
                <Badge variant="outline" className="bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 border-emerald-250 dark:border-emerald-900/30 text-[10px] font-bold">
                  ↑ Rising
                </Badge>
              )}
              {metric.trend === 'down' && (
                <Badge variant="outline" className="bg-rose-50 dark:bg-rose-950/30 text-rose-700 dark:text-rose-450 border-rose-250 dark:border-rose-900/30 text-[10px] font-bold">
                  ↓ Declining
                </Badge>
              )}
              {metric.trend === 'neutral' && (
                <Badge variant="outline" className="bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-405 border-blue-250 dark:border-blue-900/30 text-[10px] font-bold">
                  ↔ Stable
                </Badge>
              )}
            </div>
          )}
        </div>
        
        <div className="flex flex-wrap gap-1.5 pt-2">
          {tags.map((tag, index) => (
            <Badge key={index} variant="secondary" className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors text-[10px] font-semibold rounded-md">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TrendCard;
