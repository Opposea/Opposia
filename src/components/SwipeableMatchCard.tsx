import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Heart, MapPin, MessageCircle, Gift, Phone, Video, Ban, ChevronLeft, ChevronRight } from 'lucide-react';
interface SwipeableMatchCardProps {
  match: any;
  onViewProfile: () => void;
  onChat: () => void;
  onBlock: () => void;
  onRemove: () => void;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
}
const SwipeableMatchCard: React.FC<SwipeableMatchCardProps> = ({
  match,
  onViewProfile,
  onChat,
  onBlock,
  onRemove,
  onSwipeLeft,
  onSwipeRight
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [startX, setStartX] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const compatibilityScore = match.compatibility_score || 0;
  const compatibilityPercent = Math.round(compatibilityScore);
  const handleDragStart = (clientX: number) => {
    setIsDragging(true);
    setStartX(clientX);
  };
  const handleDragMove = (clientX: number) => {
    if (!isDragging) return;
    const offset = clientX - startX;
    setDragOffset(offset);
  };
  const handleDragEnd = () => {
    setIsDragging(false);
    const threshold = 100;
    if (Math.abs(dragOffset) > threshold) {
      if (dragOffset > 0 && onSwipeRight) {
        onSwipeRight();
      } else if (dragOffset < 0 && onSwipeLeft) {
        onSwipeLeft();
      }
    }
    setDragOffset(0);
  };
  const rotation = isDragging ? dragOffset / 20 : 0;
  const opacity = 1 - Math.abs(dragOffset) / 300;
  return <div className="relative w-full max-w-2xl mx-auto">
      <Card ref={cardRef} className="overflow-hidden border-primary/20 shadow-2xl bg-card/80 backdrop-blur-sm transition-all duration-200 cursor-grab active:cursor-grabbing select-none touch-none" style={{
      transform: `translateX(${dragOffset}px) rotate(${rotation}deg)`,
      opacity: opacity,
      transition: isDragging ? 'none' : 'transform 0.3s ease-out, opacity 0.3s ease-out'
    }} onMouseDown={e => handleDragStart(e.clientX)} onMouseMove={e => handleDragMove(e.clientX)} onMouseUp={handleDragEnd} onMouseLeave={handleDragEnd} onTouchStart={e => handleDragStart(e.touches[0].clientX)} onTouchMove={e => handleDragMove(e.touches[0].clientX)} onTouchEnd={handleDragEnd}>
        <div className="relative">
          <div className="aspect-[3/4] overflow-hidden bg-gradient-to-br from-primary/10 to-secondary/10 cursor-pointer" onClick={onViewProfile}>
            {match.profiles?.avatar_url ? <img src={match.profiles.avatar_url} alt={`${match.profiles.name}'s profile picture`} className="w-full h-full object-cover" draggable={false} /> : <div className="w-full h-full flex items-center justify-center">
                <div className="w-48 h-48 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-8xl" role="img" aria-label={`${match.profiles?.name || 'User'}'s profile placeholder`}>
                  {match.profiles?.name?.charAt(0) || '?'}
                </div>
              </div>}
          </div>

          {/* Swipe indicators */}
          {isDragging && <>
              <div className="absolute inset-0 flex items-center justify-start pl-12 pointer-events-none" style={{
            opacity: dragOffset > 0 ? Math.min(dragOffset / 100, 1) : 0
          }}>
                <div className="bg-blue-500/90 text-white px-8 py-4 rounded-full text-2xl font-bold shadow-xl rotate-[-20deg]">
                  ← PREVIOUS
                </div>
              </div>
              <div className="absolute inset-0 flex items-center justify-end pr-12 pointer-events-none" style={{
            opacity: dragOffset < 0 ? Math.min(Math.abs(dragOffset) / 100, 1) : 0
          }}>
                <div className="bg-purple-500/90 text-white px-8 py-4 rounded-full text-2xl font-bold shadow-xl rotate-[20deg]">
                  NEXT →
                </div>
              </div>
            </>}
        </div>
        
        <CardContent className="p-8 space-y-6">
          <div className="flex items-start justify-between">
            <div className="flex-1 cursor-pointer" onClick={onViewProfile}>
              <h3 className="text-3xl font-bold mb-2">{match.profiles?.name}</h3>
              <p className="text-lg text-muted-foreground mb-2">
                {match.profiles?.age ? `${match.profiles.age} years old` : 'Age not set'}
              </p>
              {match.profiles?.location && <div className="flex items-center gap-2 text-base text-muted-foreground">
                  <MapPin className="w-5 h-5" aria-hidden="true" />
                  <span className="sr-only">Location: </span>
                  {match.profiles.location}
                </div>}
              {match.profiles?.bio && <p className="text-sm text-muted-foreground mt-3 line-clamp-3">
                  {match.profiles.bio}
                </p>}
            </div>
            <div className="flex flex-col items-end ml-4">
              <div className="flex items-center gap-2 text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                <Heart className="w-8 h-8 fill-primary text-primary" aria-hidden="true" />
                {compatibilityPercent}%
              </div>
              <span className="text-sm text-muted-foreground mt-1">Compatibility Score</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button className="bg-gradient-to-r from-cyan-500 to-cyan-600 hover:opacity-90 text-white border-0 h-12" onClick={e => {
            e.stopPropagation();
            onChat();
          }} aria-label={`Chat with ${match.profiles?.name}`}>
              <MessageCircle className="w-5 h-5 mr-2" aria-hidden="true" />
              Chat
            </Button>
            
            
            
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-primary/10">
            <Button size="sm" variant="destructive" className="bg-gradient-to-r from-red-500 to-red-600 hover:opacity-90" onClick={e => {
            e.stopPropagation();
            onBlock();
          }} aria-label={`Block ${match.profiles?.name}`}>
              <Ban className="w-4 h-4 mr-2" aria-hidden="true" />
              Block User
            </Button>
            <Button size="sm" variant="ghost" className="text-muted-foreground hover:text-foreground" onClick={e => {
            e.stopPropagation();
            onRemove();
          }} aria-label={`Remove match with ${match.profiles?.name}`}>
              Remove Match
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Swipe instruction hint */}
      <div className="text-center mt-4 text-sm text-muted-foreground">
        👆 Swipe right for previous • Swipe left for next
      </div>
    </div>;
};
export default SwipeableMatchCard;