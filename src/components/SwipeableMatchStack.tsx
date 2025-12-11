import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Grid3x3 } from 'lucide-react';
import SwipeableMatchCard from './SwipeableMatchCard';
import { Card, CardContent } from '@/components/ui/card';

interface SwipeableMatchStackProps {
  matches: any[];
  onViewProfile: (match: any) => void;
  onChat: (matchId: string) => void;
  onBlock: (userId: string) => void;
  onRemove: (matchId: string) => void;
  onToggleView: () => void;
}

const SwipeableMatchStack: React.FC<SwipeableMatchStackProps> = ({
  matches,
  onViewProfile,
  onChat,
  onBlock,
  onRemove,
  onToggleView,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Reset index if it's out of bounds
  React.useEffect(() => {
    if (currentIndex >= matches.length && matches.length > 0) {
      setCurrentIndex(matches.length - 1);
    }
  }, [matches.length, currentIndex]);

  const handleNext = () => {
    if (currentIndex < matches.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleSwipeLeft = () => {
    // Swipe left = go to next card
    handleNext();
  };

  const handleSwipeRight = () => {
    // Swipe right = go to previous card
    handlePrevious();
  };

  if (matches.length === 0) {
    return null;
  }

  const currentMatch = matches[currentIndex];

  // Safety check: if currentMatch is undefined, don't render
  if (!currentMatch) {
    return null;
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header with navigation */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className="border-primary/20"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              {currentIndex + 1} of {matches.length} matches
            </p>
          </div>

          <Button
            variant="outline"
            size="icon"
            onClick={handleNext}
            disabled={currentIndex === matches.length - 1}
            className="border-primary/20"
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={onToggleView}
          className="border-primary/20 gap-2"
        >
          <Grid3x3 className="w-4 h-4" />
          Grid View
        </Button>
      </div>

      {/* Swipeable card */}
      <SwipeableMatchCard
        key={currentMatch.id}
        match={currentMatch}
        onViewProfile={() => onViewProfile(currentMatch)}
        onChat={() => onChat(currentMatch.id)}
        onBlock={() => {
          if (currentMatch.profiles?.user_id) {
            onBlock(currentMatch.profiles.user_id);
          }
        }}
        onRemove={() => onRemove(currentMatch.id)}
        onSwipeLeft={handleSwipeLeft}
        onSwipeRight={handleSwipeRight}
      />

      {/* Progress dots */}
      <div className="flex justify-center gap-2">
        {matches.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'w-8 bg-gradient-to-r from-primary to-secondary' 
                : 'w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50'
            }`}
            aria-label={`Go to match ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default SwipeableMatchStack;
