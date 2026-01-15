import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Heart, Coffee, Flower2, Gift, Star, Candy } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

interface GiftSenderProps {
  receiverId: string;
  matchId: string;
  receiverName: string;
  onGiftSent?: () => void;
}

const GIFT_OPTIONS = [
  { id: 'rose', name: '🌹 Rose', icon: Flower2, color: 'bg-pink-100 text-pink-800' },
  { id: 'heart', name: '❤️ Heart', icon: Heart, color: 'bg-red-100 text-red-800' },
  { id: 'coffee', name: '☕ Coffee', icon: Coffee, color: 'bg-amber-100 text-amber-800' },
  { id: 'star', name: '⭐ Star', icon: Star, color: 'bg-yellow-100 text-yellow-800' },
  { id: 'flowers', name: '💐 Flowers', icon: Flower2, color: 'bg-purple-100 text-purple-800' },
  { id: 'chocolate', name: '🍫 Chocolate', icon: Candy, color: 'bg-amber-100 text-amber-900' },
];

const GiftSender: React.FC<GiftSenderProps> = ({ receiverId, matchId, receiverName, onGiftSent }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedGift, setSelectedGift] = useState<typeof GIFT_OPTIONS[0] | null>(null);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  const handleSendGift = async () => {
    if (!selectedGift || !user) {
      toast.error('Please select a gift and ensure you are logged in');
      return;
    }

    if (message.length > 200) {
      toast.error('Message is too long (max 200 characters)');
      return;
    }

    setIsLoading(true);

    try {
      // Send gift directly without payment
      const { error } = await supabase
        .from('gifts')
        .insert({
          sender_id: user.id,
          receiver_id: receiverId,
          match_id: matchId,
          gift_type: selectedGift.id,
          gift_name: selectedGift.name,
          message: message.trim() || null,
          status: 'sent',
        });

      if (error) throw error;

      toast.success(`${selectedGift.name} sent to ${receiverName}!`);
      setIsOpen(false);
      setSelectedGift(null);
      setMessage('');
      onGiftSent?.();
    } catch (error: any) {
      toast.error('Failed to send gift');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="default" className="gap-2">
          <Gift className="w-4 h-4" />
          <span className="hidden sm:inline">Send Gift</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Send a Gift to {receiverName}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {/* Gift Selection */}
          <div>
            <h4 className="font-medium mb-3">Choose a Gift</h4>
            <div className="grid grid-cols-3 gap-2">
              {GIFT_OPTIONS.map((gift) => {
                const IconComponent = gift.icon;
                const isSelected = selectedGift?.id === gift.id;
                return (
                  <Card
                    key={gift.id}
                    className={`cursor-pointer transition-all ${
                      isSelected ? 'ring-2 ring-primary bg-primary/5' : 'hover:bg-muted/50'
                    }`}
                    onClick={() => setSelectedGift(gift)}
                  >
                    <CardContent className="p-3 text-center">
                      <div className={`w-12 h-12 rounded-full ${gift.color} flex items-center justify-center mx-auto mb-2`}>
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <p className="text-sm font-medium">{gift.name}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Message */}
          <div>
            <label className="text-sm font-medium">Add a Message (Optional)</label>
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write a sweet message..."
              rows={3}
              maxLength={200}
              className="mt-1"
            />
          </div>

          {/* Send Button */}
          <div className="flex gap-2">
            <Button
              onClick={handleSendGift}
              disabled={!selectedGift || isLoading}
              className="flex-1"
            >
              {isLoading ? 'Processing...' : `Send ${selectedGift?.name || 'Gift'}`}
            </Button>
            <Button variant="outline" onClick={() => setIsOpen(false)} disabled={isLoading}>
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GiftSender;