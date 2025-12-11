import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface VerificationBadgeProps {
  verified?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const VerificationBadge: React.FC<VerificationBadgeProps> = ({ 
  verified = false, 
  size = 'md',
  className 
}) => {
  if (!verified) return null;

  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  return (
    <Tooltip>
      <TooltipTrigger>
        <CheckCircle2 
          className={cn(
            "text-accent fill-accent/20",
            sizeClasses[size],
            className
          )}
        />
      </TooltipTrigger>
      <TooltipContent>
        <p>Verified Profile</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default VerificationBadge;
