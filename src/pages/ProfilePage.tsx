import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { isValidUUID } from '@/lib/validation';
import { generateBadgesFromQuizAnswers, getBadgeColorClass, QuizAnswer } from '@/lib/quizBadges';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Heart, MessageCircle, User, MapPin, Calendar, Mail, RefreshCw, Search, Sparkles, Trash2, Ban, AlertCircle, Gift, LayoutGrid, UserX, ShieldCheck } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useIsAdmin } from '@/hooks/useIsAdmin';
import { Switch } from '@/components/ui/switch';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import AvatarUpload from '@/components/AvatarUpload';
import MessagesTab from '@/components/MessagesTab';
import ProfileCard from '@/components/ProfileCard';
import OnlineIndicator from '@/components/OnlineIndicator';
import VerificationBadge from '@/components/VerificationBadge';
import PhotoGallery from '@/components/PhotoGallery';
import EnlargedProfileView from '@/components/EnlargedProfileView';
import SwipeableMatchStack from '@/components/SwipeableMatchStack';
import GiftSender from '@/components/GiftSender';
import AdminDeletionRequestsPanel from '@/components/AdminDeletionRequestsPanel';
import AdminMatchingHealthCheck from '@/components/AdminMatchingHealthCheck';

import { VerificationSelfieUpload } from '@/components/VerificationSelfieUpload';
import { z } from 'zod';
import { useSearchParams } from 'react-router-dom';

interface Profile {
  id?: string;
  user_id: string;
  name: string;
  email?: string; // Only available for own profile
  age?: number;
  bio?: string;
  location?: string;
  interests?: string[];
  avatar_url?: string;
  gender?: string;
  sexual_orientation?: string;
  looking_for?: string;
  country?: string;
  date_of_birth?: string;
  age_verified?: boolean;
  verification_selfie_url?: string | null;
  created_at?: string;
  updated_at?: string;
}

interface BlockedUserProfile {
  user_id: string;
  name: string;
  avatar_url?: string;
}

interface Match {
  id: string;
  user1_id: string;
  user2_id: string;
  status: string;
  created_at: string;
  requester_id?: string;
  profiles?: Profile;
  compatibility_score?: number;
}

interface Message {
  id: string;
  match_id: string;
  sender_id: string;
  content: string;
  created_at: string;
  is_read: boolean;
}

// Validation schema for profile updates
const profileUpdateSchema = z.object({
  name: z.string()
    .trim()
    .min(1, { message: "Name cannot be empty" })
    .max(100, { message: "Name must be less than 100 characters" }),
  age: z.string()
    .optional()
    .refine((val) => {
      if (!val || val === '') return true;
      const num = parseInt(val);
      return !isNaN(num) && num >= 18 && num <= 120;
    }, { message: "Age must be between 18 and 120" }),
  bio: z.string()
    .max(1000, { message: "Bio must be less than 1000 characters" })
    .optional(),
  location: z.string()
    .max(200, { message: "Location must be less than 200 characters" })
    .optional(),
  interests: z.string()
    .max(500, { message: "Interests must be less than 500 characters" })
    .optional(),
});

