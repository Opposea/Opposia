import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Send, Gift, Trash2, ArrowLeft } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

import GiftSender from './GiftSender';
import OnlineIndicator from './OnlineIndicator';
import VerificationBadge from './VerificationBadge';

interface Message {
  id: string;
  content: string;
  sender_id: string;
  created_at: string;
  is_read: boolean;
}

interface Gift {
  id: string;
  gift_name: string;
  gift_type: string;
  message: string;
  sender_id: string;
  created_at: string;
}

interface Match {
  id: string;
  user1_id: string;
  user2_id: string;
  profiles?: {
    name: string;
    avatar_url?: string;
    email?: string;
    age?: number;
    bio?: string;
    location?: string;
    interests?: string[];
  };
}

interface MessagesTabProps {
  matches: Match[];
  preselectedMatchId?: string | null;
}

const MessagesTab: React.FC<MessagesTabProps> = ({ matches, preselectedMatchId }) => {
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [gifts, setGifts] = useState<Gift[]>([]);
  const [unreadGiftsCount, setUnreadGiftsCount] = useState(0);
  const [newMessage, setNewMessage] = useState('');
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();

  // Handle preselected match
  useEffect(() => {
    if (preselectedMatchId && matches.length > 0) {
      const match = matches.find(m => m.id === preselectedMatchId);
      if (match) {
        setSelectedMatch(match);
      }
    }
  }, [preselectedMatchId, matches]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, gifts]);

  useEffect(() => {
    if (selectedMatch) {
      fetchMessages();
      fetchGifts();
      setupRealtimeSubscription();
    }
  }, [selectedMatch]);

  const fetchMessages = async () => {
    if (!selectedMatch) return;

    try {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('match_id', selectedMatch.id)
        .order('created_at', { ascending: true });

      if (error) {
        return;
      }

      setMessages(data || []);
    } catch (error) {
      // Error fetching messages - silent fail
    }
  };

  const fetchGifts = async () => {
    if (!selectedMatch) return;

    try {
      const { data, error } = await supabase
        .from('gifts')
        .select('*')
        .eq('match_id', selectedMatch.id)
        .order('created_at', { ascending: true });

      if (error) {
        return;
      }

      setGifts(data || []);
      
      // Count unread gifts (gifts received by current user)
      const receiverId = selectedMatch.user1_id === user?.id ? selectedMatch.user1_id : selectedMatch.user2_id;
      const unreadCount = data?.filter(gift => gift.receiver_id === user?.id && gift.status === 'sent').length || 0;
      setUnreadGiftsCount(unreadCount);
    } catch (error) {
      // Error fetching gifts - silent fail
    }
  };

  const setupRealtimeSubscription = () => {
    if (!selectedMatch) return;

    const messagesChannel = supabase
      .channel(`messages:${selectedMatch.id}`)
      .on('postgres_changes', 
        { event: 'INSERT', schema: 'public', table: 'messages', filter: `match_id=eq.${selectedMatch.id}` },
        (payload) => {
          setMessages(prev => [...prev, payload.new as Message]);
        }
      )
      .on('postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'gifts', filter: `match_id=eq.${selectedMatch.id}` },
        (payload) => {
          setGifts(prev => [...prev, payload.new as Gift]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(messagesChannel);
    };
  };

  const sendMessage = async () => {
    const trimmedMessage = newMessage.trim();
    
    // Validate message
    if (!trimmedMessage || !selectedMatch || !user) return;
    
    if (trimmedMessage.length > 2000) {
      toast.error("Message is too long (max 2000 characters)");
      return;
    }

    setSending(true);
    try {
      const { data, error } = await supabase
        .from('messages')
        .insert({
          content: trimmedMessage,
          sender_id: user.id,
          match_id: selectedMatch.id
        })
        .select()
        .single();

      if (error) {
        toast.error('Failed to send message');
        return;
      }

      // Immediately add message to local state for instant feedback
      if (data) {
        setMessages(prev => [...prev, data as Message]);
      }

      setNewMessage('');
      toast.success('Message sent');
    } catch (error: any) {
      toast.error('An error occurred while sending the message');
    } finally {
      setSending(false);
    }
  };

  const deleteMessage = async (messageId: string) => {
    try {
      const { data, error } = await supabase
        .from('messages')
        .delete()
        .eq('id', messageId)
        .eq('sender_id', user?.id)
        .select();

      if (error) {
        toast.error('Failed to delete message');
        return;
      }

      if (!data || data.length === 0) {
        toast.error('Message not found or you do not have permission to delete it');
        return;
      }

      setMessages(prev => prev.filter(msg => msg.id !== messageId));
      toast.success('Message deleted');
    } catch (error: any) {
      toast.error('An error occurred while deleting the message');
    }
  };


  const getOtherUser = (match: Match) => {
    return match.user1_id === user?.id ? match.user2_id : match.user1_id;
  };


  return (
    <Card className="flex flex-col md:flex-row h-[700px] shadow-elegant overflow-hidden">
      {/* Matches List */}
      <div className={`w-full md:w-1/3 border-r bg-muted/30 ${selectedMatch ? 'hidden md:flex md:flex-col' : 'flex flex-col'}`}>
        <div className="p-6 border-b bg-gradient-to-r from-primary/5 to-secondary/5">
          <h3 className="font-bold text-xl">Conversations</h3>
          <p className="text-sm text-muted-foreground mt-1">
            {matches.length} {matches.length === 1 ? 'match' : 'matches'}
          </p>
        </div>
        <div className="overflow-y-auto h-full">
          {matches.length === 0 ? (
            <div className="p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                <Send className="w-8 h-8 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground font-medium">No conversations yet</p>
              <p className="text-sm text-muted-foreground mt-1">Start matching to begin chatting!</p>
            </div>
          ) : (
            matches.map((match) => (
              <div
                key={match.id}
                className={`p-4 border-b cursor-pointer transition-all ${
                  selectedMatch?.id === match.id 
                    ? 'bg-primary/10 border-l-4 border-l-primary' 
                    : 'hover:bg-muted/50'
                }`}
                onClick={() => setSelectedMatch(match)}
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Avatar className="w-12 h-12 border-2 border-background">
                      <AvatarImage src={match.profiles?.avatar_url} />
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {match.profiles?.name?.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-1 -right-1">
                      <OnlineIndicator isOnline={Math.random() > 0.5} size="sm" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold truncate">{match.profiles?.name}</p>
                      <VerificationBadge verified={Math.random() > 0.5} size="sm" />
                    </div>
                    <p className="text-sm text-muted-foreground truncate">
                      {selectedMatch?.id === match.id ? 'Active now' : 'Click to open chat'}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Chat Area */}
      <div className={`flex-1 flex flex-col bg-background ${!selectedMatch ? 'hidden md:flex' : 'flex'}`}>
        {selectedMatch ? (
          <>
            {/* Chat Header */}
            <div className="p-3 md:p-4 border-b bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5 flex items-center justify-between gap-2">
              {/* Back button for mobile */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setSelectedMatch(null)}
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div className="flex items-center gap-2 md:gap-3 flex-1 min-w-0">
                <div className="relative">
                  <Avatar className="w-10 h-10 md:w-12 md:h-12 border-2 border-primary/20">
                    <AvatarImage src={selectedMatch.profiles?.avatar_url} />
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {selectedMatch.profiles?.name?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-1 -right-1">
                    <OnlineIndicator isOnline={Math.random() > 0.5} size="sm" />
                  </div>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1 md:gap-2">
                    <h3 className="font-semibold text-sm md:text-lg truncate">{selectedMatch.profiles?.name}</h3>
                    <VerificationBadge verified={Math.random() > 0.5} size="sm" />
                  </div>
                  <p className="text-xs text-muted-foreground hidden md:block">Active now</p>
                </div>
              </div>
              <TooltipProvider>
                <div className="flex gap-1 md:gap-2">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="relative">
                        <GiftSender
                          receiverId={getOtherUser(selectedMatch)}
                          matchId={selectedMatch.id}
                          receiverName={selectedMatch.profiles?.name || 'User'}
                        />
                        {unreadGiftsCount > 0 && (
                          <Badge 
                            variant="destructive" 
                            className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
                          >
                            {unreadGiftsCount}
                          </Badge>
                        )}
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Send a virtual gift to {selectedMatch.profiles?.name}</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </TooltipProvider>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-3 md:p-6 space-y-3 md:space-y-4 bg-muted/20">
              {[...messages, ...gifts.map(gift => ({ ...gift, type: 'gift' }))]
                .sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
                .map((item) => {
                  const isGift = 'gift_name' in item;
                  const isOwn = item.sender_id === user?.id;

                  if (isGift) {
                    const gift = item as Gift & { type: 'gift' };
                    return (
                      <div key={gift.id} className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-xs p-4 rounded-2xl shadow-soft ${
                          isOwn ? 'bg-primary text-primary-foreground' : 'bg-card text-card-foreground border'
                        }`}>
                          <div className="flex items-center gap-2 mb-2">
                            <Gift className="w-5 h-5" />
                            <span className="font-semibold">{gift.gift_name}</span>
                          </div>
                          {gift.message && (
                            <p className="text-sm mb-2">{gift.message}</p>
                          )}
                          <p className="text-xs opacity-70">
                            {new Date(gift.created_at).toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    );
                  }

                  const message = item as Message;
                  return (
                    <div key={message.id} className={`flex ${isOwn ? 'justify-end' : 'justify-start'} group`}>
                      <div className={`relative max-w-xs p-4 rounded-2xl shadow-soft ${
                        isOwn ? 'bg-primary text-primary-foreground' : 'bg-card text-card-foreground border'
                      }`}>
                        {isOwn && (
                          <button
                            onClick={() => deleteMessage(message.id)}
                            className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-destructive text-destructive-foreground opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center hover:scale-110"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        )}
                        <p className="break-words">{message.content}</p>
                        <p className="text-xs opacity-70 mt-2">
                          {new Date(message.created_at).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  );
                })}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="p-3 md:p-4 border-t bg-background flex gap-2 md:gap-3">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                disabled={sending}
                className="flex-1 rounded-full px-6 shadow-soft"
              />
              <Button 
                onClick={sendMessage} 
                disabled={sending || !newMessage.trim()}
                className="rounded-full w-10 h-10 md:w-12 md:h-12 p-0 shadow-elegant shrink-0"
                size="icon"
              >
                <Send className="w-4 h-4 md:w-5 md:h-5" />
              </Button>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
            <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mb-6">
              <Send className="w-12 h-12 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Start a Conversation</h3>
            <p className="text-muted-foreground max-w-sm">
              Select a match from the list to begin chatting and getting to know each other
            </p>
          </div>
        )}
      </div>
    </Card>
  );
};

export default MessagesTab;