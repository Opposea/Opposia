import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { MapPin, Heart, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import OnlineIndicator from './OnlineIndicator';
import VerificationBadge from './VerificationBadge';
import { cn } from '@/lib/utils';

interface ProfileCardProps {
  id: string;
  name: string;
  age?: number;
  bio?: string;
  location?: string;
  avatarUrl?: string;
  interests?: string[];
  isOnline?: boolean;
  isVerified?: boolean;
  compatibilityScore?: number;
  onConnect?: () => void;
  onMessage?: () => void;
  className?: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  id,
  name,
  age,
  bio,
  location,
  avatarUrl,
  interests = [],
  isOnline = false,
  isVerified = false,
  compatibilityScore,
  onConnect,
  onMessage,
  className
}) => {
  return (
    <Card className={cn("hover-lift overflow-hidden", className)}>
      <CardContent className="p-0">
        {/* Header with gradient */}
        <div className="relative h-32 gradient-primary" aria-hidden="true">
        </div>

        {/* Profile Info */}
        <div className="p-6 pt-0 -mt-10">
          <div className="flex items-start justify-between mb-4">
            <div className="relative">
              <Avatar className="w-16 h-16 border-4 border-card shadow-elegant">
                <AvatarImage src={avatarUrl} alt={`${name}'s profile picture`} />
                <AvatarFallback className="text-xl gradient-primary text-primary-foreground">
                  {name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="absolute bottom-1 right-1">
                <OnlineIndicator isOnline={isOnline} />
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold">
                  {name}
                  {age && <span className="text-muted-foreground ml-1">{age}</span>}
                </h3>
                <VerificationBadge verified={isVerified} />
              </div>
              {compatibilityScore && (
                <div className="flex flex-col items-end">
                  <div className="flex items-center gap-1 text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    <Heart className="w-5 h-5 fill-primary text-primary" aria-hidden="true" />
                    {Math.round(compatibilityScore)}%
                  </div>
                  <span className="text-xs text-muted-foreground">Compatibility Match</span>
                </div>
              )}
            </div>

            {location && (
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4" aria-hidden="true" />
                <span className="sr-only">Location: </span>
                {location}
              </div>
            )}

            {bio && (
              <p className="text-sm text-muted-foreground line-clamp-2">
                {bio}
              </p>
            )}

            {interests.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {interests.slice(0, 3).map((interest, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {interest}
                  </Badge>
                ))}
                {interests.length > 3 && (
                  <Badge variant="secondary" className="text-xs">
                    +{interests.length - 3} more
                  </Badge>
                )}
              </div>
            )}

            <div className="flex gap-2 pt-2">
              {onConnect && (
                <Button 
                  onClick={onConnect}
                  className="flex-1 gradient-primary"
                  size="sm"
                  aria-label={`Connect with ${name}`}
                >
                  <Heart className="w-4 h-4 mr-2" aria-hidden="true" />
                  Connect
                </Button>
              )}
              {onMessage && (
                <Button 
                  onClick={onMessage}
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  aria-label={`Send message to ${name}`}
                >
                  <MessageCircle className="w-4 h-4 mr-2" aria-hidden="true" />
                  Message
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
