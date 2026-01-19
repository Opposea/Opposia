import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ChevronLeft, ChevronRight, MapPin, Heart, MessageCircle, Ban } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import OnlineIndicator from './OnlineIndicator';
import VerificationBadge from './VerificationBadge';
import AdminVerificationPanel from './AdminVerificationPanel';
import { cn } from '@/lib/utils';
import { generateBadgesFromQuizAnswers, getBadgeColorClass, QuizBadge, QuizAnswer } from '@/lib/quizBadges';

interface Photo {
  id: string;
  photo_url: string;
  display_order: number;
}

interface Profile {
  id?: string;
  user_id: string;
  name: string;
  age?: number;
  bio?: string;
  location?: string;
  interests?: string[];
  avatar_url?: string;
  country?: string;
  date_of_birth?: string;
  age_verified?: boolean;
  verification_selfie_url?: string | null;
}

interface EnlargedProfileViewProps {
  profile: Profile | null;
  isOpen: boolean;
  onClose: () => void;
  onConnect?: () => void;
  onMessage?: () => void;
  onBlock?: () => void;
  compatibilityScore?: number;
  isOnline?: boolean;
  isVerified?: boolean;
  onVerificationChange?: () => void;
}

const EnlargedProfileView: React.FC<EnlargedProfileViewProps> = ({
  profile,
  isOpen,
  onClose,
  onConnect,
  onMessage,
  onBlock,
  compatibilityScore,
  isOnline = false,
  isVerified = false,
  onVerificationChange,
}) => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [localProfile, setLocalProfile] = useState<Profile | null>(profile);
  const [justVerified, setJustVerified] = useState(false);
  const [quizBadges, setQuizBadges] = useState<QuizBadge[]>([]);

  useEffect(() => {
    setLocalProfile(profile);
    setJustVerified(false); // Reset when profile changes
  }, [profile]);

  useEffect(() => {
    if (profile?.user_id) {
      fetchPhotos();
      fetchQuizBadges();
    }
  }, [profile?.user_id]);

  const fetchQuizBadges = async () => {
    if (!profile?.user_id) return;
    
    try {
      const { data, error } = await supabase
        .from('quiz_answers')
        .select('question_id, answer')
        .eq('user_id', profile.user_id);

      if (error) throw error;
      
      if (data) {
        const badges = generateBadgesFromQuizAnswers(data as QuizAnswer[], 5);
        setQuizBadges(badges);
      }
    } catch (error) {
      console.error('Error fetching quiz badges:', error);
    }
  };

  const handleVerificationChange = async () => {
    // Mark as verified immediately
    setJustVerified(true);
    // Update local state with functional update
    setLocalProfile(prev => {
      if (!prev) return prev;
      return { ...prev, age_verified: true };
    });
    // Call parent callback
    onVerificationChange?.();
  };

  const fetchPhotos = async () => {
    if (!profile?.user_id) return;
    
    try {
      const { data, error } = await supabase
        .from('user_photos' as any)
        .select('*')
        .eq('user_id', profile.user_id)
        .order('display_order', { ascending: true });

      if (error) throw error;
      
      // Combine avatar and additional photos
      const allPhotos: Photo[] = [];
      if (profile.avatar_url) {
        allPhotos.push({
          id: 'avatar',
          photo_url: profile.avatar_url,
          display_order: -1,
        });
      }
      if (data) {
        allPhotos.push(...(data as any));
      }
      
      setPhotos(allPhotos);
    } catch (error) {
      console.error('Error fetching photos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePrevPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev > 0 ? prev - 1 : photos.length - 1));
  };

  const handleNextPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev < photos.length - 1 ? prev + 1 : 0));
  };

  // Swipe handlers for mobile
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe) {
      handleNextPhoto();
    } else if (isRightSwipe) {
      handlePrevPhoto();
    }
  };

  if (!localProfile) return null;

  const currentPhoto = photos[currentPhotoIndex]?.photo_url || localProfile.avatar_url;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0">
        <div className="flex flex-col md:flex-row">
          {/* Photo Section */}
          <div className="relative md:w-1/2 bg-muted">
            <div 
              className="aspect-[3/4] relative"
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            >
              <Avatar className="w-full h-full rounded-none">
                <AvatarImage src={currentPhoto} className="object-cover" />
                <AvatarFallback className="rounded-none text-4xl">
                  {localProfile.name.charAt(0)}
                </AvatarFallback>
              </Avatar>

              {photos.length > 1 && (
                <>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full opacity-80 hover:opacity-100"
                    onClick={handlePrevPhoto}
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </Button>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full opacity-80 hover:opacity-100"
                    onClick={handleNextPhoto}
                  >
                    <ChevronRight className="w-5 h-5" />
                  </Button>

                  {/* Photo indicators */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {photos.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentPhotoIndex(index)}
                        className={cn(
                          "w-2 h-2 rounded-full transition-all",
                          index === currentPhotoIndex
                            ? "bg-white w-6"
                            : "bg-white/50 hover:bg-white/75"
                        )}
                      />
                    ))}
                  </div>
                </>
              )}

              <div className="absolute top-4 right-4">
                <OnlineIndicator isOnline={isOnline} />
              </div>
            </div>
          </div>

          {/* Info Section */}
          <div className="md:w-1/2 p-6 space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <h2 className="text-3xl font-bold">
                  {localProfile.name}
                  {localProfile.age && <span className="text-muted-foreground ml-2">{localProfile.age}</span>}
                </h2>
                <VerificationBadge verified={isVerified} />
                {compatibilityScore && (
                  <Badge className="bg-primary/10 text-primary">
                    {compatibilityScore}% Match
                  </Badge>
                )}
              </div>

              {localProfile.location && (
                <div className="flex items-center gap-1 text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  {localProfile.location}
                </div>
              )}
            </div>

            {localProfile.bio && (
              <div>
                <h3 className="font-semibold mb-2">About</h3>
                <p className="text-muted-foreground">{localProfile.bio}</p>
              </div>
            )}

            {localProfile.interests && localProfile.interests.length > 0 && (
              <div>
                <h3 className="font-semibold mb-2">Interests</h3>
                <div className="flex flex-wrap gap-2">
                  {localProfile.interests.map((interest, index) => (
                    <Badge key={index} variant="secondary">
                      {interest}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Quiz-based personality badges */}
            {quizBadges.length > 0 && (
              <div>
                <h3 className="font-semibold mb-2">Personality</h3>
                <div className="flex flex-wrap gap-2">
                  {quizBadges.map((badge, index) => (
                    <Badge 
                      key={index} 
                      variant="outline"
                      className={cn("text-sm", getBadgeColorClass(badge.color))}
                    >
                      <span className="mr-1">{badge.emoji}</span>
                      {badge.label}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Admin Verification Panel - Only visible to admins for unverified users */}
            {localProfile.id && !localProfile.age_verified && !justVerified && (
              <AdminVerificationPanel
                userId={localProfile.user_id}
                profileId={localProfile.id}
                currentlyVerified={localProfile.age_verified || false}
                userCountry={localProfile.country}
                dateOfBirth={localProfile.date_of_birth}
                verificationSelfieUrl={localProfile.verification_selfie_url}
                onVerificationChange={handleVerificationChange}
              />
            )}

            <div className="flex flex-col gap-2 pt-4">
              {onConnect && (
                <Button onClick={onConnect} className="w-full" size="lg">
                  <Heart className="w-5 h-5 mr-2" />
                  Connect
                </Button>
              )}
              {onMessage && (
                <Button onClick={onMessage} variant="outline" className="w-full" size="lg">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Message
                </Button>
              )}
              {onBlock && (
                <Button onClick={onBlock} variant="destructive" className="w-full" size="lg">
                  <Ban className="w-5 h-5 mr-2" />
                  Block User
                </Button>
              )}
              <p className="text-xs text-center text-muted-foreground">
                To report a user, please{' '}
                <a 
                  href="mailto:support@opposia.com"
                  className="text-primary hover:underline"
                >
                  contact support
                </a>
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EnlargedProfileView;
