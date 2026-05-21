
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
    <Card className={cn("overflow-hidden transition-all duration-300 hover:shadow-md", className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">{title}</CardTitle>
        <CardDescription className="text-sm text-muted-foreground">{timestamp}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm mb-4">{description}</p>
        
        {metric && (
          <div className="flex items-center gap-2 mb-4">
            <div className="text-2xl font-bold">{metric.value}</div>
            <div className="text-xs text-muted-foreground">{metric.label}</div>
            {metric.trend === 'up' && (
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                ↑ Rising
              </Badge>
            )}
            {metric.trend === 'down' && (
              <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                ↓ Declining
              </Badge>
            )}
            {metric.trend === 'neutral' && (
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                ↔ Stable
              </Badge>
            )}
          </div>
        )}
        
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <Badge key={index} variant="secondary" className="hover:bg-secondary/80 transition-colors">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TrendCard;
