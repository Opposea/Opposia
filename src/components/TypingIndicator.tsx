import React from 'react';

interface TypingIndicatorProps {
  name?: string;
}

const TypingIndicator: React.FC<TypingIndicatorProps> = ({ name }) => {
  return (
    <div className="flex items-center gap-2 text-muted-foreground text-sm">
      <div className="flex gap-1">
        <span className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
        <span className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
        <span className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
      </div>
      {name && <span>{name} is typing...</span>}
    </div>
  );
};

export default TypingIndicator;
