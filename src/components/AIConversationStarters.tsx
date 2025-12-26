import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Sparkles, RefreshCw, MessageCircle, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

interface AIConversationStartersProps {
  matchUserId: string;
  matchName: string;
  onSelectStarter: (starter: string) => void;
}

const AIConversationStarters: React.FC<AIConversationStartersProps> = ({
  matchUserId,
  matchName,
  onSelectStarter,
}) => {
  const { user } = useAuth();
  const [starters, setStarters] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);

  const generateStarters = async () => {
    if (!user?.id) return;

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('ai-conversation-starters', {
        body: {
          userId: user.id,
          matchUserId: matchUserId,
        },
      });

      if (error) {
        console.error('Edge function error:', error);
        throw error;
      }

      if (data.error) {
        if (data.error.includes('Rate limit')) {
          toast.error('Too many requests. Please wait a moment and try again.');
        } else if (data.error.includes('credits')) {
          toast.error('AI credits exhausted. Please try again later.');
        } else {
          toast.error(data.error);
        }
        return;
      }

      setStarters(data.starters || []);
      setHasGenerated(true);
      toast.success('Conversation starters generated!');
    } catch (error: any) {
      console.error('Error generating starters:', error);
      toast.error('Failed to generate conversation starters');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectStarter = (starter: string) => {
    onSelectStarter(starter);
    toast.success('Message added! Click send when ready.');
  };

  if (!hasGenerated) {
    return (
      <Card className="bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5 border-primary/20">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-sm">Need help starting the conversation?</h4>
              <p className="text-xs text-muted-foreground">
                AI will suggest personalized icebreakers based on your compatibility
              </p>
            </div>
            <Button
              onClick={generateStarters}
              disabled={loading}
              size="sm"
              className="gap-2"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Sparkles className="w-4 h-4" />
              )}
              {loading ? 'Generating...' : 'Get Ideas'}
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5 border-primary/20">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-primary" />
            <h4 className="font-semibold text-sm">Conversation Starters for {matchName}</h4>
          </div>
          <Button
            onClick={generateStarters}
            disabled={loading}
            variant="ghost"
            size="sm"
            className="gap-1"
          >
            {loading ? (
              <Loader2 className="w-3 h-3 animate-spin" />
            ) : (
              <RefreshCw className="w-3 h-3" />
            )}
            Refresh
          </Button>
        </div>
        
        <div className="space-y-2">
          {starters.map((starter, index) => (
            <button
              key={index}
              onClick={() => handleSelectStarter(starter)}
              className="w-full text-left p-3 rounded-lg bg-background hover:bg-primary/5 border border-border hover:border-primary/30 transition-all text-sm group"
            >
              <div className="flex items-start gap-2">
                <MessageCircle className="w-4 h-4 text-muted-foreground group-hover:text-primary mt-0.5 shrink-0" />
                <span className="flex-1">{starter}</span>
              </div>
            </button>
          ))}
        </div>
        
        <p className="text-xs text-muted-foreground mt-3 text-center">
          Click a suggestion to use it, or write your own!
        </p>
      </CardContent>
    </Card>
  );
};

export default AIConversationStarters;
