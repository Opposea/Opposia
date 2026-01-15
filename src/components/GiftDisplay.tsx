import React from 'react';
import { Heart, Coffee, Flower2, Sparkles } from 'lucide-react';

interface GiftDisplayProps {
  giftType: string;
  giftName: string;
  message?: string | null;
  isOwn: boolean;
  timestamp: string;
  senderName?: string;
}

const GIFT_CONFIGS: Record<string, { 
  emoji: string; 
  gradient: string; 
  icon: React.ElementType;
  animation: string;
  bgPattern: string;
}> = {
  heart: {
    emoji: '❤️',
    gradient: 'from-red-400 via-pink-500 to-rose-500',
    icon: Heart,
    animation: 'animate-pulse',
    bgPattern: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.2) 0%, transparent 50%)',
  },
  rose: {
    emoji: '🌹',
    gradient: 'from-pink-400 via-rose-500 to-pink-600',
    icon: Flower2,
    animation: 'animate-bounce',
    bgPattern: 'radial-gradient(circle at 70% 70%, rgba(255,255,255,0.15) 0%, transparent 50%)',
  },
  coffee: {
    emoji: '☕',
    gradient: 'from-amber-400 via-orange-500 to-amber-600',
    icon: Coffee,
    animation: '',
    bgPattern: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 0%, transparent 60%)',
  },
};

const GiftDisplay: React.FC<GiftDisplayProps> = ({
  giftType,
  giftName,
  message,
  isOwn,
  timestamp,
  senderName,
}) => {
  const config = GIFT_CONFIGS[giftType] || GIFT_CONFIGS.heart;
  const IconComponent = config.icon;

  return (
    <div className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}>
      <div className="relative max-w-xs">
        {/* Floating sparkles */}
        <div className="absolute -top-2 -right-2 z-10">
          <Sparkles className="w-5 h-5 text-yellow-400 animate-pulse" />
        </div>
        <div className="absolute -bottom-1 -left-2 z-10">
          <Sparkles className="w-4 h-4 text-yellow-300 animate-pulse" style={{ animationDelay: '0.5s' }} />
        </div>
        
        {/* Main gift card */}
        <div 
          className={`
            relative overflow-hidden rounded-3xl p-5 shadow-lg
            bg-gradient-to-br ${config.gradient}
            transform transition-all duration-300 hover:scale-105
          `}
          style={{ backgroundImage: config.bgPattern }}
        >
          {/* Animated background circles */}
          <div className="absolute -top-4 -right-4 w-16 h-16 bg-white/10 rounded-full blur-xl" />
          <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-white/10 rounded-full blur-xl" />
          
          {/* Gift icon with animation */}
          <div className="flex justify-center mb-3">
            <div className={`
              w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm
              flex items-center justify-center
              shadow-inner border border-white/30
              ${config.animation}
            `}>
              <span className="text-4xl">{config.emoji}</span>
            </div>
          </div>
          
          {/* Gift name */}
          <p className="text-center font-bold text-lg mb-1 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]">
            {giftName}
          </p>
          
          {/* Sender info */}
          {!isOwn && senderName && (
            <p className="text-center text-sm mb-2 text-white/90 drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]">
              from {senderName}
            </p>
          )}
          
          {/* Message */}
          {message && (
            <div className="mt-3 bg-black/20 backdrop-blur-sm rounded-xl p-3 border border-white/20">
              <p className="text-white text-sm text-center italic drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]">"{message}"</p>
            </div>
          )}
          
          {/* Timestamp */}
          <p className="text-center text-xs mt-3 text-white/80 drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]">
            {new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </p>
        </div>
        
        {/* Decorative hearts for heart gift */}
        {giftType === 'heart' && (
          <>
            <div className="absolute top-0 left-0 text-red-400 opacity-60 animate-ping" style={{ animationDuration: '2s' }}>
              <Heart className="w-3 h-3 fill-current" />
            </div>
            <div className="absolute bottom-4 right-0 text-pink-400 opacity-60 animate-ping" style={{ animationDuration: '2.5s', animationDelay: '0.5s' }}>
              <Heart className="w-4 h-4 fill-current" />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default GiftDisplay;