const ProfilePage = () => {
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const { isAdmin } = useIsAdmin();
  const [searchParams] = useSearchParams();
  const isDebug = searchParams.get('debug') === '1';
  const [profile, setProfile] = useState<Profile | null>(null);
  const [matches, setMatches] = useState<Match[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [potentialMatches, setPotentialMatches] = useState<(Profile & { compatibility_score: number })[]>([]);
  const [incomingRequests, setIncomingRequests] = useState<Match[]>([]);
  const [outgoingRequests, setOutgoingRequests] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'profile');
  const [selectedMatchForChat, setSelectedMatchForChat] = useState<string | null>(null);
  const [matchViewMode, setMatchViewMode] = useState<'swipe' | 'grid'>('swipe');
  const [profileForm, setProfileForm] = useState({
    name: '',
    age: '',
    bio: '',
    location: '',
    interests: '',
    gender: '',
    sexual_orientation: '',
  });
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
  const [enlargedViewOpen, setEnlargedViewOpen] = useState(false);
  const [blockedUsers, setBlockedUsers] = useState<string[]>([]);
  const [blockedUsersProfiles, setBlockedUsersProfiles] = useState<BlockedUserProfile[]>([]);
  const [selectedMatchForGift, setSelectedMatchForGift] = useState<Match | null>(null);
  const [showOnlyUnverified, setShowOnlyUnverified] = useState(false);
  const [discoverDebug, setDiscoverDebug] = useState<{
    lastRun: string | null;
    rpcCount: number | null;
    rpcError: string | null;
    otherProfilesCount: number | null;
    blockedCount: number | null;
    connectedCount: number | null;
  }>({
    lastRun: null,
    rpcCount: null,
    rpcError: null,
    otherProfilesCount: null,
    blockedCount: null,
    connectedCount: null,
  });

  const fetchQuizAnswers = async () => {
    if (!user?.id) return;
    
    try {
      const { data, error } = await supabase
        .from('quiz_answers')
        .select('*')
        .eq('user_id', user.id);

      if (error) throw error;
      setQuizAnswers(data || []);
    } catch (error) {
      // Error fetching quiz answers - silent fail
    }
  };

  useEffect(() => {
    if (user?.id) {
      fetchProfile();
      fetchMatches();
      fetchMatchRequests();
      fetchPotentialMatches();
      fetchQuizAnswers();
      fetchBlockedUsers();
    }
  }, [user]);

  // Handle gift completion after payment
  useEffect(() => {
    // Check for gift success/cancel from URL params
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('gift_success') === 'true') {
      toast({
        title: "Gift Sent! 🎁",
        description: "Your gift has been successfully sent and will be delivered shortly.",
      });
      // Remove the parameter from URL
      window.history.replaceState({}, '', window.location.pathname + '?tab=' + (urlParams.get('tab') || 'discover'));
    } else if (urlParams.get('gift_cancelled') === 'true') {
      toast({
        title: "Payment Cancelled",
        description: "Your gift payment was cancelled.",
        variant: "destructive",
      });
      window.history.replaceState({}, '', window.location.pathname + '?tab=' + (urlParams.get('tab') || 'discover'));
    }
  }, [user, toast]);

  const fetchProfile = async () => {
    if (!user?.id) return;

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (error && error.code !== 'PGRST116') throw error;

      // If the profile row doesn't exist yet (common for fresh signups), create it then re-fetch.
      if (!data) {
        const nameFromMeta = (user.user_metadata as any)?.name as string | undefined;
        const fallbackName = user.email?.split('@')[0] || 'User';

        await supabase
          .from('profiles')
          .upsert(
            {
              user_id: user.id,
              name: (nameFromMeta || fallbackName).trim().slice(0, 100),
              country: (user.user_metadata as any)?.country ?? null,
              date_of_birth: (user.user_metadata as any)?.date_of_birth ?? null,
            } as any,
            { onConflict: 'user_id' }
          );

        const { data: created } = await supabase
          .from('profiles')
          .select('*')
          .eq('user_id', user.id)
          .maybeSingle();

        setProfile(created || null);
        setProfileForm({
          name: created?.name || '',
          age: created?.age?.toString() || '',
          bio: created?.bio || '',
          location: created?.location || '',
          interests: created?.interests?.join(', ') || '',
          gender: created?.gender || '',
          sexual_orientation: created?.sexual_orientation || '',
        });
        return;
      }

      setProfile(data);
      setProfileForm({
        name: data?.name || '',
        age: data?.age?.toString() || '',
        bio: data?.bio || '',
        location: data?.location || '',
        interests: data?.interests?.join(', ') || '',
        gender: data?.gender || '',
        sexual_orientation: data?.sexual_orientation || '',
      });
    } catch {
      // Error fetching/creating profile - silent fail
    }
  };

  const fetchMatches = async () => {
    if (!user?.id) return;
    
    try {
      // First get matches where current user is involved
      const { data: matchesData, error } = await supabase
        .from('matches')
        .select('*')
        .or(`user1_id.eq.${user.id},user2_id.eq.${user.id}`)
        .eq('status', 'matched');

      if (error) throw error;

      if (matchesData) {
        // Get profile information and compatibility scores for matched users
        const matchesWithProfiles = await Promise.all(
          matchesData.map(async (match) => {
            const otherUserId = match.user1_id === user.id ? match.user2_id : match.user1_id;
            
            const { data: profileData } = await supabase
              .from('profiles')
              .select('id, user_id, name, age, bio, location, interests, avatar_url, country, date_of_birth, age_verified, verification_selfie_url, created_at, updated_at')
              .eq('user_id', otherUserId)
              .single();

            // Calculate compatibility score
            let compatibilityScore = 0;
            try {
              const { data: score } = await supabase
                .rpc('calculate_compatibility_score', {
                  user1_id: user.id,
                  user2_id: otherUserId
                });
              compatibilityScore = score || 0;
            } catch (error) {
              // Error calculating compatibility - continue with default
            }

            return {
              ...match,
              profiles: profileData,
              compatibility_score: compatibilityScore
            };
          })
        );

        setMatches(matchesWithProfiles);
      }
    } catch (error) {
      // Error fetching matches - silent fail
    }
  };

  const fetchPotentialMatches = async () => {
    if (!user?.id) return;

    setDiscoverDebug(prev => ({
      ...prev,
      lastRun: new Date().toISOString(),
      rpcError: null,
      rpcCount: null,
      blockedCount: null,
      connectedCount: null,
    }));
    
    try {
      // Primary source: get_discoverable_profiles (may be strict depending on DB function version)
      const { data: rpcProfilesRaw, error } = await supabase.rpc('get_discoverable_profiles');
      if (error) throw error;

      const rpcProfiles = Array.isArray(rpcProfilesRaw) ? rpcProfilesRaw : [];

      setDiscoverDebug(prev => ({
        ...prev,
        rpcCount: rpcProfiles.length,
      }));

      // Fallback: if RPC returns 0, ONLY show a basic list in admin/debug mode.
      // Regular users should never see potentially incompatible profiles.
      let candidateProfiles: any[] = rpcProfiles;
      const allowFallback = isAdmin || isDebug;

      if (candidateProfiles.length === 0 && allowFallback) {
        const { data: fallbackProfiles, error: fallbackError } = await supabase
          .from('profiles')
          .select('id, user_id, name, age, bio, location, avatar_url, interests, is_verified, country, date_of_birth, age_verified, verification_selfie_url, created_at, updated_at')
          .neq('user_id', user.id)
          .limit(50);

        if (!fallbackError && Array.isArray(fallbackProfiles)) {
          candidateProfiles = fallbackProfiles as any[];
        }
      }

      // Helpful sanity check in debug/admin mode: how many other profile rows exist at all?
      if (isAdmin || isDebug) {
        const { count } = await supabase
          .from('profiles')
          .select('user_id', { count: 'exact', head: true })
          .neq('user_id', user.id);

        setDiscoverDebug(prev => ({
          ...prev,
          otherProfilesCount: count ?? 0,
        }));
      }

      if (!candidateProfiles || candidateProfiles.length === 0) {
        setPotentialMatches([]);
        return;
      }

      // Get users that the current user has blocked
      const { data: currentBlockedData } = await supabase
        .from('blocked_users' as any)
        .select('blocked_user_id')
        .eq('user_id', user.id);
      
      const currentBlockedIds = (currentBlockedData as any)?.map((b: any) => b.blocked_user_id) || [];

      // Get users who have blocked the current user (bidirectional check)
      const { data: blockedByData } = await supabase
        .from('blocked_users' as any)
        .select('user_id')
        .eq('blocked_user_id', user.id);
      
      const blockedByIds = (blockedByData as any)?.map((b: any) => b.user_id) || [];

      // Combine both blocked lists
      const allBlockedIds = [...new Set([...currentBlockedIds, ...blockedByIds])];

      // Get all existing matches/requests
      const { data: existingMatches } = await supabase
        .from('matches')
        .select('user1_id, user2_id')
        .or(`user1_id.eq.${user.id},user2_id.eq.${user.id}`);

      const connectedUserIds = new Set(
        existingMatches?.map(m => 
          m.user1_id === user.id ? m.user2_id : m.user1_id
        ) || []
      );

      setDiscoverDebug(prev => ({
        ...prev,
        blockedCount: allBlockedIds.length,
        connectedCount: connectedUserIds.size,
      }));
      
      // Filter out blocked users and users with existing match/request
      const filteredProfiles = candidateProfiles.filter(p => {
        const isBlocked = allBlockedIds.includes(p.user_id);
        const isConnected = connectedUserIds.has(p.user_id);
        return !isBlocked && !isConnected;
      });
      
      // Calculate comprehensive compatibility scores for each potential match
      const matchesWithScores = await Promise.all(
        filteredProfiles.map(async (otherProfile) => {
          let totalScore = 0;
          
          // 1. Quiz-based compatibility (40% weight)
          try {
            const { data: quizScore } = await supabase
              .rpc('calculate_compatibility_score', {
                user1_id: user.id,
                user2_id: otherProfile.user_id
              });
            totalScore += (quizScore || 0) * 0.4;
          } catch {
            // Silent fail
          }
          
          // 2. Age compatibility (30% weight)
          let ageScore = 0;
          if (profile?.age && otherProfile.age) {
            const ageDifference = Math.abs(profile.age - otherProfile.age);
            if (ageDifference <= 5) ageScore = 100;
            else if (ageDifference <= 10) ageScore = 70;
            else if (ageDifference <= 15) ageScore = 40;
            else ageScore = 20;
          }
          totalScore += (ageScore * 0.3);
          
          // 3. Location compatibility (30% weight)
          let locationScore = 0;
          if (profile?.location && otherProfile.location) {
            const loc1 = profile.location.toLowerCase().trim();
            const loc2 = otherProfile.location.toLowerCase().trim();
            
            if (loc1 === loc2) locationScore = 100;
            else if (loc1.split(',')[0] === loc2.split(',')[0]) locationScore = 70;
            else if (loc1.includes(loc2.split(',')[0]) || loc2.includes(loc1.split(',')[0])) locationScore = 50;
            else locationScore = 20;
          }
          totalScore += (locationScore * 0.3);
          
          return {
            ...otherProfile,
            compatibility_score: Math.round(totalScore)
          };
        })
      );

      // Sort by comprehensive compatibility score (highest first)
      matchesWithScores.sort((a, b) => b.compatibility_score - a.compatibility_score);
      setPotentialMatches(matchesWithScores);
    } catch (error: any) {
      setDiscoverDebug(prev => ({
        ...prev,
        rpcError: error?.message || 'Unknown error',
      }));
      setPotentialMatches([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchBlockedUsers = async () => {
    if (!user?.id) return;
    
    try {
      const { data, error } = await supabase
        .from('blocked_users' as any)
        .select('blocked_user_id')
        .eq('user_id', user.id);

      if (error) throw error;
      const blockedIds = (data as any)?.map((b: any) => b.blocked_user_id) || [];
      setBlockedUsers(blockedIds);

      // Fetch profiles for blocked users
      if (blockedIds.length > 0) {
        const { data: profiles, error: profilesError } = await supabase
          .from('profiles')
          .select('user_id, name, avatar_url')
          .in('user_id', blockedIds);

        if (profilesError) throw profilesError;
        setBlockedUsersProfiles(profiles as BlockedUserProfile[] || []);
      } else {
        setBlockedUsersProfiles([]);
      }
    } catch (error) {
      // Error fetching blocked users - silent fail
    }
  };

  const blockUser = async (blockedUserId: string) => {
    if (!user?.id) {
      toast({
        title: "Error",
        description: "You must be logged in to block users",
        variant: "destructive",
      });
      return;
    }

    // Validate UUID format
    if (!blockedUserId || !isValidUUID(blockedUserId)) {
      toast({
        title: "Error",
        description: "Invalid user",
        variant: "destructive",
      });
      return;
    }

    try {
      // First, delete any existing matches/requests with this user
      const { error: deleteMatchError } = await supabase
        .from('matches')
        .delete()
        .or(`and(user1_id.eq.${user.id},user2_id.eq.${blockedUserId}),and(user1_id.eq.${blockedUserId},user2_id.eq.${user.id})`);

      if (deleteMatchError) {
        // Error deleting matches - continue with block
      }

      // Then block the user
      const { error } = await supabase
        .from('blocked_users' as any)
        .insert({ 
          user_id: user.id, 
          blocked_user_id: blockedUserId 
        } as any)
        .select();

      if (error) throw error;

      toast({
        title: "User blocked",
        description: "This user has been blocked successfully",
      });

      setBlockedUsers([...blockedUsers, blockedUserId]);
      setEnlargedViewOpen(false);
      fetchBlockedUsers(); // Refresh blocked users to get profile data
      fetchPotentialMatches();
      fetchMatches();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error?.message || "Failed to block user",
        variant: "destructive",
      });
    }
  };

  const unblockUser = async (blockedUserId: string) => {
    if (!user?.id || !isValidUUID(blockedUserId)) return;
    
    try {
      // First, delete any existing matches/requests with this user
      const { error: deleteMatchError } = await supabase
        .from('matches')
        .delete()
        .or(`and(user1_id.eq.${user.id},user2_id.eq.${blockedUserId}),and(user1_id.eq.${blockedUserId},user2_id.eq.${user.id})`);

      if (deleteMatchError) {
        // Error deleting matches - continue with unblock
      }

      // Then unblock the user
      const { error } = await supabase
        .from('blocked_users' as any)
        .delete()
        .eq('user_id', user.id)
        .eq('blocked_user_id', blockedUserId);

      if (error) throw error;

      toast({
        title: "User unblocked",
        description: "This user has been unblocked and will appear in your discover tab",
      });

      setBlockedUsers(blockedUsers.filter(id => id !== blockedUserId));
      setBlockedUsersProfiles(blockedUsersProfiles.filter(profile => profile.user_id !== blockedUserId));
      fetchPotentialMatches();
      fetchMatchRequests(); // Refresh requests list too
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to unblock user",
        variant: "destructive",
      });
    }
  };

  const updateProfile = async () => {
    if (!user?.id) return;
    
    try {
      // Validate input data
      const validationResult = profileUpdateSchema.safeParse(profileForm);
      
      if (!validationResult.success) {
        const errorMessages = validationResult.error.errors.map(err => err.message).join(', ');
        toast({
          title: "Validation Error",
          description: errorMessages,
          variant: "destructive",
        });
        return;
      }

      const interestsArray = profileForm.interests
        .split(',')
        .map(interest => interest.trim())
        .filter(interest => interest.length > 0);

      // Additional validation for interests array length
      if (interestsArray.length > 10) {
        toast({
          title: "Validation Error",
          description: "Maximum 10 interests allowed",
          variant: "destructive",
        });
        return;
      }

      const updateData = {
        name: profileForm.name.trim(),
        age: profileForm.age ? parseInt(profileForm.age) : null,
        bio: profileForm.bio?.trim() || null,
        location: profileForm.location?.trim() || null,
        interests: interestsArray,
        gender: profileForm.gender || null,
        sexual_orientation: profileForm.sexual_orientation || null,
      };

      const { error } = await supabase
        .from('profiles')
        .update(updateData)
        .eq('user_id', user.id);

      if (error) throw error;

      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated!",
      });

      setEditMode(false);
      fetchProfile();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    }
  };

  const deleteAccount = async () => {
    if (!user?.id || !user?.email) return;
    
    try {
      // Create a deletion request first - this is safer than immediate deletion
      // The admin can then process this properly
      const { error: requestError } = await supabase
        .from('deletion_requests')
        .insert({
          user_id: user.id,
          user_email: user.email,
          user_name: profile?.name || 'Unknown',
          status: 'pending'
        });

      if (requestError) {
        // If request already exists, inform user
        if (requestError.code === '23505') {
          toast({
            title: "Request Already Submitted",
            description: "Your deletion request is already being processed.",
          });
          return;
        }
        throw requestError;
      }

      toast({
        title: "Deletion Request Submitted",
        description: "Your account deletion request has been submitted and will be processed by an admin within 48 hours. You will be signed out now.",
      });

      // Sign out the user
      await signOut();
      window.location.href = '/';
    } catch (error) {
      console.error('Deletion request error:', error);
      toast({
        title: "Error",
        description: "Failed to submit deletion request. Please contact support.",
        variant: "destructive",
      });
    }
  };

  const fetchMatchRequests = async () => {
    if (!user?.id) return;
    
    try {
      // Get users that the current user has blocked
      const { data: blockedData } = await supabase
        .from('blocked_users' as any)
        .select('blocked_user_id')
        .eq('user_id', user.id);
      
      const currentBlockedIds = (blockedData as any)?.map((b: any) => b.blocked_user_id) || [];

      // Get users who have blocked the current user (bidirectional check)
      const { data: blockedByData } = await supabase
        .from('blocked_users' as any)
        .select('user_id')
        .eq('blocked_user_id', user.id);
      
      const blockedByIds = (blockedByData as any)?.map((b: any) => b.user_id) || [];

      // Combine both blocked lists
      const allBlockedIds = [...currentBlockedIds, ...blockedByIds];

      // Get all pending matches involving the current user
      const { data: allPending, error: fetchError } = await supabase
        .from('matches')
        .select('*')
        .or(`user1_id.eq.${user.id},user2_id.eq.${user.id}`)
        .eq('status', 'pending');

      if (fetchError) throw fetchError;

      // Cast to any to include requester_id field (added in migration but not yet in generated types)
      const matches = (allPending || []) as any[];

      // Use requester_id to determine incoming vs outgoing, and filter out blocked users (both directions)
      const incoming = matches.filter(match => 
        match.requester_id && 
        match.requester_id !== user.id &&
        !allBlockedIds.includes(match.requester_id)
      );
      const outgoing = matches.filter(match => 
        match.requester_id === user.id &&
        !allBlockedIds.includes(match.user1_id === user.id ? match.user2_id : match.user1_id)
      );

      // Fetch profiles for incoming requests (requests sent TO current user)
      if (incoming && incoming.length > 0) {
        const senderIds = incoming.map(req => req.requester_id);
        const { data: senderProfiles } = await supabase
          .from('profiles')
          .select('user_id, name, age, bio, location, interests, avatar_url, created_at, updated_at')
          .in('user_id', senderIds);

        const incomingWithProfiles = incoming.map(req => ({
          ...req,
          profiles: senderProfiles?.find(p => p.user_id === req.requester_id)
        }));
        setIncomingRequests(incomingWithProfiles as Match[]);
      } else {
        setIncomingRequests([]);
      }

      // Fetch profiles for outgoing requests (requests sent BY current user)
      if (outgoing && outgoing.length > 0) {
        // For outgoing, we need the OTHER user's profile (not the requester)
        const receiverIds = outgoing.map(req => 
          req.user1_id === user.id ? req.user2_id : req.user1_id
        );
        const { data: receiverProfiles } = await supabase
          .from('profiles')
          .select('user_id, name, age, bio, location, interests, avatar_url, created_at, updated_at')
          .in('user_id', receiverIds);

        const outgoingWithProfiles = outgoing.map(req => ({
          ...req,
          profiles: receiverProfiles?.find(p => 
            p.user_id === (req.user1_id === user.id ? req.user2_id : req.user1_id)
          )
        }));
        setOutgoingRequests(outgoingWithProfiles as Match[]);
      } else {
        setOutgoingRequests([]);
      }
    } catch (error) {
      // Error fetching match requests - silent fail
    }
  };

  const sendMatch = async (targetUserId: string) => {
    // Validate UUID before proceeding
    if (!isValidUUID(targetUserId)) {
      toast({
        title: "Error",
        description: "Invalid user",
        variant: "destructive",
      });
      return;
    }

    if (!user?.id) return;
    
    try {
      // CRITICAL: Check compatibility BEFORE sending match request
      const { data: isCompatible, error: compatError } = await supabase
        .rpc('are_users_compatible', {
          user_a_id: user.id,
          user_b_id: targetUserId
        });

      if (compatError) {
        throw compatError;
      }

      if (!isCompatible) {
        toast({
          title: "Not Compatible",
          description: "You cannot send a match request to this user based on compatibility preferences.",
          variant: "destructive",
        });
        return;
      }

      // Check if a match already exists between these two users (in either direction)
      const { data: existingMatches, error: checkError } = await supabase
        .from('matches')
        .select('*')
        .or(`and(user1_id.eq.${user.id},user2_id.eq.${targetUserId}),and(user1_id.eq.${targetUserId},user2_id.eq.${user.id})`);

      if (checkError) {
        throw checkError;
      }

      // If any matches exist (in either direction), don't allow creating another
      if (existingMatches && existingMatches.length > 0) {
        const matchStatus = existingMatches[0].status;
        toast({
          title: matchStatus === 'matched' ? "Already Matched" : "Already Sent",
          description: matchStatus === 'matched' 
            ? "You're already matched with this user." 
            : "You've already sent a match request to this user.",
          variant: "destructive",
        });
        return;
      }

      // Always sort IDs to align with database trigger behavior
      const [smallerId, largerId] = [user.id, targetUserId].sort();
      
      const insertData = {
        user1_id: smallerId,
        user2_id: largerId,
        status: 'pending',
        requester_id: user.id
      };

      const { data: insertedData, error } = await supabase
        .from('matches')
        .insert(insertData)
        .select();

      if (error) throw error;

      toast({
        title: "Match Request Sent!",
        description: "Your match request has been sent successfully!",
      });

      fetchMatchRequests();
      fetchPotentialMatches();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to send match request. Please check permissions.",
        variant: "destructive",
      });
    }
  };

  const acceptMatchRequest = async (matchId: string) => {
    try {
      const { error } = await supabase
        .from('matches')
        .update({ status: 'matched' })
        .eq('id', matchId);

      if (error) throw error;

      toast({
        title: "Match Accepted!",
        description: "You can now message this person!",
      });

      fetchMatches();
      fetchMatchRequests();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to accept match request.",
        variant: "destructive",
      });
    }
  };

  const openChatWithMatch = (matchId: string) => {
    setSelectedMatchForChat(matchId);
    setActiveTab('messages');
  };

  const rejectMatchRequest = async (matchId: string) => {
    if (!isValidUUID(matchId)) return;
    
    try {
      const { data, error } = await supabase
        .from('matches')
        .delete()
        .eq('id', matchId)
        .or(`user1_id.eq.${user?.id},user2_id.eq.${user?.id}`)
        .select();

      if (error) throw error;

      toast({
        title: "Request Declined",
        description: "The match request has been declined.",
      });

      // Update local state immediately
      setIncomingRequests(prev => prev.filter(r => r.id !== matchId));
      setOutgoingRequests(prev => prev.filter(r => r.id !== matchId));
      
      fetchMatchRequests();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to reject match request.",
        variant: "destructive",
      });
    }
  };

  const deleteMatch = async (matchId: string) => {
    if (!isValidUUID(matchId)) return;
    
    try {
      // Verify the user is part of this match
      const matchToDelete = matches.find(m => m.id === matchId);
      if (!matchToDelete) {
        throw new Error('Match not found');
      }

      const { data, error } = await supabase
        .from('matches')
        .delete()
        .eq('id', matchId)
        .or(`user1_id.eq.${user?.id},user2_id.eq.${user?.id}`)
        .select();

      if (error) throw error;

      toast({
        title: "Match Deleted",
        description: "The match has been removed.",
      });

      // Update local state immediately
      setMatches(prev => prev.filter(m => m.id !== matchId));
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to delete match. Please check permissions.",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-28">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 pb-8 px-4 md:px-8 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5" />
      <div className="absolute top-32 left-0 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
      <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-accent/8 rounded-full blur-3xl" />
      
      <div className="container mx-auto max-w-6xl relative z-10">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 h-auto p-2 gap-1.5 md:gap-2 bg-gradient-to-r from-primary/10 to-secondary/10 backdrop-blur-sm shadow-lg rounded-xl border border-primary/20">
            <TabsTrigger value="profile" className="flex flex-col items-center gap-1 py-2 px-1 md:py-3 md:px-3 data-[state=active]:bg-gradient-to-br data-[state=active]:from-primary data-[state=active]:to-secondary data-[state=active]:text-white rounded-lg">
              <User className="w-4 h-4 md:w-5 md:h-5" />
              <span className="text-[10px] md:text-xs">Profile</span>
            </TabsTrigger>
            <TabsTrigger value="matches" className="flex flex-col items-center gap-1 py-2 px-1 md:py-3 md:px-3 data-[state=active]:bg-gradient-to-br data-[state=active]:from-primary data-[state=active]:to-secondary data-[state=active]:text-white rounded-lg">
              <Heart className="w-4 h-4 md:w-5 md:h-5" />
              <span className="text-[10px] md:text-xs">Matches</span>
              {matches.length > 0 && (
                <Badge variant="secondary" className="text-[10px] px-1 min-w-5 h-4 bg-primary text-white">
                  {matches.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="messages" className="flex flex-col items-center gap-1 py-2 px-1 md:py-3 md:px-3 data-[state=active]:bg-gradient-to-br data-[state=active]:from-primary data-[state=active]:to-secondary data-[state=active]:text-white rounded-lg">
              <MessageCircle className="w-4 h-4 md:w-5 md:h-5" />
              <span className="text-[10px] md:text-xs">Messages</span>
            </TabsTrigger>
            <TabsTrigger value="requests" className="flex flex-col items-center gap-1 py-2 px-1 md:py-3 md:px-3 data-[state=active]:bg-gradient-to-br data-[state=active]:from-primary data-[state=active]:to-secondary data-[state=active]:text-white rounded-lg">
              <Mail className="w-4 h-4 md:w-5 md:h-5" />
              <span className="text-[10px] md:text-xs">Requests</span>
              {incomingRequests.length > 0 && (
                <Badge variant="secondary" className="text-[10px] px-1 min-w-5 h-4 bg-primary text-white">
                  {incomingRequests.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="discover" className="flex flex-col items-center gap-1 py-2 px-1 md:py-3 md:px-3 data-[state=active]:bg-gradient-to-br data-[state=active]:from-primary data-[state=active]:to-secondary data-[state=active]:text-white rounded-lg">
              <Search className="w-4 h-4 md:w-5 md:h-5" />
              <span className="text-[10px] md:text-xs">Discover</span>
            </TabsTrigger>
            <TabsTrigger value="quiz" className="flex flex-col items-center gap-1 py-2 px-1 md:py-3 md:px-3 data-[state=active]:bg-gradient-to-br data-[state=active]:from-primary data-[state=active]:to-secondary data-[state=active]:text-white rounded-lg">
              <RefreshCw className="w-4 h-4 md:w-5 md:h-5" />
              <span className="text-[10px] md:text-xs">Quiz</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <Card className="overflow-hidden border-primary/20 shadow-2xl bg-card/50 backdrop-blur-sm">
              <div className="bg-gradient-to-r from-primary via-secondary to-primary h-32" />
              <CardContent className="relative -mt-16 px-6 pb-6">
                {editMode ? (
                  <div className="space-y-4">
                    <div className="bg-card p-6 rounded-xl shadow-lg space-y-4">
                      <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-6">
                        Edit Profile
                      </h2>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium block mb-2">Name</label>
                          <Input
                            value={profileForm.name}
                            onChange={(e) => setProfileForm(prev => ({ ...prev, name: e.target.value }))}
                            placeholder="Your name"
                            className="border-primary/20"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium block mb-2">Age</label>
                          <Input
                            type="number"
                            value={profileForm.age}
                            onChange={(e) => setProfileForm(prev => ({ ...prev, age: e.target.value }))}
                            placeholder="45"
                            className="border-primary/20"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium block mb-2">Gender</label>
                          <select
                            value={profileForm.gender}
                            onChange={(e) => setProfileForm(prev => ({ ...prev, gender: e.target.value }))}
                            className="w-full h-10 px-3 rounded-md border border-primary/20 bg-background"
                          >
                            <option value="">Select gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="non-binary/trans">Non-binary/Trans</option>
                          </select>
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium block mb-2">Location</label>
                        <Input
                          value={profileForm.location}
                          onChange={(e) => setProfileForm(prev => ({ ...prev, location: e.target.value }))}
                          placeholder="New York"
                          className="border-primary/20"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium block mb-2">Bio</label>
                        <Textarea
                          value={profileForm.bio}
                          onChange={(e) => setProfileForm(prev => ({ ...prev, bio: e.target.value }))}
                          placeholder="Tell others about yourself..."
                          rows={4}
                          className="border-primary/20"
                          maxLength={500}
                        />
                        <p className="text-xs text-muted-foreground mt-1">{profileForm.bio?.length || 0}/500</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium block mb-2">Interests (comma separated)</label>
                        <Input
                          value={profileForm.interests}
                          onChange={(e) => setProfileForm(prev => ({ ...prev, interests: e.target.value }))}
                          placeholder="Reading, Hiking, Cooking..."
                          className="border-primary/20"
                        />
                      </div>
                      <div className="flex gap-3 pt-4">
                        <Button onClick={updateProfile} className="flex-1 bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                          Update Profile
                        </Button>
                        <Button variant="outline" onClick={() => setEditMode(false)} className="border-primary/20">
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="flex flex-col items-center">
                      <div className="relative mb-4">
                        <AvatarUpload
                          currentAvatarUrl={profile?.avatar_url}
                          onAvatarUpdate={(url) => setProfile(prev => prev ? {...prev, avatar_url: url} : null)}
                          name={profile?.name}
                        />
                      </div>
                      <div className="text-center mb-4">
                        <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                          {profile?.name || 'No name set'}
                        </h2>
                        <div className="flex items-center justify-center gap-4 mt-3 text-muted-foreground">
                          {profile?.age && (
                            <span className="flex items-center gap-1 text-sm">
                              <Calendar className="w-4 h-4" />
                              {profile.age}
                            </span>
                          )}
                          {profile?.location && (
                            <span className="flex items-center gap-1 text-sm">
                              <MapPin className="w-4 h-4" />
                              {profile.location}
                            </span>
                          )}
                        </div>
                      </div>
                      <Button 
                        variant="outline" 
                        onClick={() => setEditMode(true)}
                        className="border-primary/20 hover:bg-primary/10"
                      >
                        Edit Profile
                      </Button>
                    </div>

                    <div className="bg-gradient-to-br from-primary/5 to-secondary/5 p-6 rounded-xl border border-primary/10">
                      {profile?.bio && (
                        <div className="mb-4">
                          <h3 className="font-semibold text-sm text-muted-foreground mb-2">Bio</h3>
                          <p className="text-foreground leading-relaxed">{profile.bio}</p>
                        </div>
                      )}

                      {profile?.interests && profile.interests.length > 0 && (
                        <div className="mb-4">
                          <h3 className="font-semibold text-sm text-muted-foreground mb-3">Interests</h3>
                          <div className="flex flex-wrap gap-2">
                            {profile.interests.map((interest, index) => (
                              <Badge key={index} className="bg-gradient-to-r from-primary/80 to-secondary/80 text-white border-0">
                                {interest}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Personality badges from quiz answers */}
                      {quizAnswers.length > 0 && (
                        <div>
                          <h3 className="font-semibold text-sm text-muted-foreground mb-3">Personality Badges</h3>
                          <div className="flex flex-wrap gap-2">
                            {generateBadgesFromQuizAnswers(quizAnswers as QuizAnswer[], 6).map((badge, index) => (
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
                          <p className="text-xs text-muted-foreground mt-2">
                            Based on your quiz answers • <a href="/quiz" className="text-primary hover:underline">Retake quiz</a>
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
                
                {!editMode && user && (
                  <>
                    <div className="mt-6 bg-gradient-to-br from-primary/5 to-secondary/5 p-6 rounded-xl border border-primary/10">
                      <PhotoGallery userId={user.id} isOwnProfile={true} />
                    </div>
                    
                    <div className="mt-6">
                      <VerificationSelfieUpload 
                        currentSelfieUrl={profile?.verification_selfie_url}
                      />
                    </div>
                  </>
                )}

                {!editMode && (
                  <div className="mt-6 bg-gradient-to-br from-destructive/5 to-destructive/10 p-6 rounded-xl border border-destructive/20">
                    <h3 className="font-semibold text-destructive flex items-center gap-2 mb-3">
                      <Ban className="w-5 h-5" />
                      Blocked Users
                    </h3>
                    {blockedUsersProfiles.length === 0 ? (
                      <p className="text-sm text-muted-foreground">You haven't blocked anyone yet</p>
                    ) : (
                      <div className="space-y-2">
                        {blockedUsersProfiles.map(profile => (
                          <div key={profile.user_id} className="flex items-center justify-between bg-card p-3 rounded-lg">
                            <div className="flex items-center gap-3">
                              <Avatar className="h-10 w-10">
                                <AvatarImage src={profile.avatar_url} alt={profile.name} />
                                <AvatarFallback>{profile.name?.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <span className="text-sm font-medium">{profile.name}</span>
                            </div>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => unblockUser(profile.user_id)}
                              className="border-primary/20 hover:bg-primary/10"
                            >
                              Unblock
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {!editMode && (
                  <div className="mt-6 p-6 rounded-xl">
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button 
                          variant="link"
                          className="text-muted-foreground hover:text-foreground text-sm p-0 h-auto"
                        >
                          click here to request data deletion
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete your account
                            and remove all your data including matches, messages, and profile information.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={deleteAccount}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                          >
                            Confirm Deletion
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="matches">
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent flex items-center justify-center gap-3">
                  <Heart className="w-8 h-8 text-primary fill-primary" />
                  Your Matches
                </h2>
                <p className="text-muted-foreground text-lg">
                  Connect with people who matched with you
                </p>
              </div>
              {matches.length === 0 ? (
                <Card className="shadow-soft border-primary/20">
                  <CardContent className="text-center py-16">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mx-auto mb-6">
                      <Heart className="w-12 h-12 text-primary" />
                    </div>
                    <h3 className="font-semibold text-2xl mb-3">No matches yet</h3>
                    <p className="text-muted-foreground mb-6 text-lg">Start exploring to find your perfect match!</p>
                    <Button 
                      className="bg-gradient-to-r from-primary to-secondary hover:opacity-90"
                      size="lg"
                      onClick={() => setActiveTab('discover')}
                    >
                      Discover People
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <>
                  {matchViewMode === 'swipe' ? (
                    <SwipeableMatchStack
                      matches={matches}
                      onViewProfile={(match) => {
                        setSelectedProfile(match.profiles as any);
                        setEnlargedViewOpen(true);
                      }}
                      onChat={(matchId) => openChatWithMatch(matchId)}
                      onBlock={(userId) => blockUser(userId)}
                      onRemove={(matchId) => deleteMatch(matchId)}
                      onToggleView={() => setMatchViewMode('grid')}
                    />
                  ) : (
                    <div className="space-y-4 animate-fade-in">
                      <div className="flex justify-end">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setMatchViewMode('swipe')}
                          className="border-primary/20 gap-2"
                        >
                          <Heart className="w-4 h-4" />
                          Swipe View
                        </Button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {matches.map((match) => {
                          const compatibilityScore = match.compatibility_score || 0;
                          const compatibilityPercent = Math.round(compatibilityScore);
                          
                          return (
                            <Card 
                              key={match.id} 
                              className="overflow-hidden border-primary/20 shadow-xl hover:shadow-2xl transition-all bg-card/80 backdrop-blur-sm cursor-pointer"
                              onClick={() => {
                                setSelectedProfile(match.profiles as any);
                                setEnlargedViewOpen(true);
                              }}
                            >
                              <div className="relative">
                                <div className="aspect-square overflow-hidden bg-gradient-to-br from-primary/10 to-secondary/10">
                                  {match.profiles?.avatar_url ? (
                                    <img 
                                      src={match.profiles.avatar_url} 
                                      alt={match.profiles.name}
                                      className="w-full h-full object-cover"
                                    />
                                  ) : (
                                    <div className="w-full h-full flex items-center justify-center">
                                      <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-6xl">
                                        {match.profiles?.name?.charAt(0) || '?'}
                                      </div>
                                    </div>
                                  )}
                                </div>
                                <Badge 
                                  className="absolute top-4 right-4 bg-gradient-to-r from-pink-500 to-pink-600 text-white border-0 shadow-lg px-4 py-2 text-base font-bold"
                                >
                                  {compatibilityPercent}% Match
                                </Badge>
                              </div>
                              
                              <CardContent className="p-6 space-y-4" onClick={(e) => e.stopPropagation()}>
                                <div className="flex items-start justify-between">
                                  <div>
                                    <h3 className="text-2xl font-bold mb-1">{match.profiles?.name}</h3>
                                    <p className="text-muted-foreground">
                                      {match.profiles?.age ? `${match.profiles.age} years old` : 'Age not set'}
                                    </p>
                                    {match.profiles?.location && (
                                      <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                                        <MapPin className="w-4 h-4" />
                                        {match.profiles.location}
                                      </div>
                                    )}
                                  </div>
                                  <div className="flex flex-col items-end">
                                    <div className="flex items-center gap-2 text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                                      <Heart className="w-6 h-6 fill-primary text-primary" />
                                      {compatibilityPercent}%
                                    </div>
                                    <span className="text-xs text-muted-foreground">Compatibility</span>
                                  </div>
                                </div>

                                <div className="grid grid-cols-2 gap-2">
                                  <Button 
                                    className="bg-gradient-to-r from-cyan-500 to-cyan-600 hover:opacity-90 text-white border-0"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      openChatWithMatch(match.id);
                                    }}
                                  >
                                    <MessageCircle className="w-4 h-4 mr-2" />
                                    Chat
                                  </Button>
                                  <Button 
                                    className="bg-gradient-to-r from-cyan-500 to-cyan-600 hover:opacity-90 text-white border-0"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setSelectedMatchForGift(match);
                                    }}
                                  >
                                    <Gift className="w-4 h-4 mr-2" />
                                    Gift
                                  </Button>
                                </div>

                                <div className="flex items-center justify-between pt-2 border-t border-primary/10">
                                  <Button 
                                    size="sm"
                                    variant="destructive"
                                    className="bg-gradient-to-r from-red-500 to-red-600 hover:opacity-90"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      if (match.profiles?.user_id) {
                                        blockUser(match.profiles.user_id);
                                      }
                                    }}
                                  >
                                    <Ban className="w-4 h-4 mr-2" />
                                    Block
                                  </Button>
                                  <Button 
                                    size="sm"
                                    variant="ghost"
                                    className="text-muted-foreground hover:text-foreground"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      deleteMatch(match.id);
                                    }}
                                  >
                                    Remove Match
                                  </Button>
                                </div>
                              </CardContent>
                            </Card>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Enlarged Profile View Dialog */}
            <EnlargedProfileView
              profile={selectedProfile}
              isOpen={enlargedViewOpen}
              onClose={() => {
                setEnlargedViewOpen(false);
                setSelectedProfile(null);
              }}
              onMessage={() => {
                const matchId = matches.find(m => m.profiles?.user_id === selectedProfile?.user_id)?.id;
                if (matchId) {
                  openChatWithMatch(matchId);
                  setEnlargedViewOpen(false);
                }
              }}
              onBlock={() => {
                if (selectedProfile?.user_id) {
                  blockUser(selectedProfile.user_id);
                }
              }}
              compatibilityScore={
                matches.find(m => m.profiles?.user_id === selectedProfile?.user_id)?.compatibility_score || 
                Math.floor(Math.random() * 21) + 80 // 80-100%
              }
              isOnline={Math.random() > 0.5}
              isVerified={Math.random() > 0.5}
              onVerificationChange={async () => {
                // Refresh the matches list
                await fetchMatches();
                // Also update the selected profile to reflect changes immediately
                if (selectedProfile?.user_id) {
                  const { data } = await supabase
                    .from('profiles')
                    .select('*')
                    .eq('user_id', selectedProfile.user_id)
                    .single();
                  if (data) {
                    setSelectedProfile(data as Profile);
                  }
                }
              }}
            />
          </TabsContent>

          <TabsContent value="messages">
            <MessagesTab matches={matches} preselectedMatchId={selectedMatchForChat} />
          </TabsContent>

          <TabsContent value="requests">
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-4">Incoming Requests</h2>
                {incomingRequests.length === 0 ? (
                  <Card>
                    <CardContent className="text-center py-8">
                      <Heart className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                      <p className="text-muted-foreground">No incoming match requests</p>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="space-y-4">
                    {incomingRequests.map((request) => (
                      <Card key={request.id}>
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <Avatar className="w-12 h-12">
                                <AvatarImage src={request.profiles?.avatar_url} />
                                <AvatarFallback>
                                  {request.profiles?.name?.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <h3 className="font-semibold">{request.profiles?.name}</h3>
                                <p className="text-sm text-muted-foreground">
                                  {request.profiles?.location}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  Sent {new Date(request.created_at).toLocaleDateString()}
                                </p>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button
                                variant="default"
                                onClick={() => acceptMatchRequest(request.id)}
                              >
                                Accept
                              </Button>
                              <Button
                                variant="outline"
                                onClick={() => rejectMatchRequest(request.id)}
                              >
                                Decline
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-4">Sent Requests</h2>
                {outgoingRequests.length === 0 ? (
                  <Card>
                    <CardContent className="text-center py-8">
                      <Heart className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                      <p className="text-muted-foreground">No sent match requests</p>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="space-y-4">
                    {outgoingRequests.map((request) => (
                      <Card key={request.id}>
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <Avatar className="w-12 h-12">
                                <AvatarImage src={request.profiles?.avatar_url} />
                                <AvatarFallback>
                                  {request.profiles?.name?.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <h3 className="font-semibold">{request.profiles?.name}</h3>
                                <p className="text-sm text-muted-foreground">
                                  {request.profiles?.location}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  Sent {new Date(request.created_at).toLocaleDateString()}
                                </p>
                              </div>
                            </div>
                            <Badge variant="secondary">Pending</Badge>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="discover">
            <div className="space-y-6">
              <div className="mb-6 text-center">
                <h2 className="text-3xl font-bold mb-3">
                  <span className="text-gradient">Discover Your Match</span>
                </h2>
                <p className="text-muted-foreground text-lg">
                  Find people based on your compatibility quiz results
                </p>
              </div>

              {/* Admin filter toggle for unverified users */}
              {isAdmin && (
                <Card className="shadow-soft border-primary/20 bg-gradient-to-br from-amber-50/30 to-amber-100/30 dark:from-amber-950/10 dark:to-amber-900/10">
                  <CardContent className="py-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center">
                          <ShieldCheck className="w-5 h-5 text-amber-600 dark:text-amber-500" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-sm">Admin Verification Filter</h3>
                          <p className="text-xs text-muted-foreground">Show only users needing age verification</p>
                        </div>
                      </div>
                      <Switch
                        checked={showOnlyUnverified}
                        onCheckedChange={setShowOnlyUnverified}
                      />
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Admin Panels */}
              {isAdmin && (
                <div className="space-y-4 mb-6">
                  <AdminMatchingHealthCheck />
                  <AdminDeletionRequestsPanel />
                </div>
              )}

              {/* Verification banners - show above matches but don't block browsing */}
              {!isAdmin && !profile?.age_verified && !profile?.verification_selfie_url && (
                <Card className="shadow-soft border-2 border-amber-500/50 bg-gradient-to-br from-amber-50/50 to-amber-100/50 dark:from-amber-950/20 dark:to-amber-900/20 mb-6">
                  <CardContent className="py-6 px-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                        <AlertCircle className="w-6 h-6 text-amber-600 dark:text-amber-500" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-base mb-1">Age Verification Required</h3>
                        <p className="text-sm text-muted-foreground">
                          Upload a verification selfie to connect with matches.
                        </p>
                      </div>
                      <Button 
                        variant="default" 
                        size="sm"
                        className="bg-amber-600 hover:bg-amber-700"
                        onClick={() => setActiveTab('profile')}
                      >
                        Verify Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {!isAdmin && !profile?.age_verified && profile?.verification_selfie_url && (
                <Card className="shadow-soft border-2 border-blue-500/50 bg-gradient-to-br from-blue-50/50 to-blue-100/50 dark:from-blue-950/20 dark:to-blue-900/20 mb-6">
                  <CardContent className="py-6 px-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                        <ShieldCheck className="w-6 h-6 text-blue-600 dark:text-blue-500" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-base mb-1">Verification Pending</h3>
                        <p className="text-sm text-muted-foreground">
                          Your selfie is being reviewed. You can browse but can't connect until verified.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Prompt to complete quiz if gender + preference missing */}
              {(!profile?.gender || (!profile?.looking_for && !profile?.sexual_orientation)) && (
                <Card className="shadow-soft border-2 border-primary/30 bg-gradient-to-br from-primary/5 to-secondary/5">
                  <CardContent className="text-center py-12">
                    <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                      <AlertCircle className="w-10 h-10 text-primary" />
                    </div>
                    <h3 className="font-semibold text-xl mb-2">Complete Your Profile</h3>
                    <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                      Take the compatibility quiz to discover compatible matches. This helps us show you the most relevant profiles.
                    </p>
                    <Button 
                      variant="magnetic" 
                      size="lg"
                      onClick={() => setActiveTab('quiz')}
                    >
                      Take Quiz Now
                    </Button>
                  </CardContent>
                </Card>
              )}
              
              {/* Show matches if user has completed quiz (has gender + preference) */}
              {profile?.gender && (profile?.looking_for || profile?.sexual_orientation) && (
                <>
                  {(() => {
                    const displayedMatches = showOnlyUnverified && isAdmin
                      ? potentialMatches.filter(m => !m.age_verified)
                      : potentialMatches;
                    
                    const canConnect = isAdmin || profile?.age_verified;
                    
                    return displayedMatches.length === 0 ? (
                      <Card className="shadow-soft">
                        <CardContent className="text-center py-12">
                          <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                            <Sparkles className="w-10 h-10 text-accent" />
                          </div>
                          <h3 className="font-semibold text-lg mb-2">
                            {showOnlyUnverified && isAdmin 
                              ? 'No unverified users found' 
                              : 'No compatible matches found'}
                          </h3>
                          <p className="text-muted-foreground mb-4">
                            {showOnlyUnverified && isAdmin
                              ? 'All users have been age verified!'
                              : 'Check back later as new users join, or retake the quiz to update your preferences.'}
                          </p>

                          {(isAdmin || isDebug) && (
                            <div className="mt-4 text-left text-xs text-muted-foreground bg-muted/30 rounded-lg p-4 space-y-2">
                              <div className="flex items-center justify-between gap-2">
                                <p className="font-medium text-foreground/80">Discover debug</p>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => fetchPotentialMatches()}
                                  className="h-8"
                                >
                                  Retry fetch
                                </Button>
                              </div>

                              <p>
                                <span className="font-medium">You:</span>{' '}
                                gender={profile?.gender ?? 'null'}, looking_for={profile?.looking_for ?? 'null'}, sexual_orientation={profile?.sexual_orientation ?? 'null'}
                              </p>

                              <p>
                                <span className="font-medium">RPC get_discoverable_profiles:</span>{' '}
                                {discoverDebug.rpcCount === null ? '—' : discoverDebug.rpcCount} result(s)
                                {discoverDebug.rpcError ? ` • ${discoverDebug.rpcError}` : ''}
                              </p>
                              <p>
                                <span className="font-medium">Other profiles in DB (excluding you):</span>{' '}
                                {discoverDebug.otherProfilesCount === null ? '—' : discoverDebug.otherProfilesCount}
                              </p>
                              <p>
                                <span className="font-medium">Filtered (blocked / connected):</span>{' '}
                                {discoverDebug.blockedCount === null ? '—' : discoverDebug.blockedCount} /{' '}
                                {discoverDebug.connectedCount === null ? '—' : discoverDebug.connectedCount}
                              </p>

                              {!isAdmin && (
                                <p className="text-muted-foreground">
                                  Tip: append <span className="font-mono">&amp;debug=1</span> to the URL to keep this panel visible.
                                </p>
                              )}
                            </div>
                          )}

                          {!showOnlyUnverified && (
                            <Button variant="gradient" size="lg" onClick={() => setActiveTab('quiz')}>
                              <RefreshCw className="w-4 h-4 mr-2" />
                              Retake Quiz
                            </Button>
                          )}
                        </CardContent>
                      </Card>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {displayedMatches.map((potentialMatch) => (
                          <div 
                            key={potentialMatch.user_id}
                            onClick={() => {
                              setSelectedProfile(potentialMatch);
                              setEnlargedViewOpen(true);
                            }}
                            className="cursor-pointer"
                          >
                            <ProfileCard
                              id={potentialMatch.user_id}
                              name={potentialMatch.name}
                              age={potentialMatch.age}
                              bio={potentialMatch.bio}
                              location={potentialMatch.location}
                              avatarUrl={potentialMatch.avatar_url}
                              interests={potentialMatch.interests || []}
                              isOnline={false}
                              isVerified={potentialMatch.age_verified || false}
                              compatibilityScore={potentialMatch.compatibility_score}
                              onConnect={canConnect ? () => sendMatch(potentialMatch.user_id) : undefined}
                            />
                          </div>
                        ))}
                      </div>
                    );
                  })()}
                </>
              )}
            </div>
          </TabsContent>

          <TabsContent value="quiz">
            <Card className="shadow-elegant">
              <CardHeader className="border-b bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5">
                <CardTitle className="text-2xl">Compatibility Quiz</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Complete the quiz to find your perfect matches with personalized compatibility scores
                </p>
              </CardHeader>
              <CardContent className="space-y-6 pt-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-6 border rounded-xl hover-lift bg-gradient-to-br from-primary/5 to-secondary/5">
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Quiz Status</h3>
                      <p className="text-sm text-muted-foreground">
                        {quizAnswers.length > 0 ? `✨ Completed ${quizAnswers.length} questions` : '📝 Quiz not started yet'}
                      </p>
                    </div>
                    <Badge variant={quizAnswers.length >= 15 ? "default" : "secondary"} className="text-sm px-4 py-2">
                      {quizAnswers.length >= 15 ? "✓ Complete" : "Incomplete"}
                    </Badge>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg">Actions</h3>
                    {quizAnswers.length === 0 ? (
                      <Button 
                        variant="gradient" 
                        size="xl"
                        className="w-full"
                        onClick={() => window.location.href = '/quiz'}
                      >
                        <Sparkles className="w-5 h-5 mr-2" />
                        Start Your Journey
                      </Button>
                    ) : (
                      <div className="space-y-3">
                        <Button 
                          variant="outline" 
                          size="lg"
                          className="w-full"
                          onClick={() => window.location.href = '/quiz'}
                        >
                          <RefreshCw className="w-4 h-4 mr-2" />
                          Retake Quiz
                        </Button>
                        <p className="text-xs text-muted-foreground text-center">
                          Retaking the quiz will update your compatibility profile and refresh your matches
                        </p>
                      </div>
                    )}
                  </div>

                  {quizAnswers.length > 0 && (
                    <div className="space-y-4">
                      <h3 className="font-medium">Your Current Answers</h3>
                      <div className="space-y-2 max-h-60 overflow-y-auto">
                        {quizAnswers.map((answer, index) => (
                          <div key={answer.id} className="flex justify-between items-center p-3 bg-accent/20 rounded-lg">
                            <span className="text-sm font-medium">Question {index + 1}</span>
                            <Badge variant="outline" className="text-xs">
                              {answer.answer}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Enlarged Profile View Dialog */}
      <EnlargedProfileView
        profile={selectedProfile}
        isOpen={enlargedViewOpen}
        onClose={() => {
          setEnlargedViewOpen(false);
          setSelectedProfile(null);
        }}
        onConnect={selectedProfile ? () => {
          sendMatch(selectedProfile.user_id);
          setEnlargedViewOpen(false);
        } : undefined}
        onBlock={selectedProfile ? () => blockUser(selectedProfile.user_id) : undefined}
        compatibilityScore={(selectedProfile as any)?.compatibility_score}
        isOnline={Math.random() > 0.5}
        isVerified={selectedProfile?.age_verified || false}
        onVerificationChange={async () => {
          // Refresh the potential matches list
          await fetchPotentialMatches();
          // Also update the selected profile to reflect changes immediately
          if (selectedProfile?.user_id) {
            const { data } = await supabase
              .from('profiles')
              .select('*')
              .eq('user_id', selectedProfile.user_id)
              .single();
            if (data) {
              setSelectedProfile(data as Profile);
            }
          }
        }}
      />

      {/* Gift Sender Dialog */}
      {selectedMatchForGift && selectedMatchForGift.profiles && (
        <div onClick={() => setSelectedMatchForGift(null)}>
          <GiftSender
            receiverId={selectedMatchForGift.profiles.user_id}
            matchId={selectedMatchForGift.id}
            receiverName={selectedMatchForGift.profiles.name}
          />
        </div>
      )}

    </div>
  );
};

export default ProfilePage;
