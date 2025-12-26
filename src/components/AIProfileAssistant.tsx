import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Sparkles, Loader2, Wand2, RefreshCw, Check } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

interface AIProfileAssistantProps {
  type: 'bio' | 'interests';
  currentBio?: string;
  currentInterests?: string[];
  onApply: (value: string | string[]) => void;
}

const AIProfileAssistant: React.FC<AIProfileAssistantProps> = ({
  type,
  currentBio,
  currentInterests,
  onApply,
}) => {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | string[] | null>(null);

  const generateContent = async (action: 'bio' | 'interests' | 'improve') => {
    if (!user?.id) return;

    setLoading(true);
    setResult(null);

    try {
      const { data, error } = await supabase.functions.invoke('ai-profile-assistant', {
        body: {
          userId: user.id,
          type: action,
          currentBio: currentBio,
          currentInterests: currentInterests,
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

      if (action === 'interests') {
        setResult(data.interests || []);
      } else {
        setResult(data.bio || '');
      }

      toast.success('Content generated!');
    } catch (error: any) {
      console.error('Error generating content:', error);
      toast.error('Failed to generate content');
    } finally {
      setLoading(false);
    }
  };

  const handleApply = () => {
    if (result) {
      onApply(result);
      setOpen(false);
      setResult(null);
      toast.success(type === 'bio' ? 'Bio updated!' : 'Interests updated!');
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="gap-2 text-primary border-primary/30 hover:bg-primary/5"
        >
          <Sparkles className="w-4 h-4" />
          AI Help
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            {type === 'bio' ? 'AI Bio Assistant' : 'AI Interests Suggester'}
          </DialogTitle>
          <DialogDescription>
            {type === 'bio'
              ? 'Let AI help you write an engaging bio based on your personality from the quiz.'
              : 'Get personalized interest suggestions based on your quiz answers.'}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {!result ? (
            <div className="space-y-3">
              {type === 'bio' ? (
                <>
                  <Button
                    onClick={() => generateContent('bio')}
                    disabled={loading}
                    className="w-full gap-2"
                    variant="default"
                  >
                    {loading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Wand2 className="w-4 h-4" />
                    )}
                    Generate New Bio
                  </Button>
                  {currentBio && currentBio.trim() && (
                    <Button
                      onClick={() => generateContent('improve')}
                      disabled={loading}
                      className="w-full gap-2"
                      variant="outline"
                    >
                      {loading ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <RefreshCw className="w-4 h-4" />
                      )}
                      Improve My Current Bio
                    </Button>
                  )}
                </>
              ) : (
                <Button
                  onClick={() => generateContent('interests')}
                  disabled={loading}
                  className="w-full gap-2"
                  variant="default"
                >
                  {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Sparkles className="w-4 h-4" />
                  )}
                  Suggest Interests
                </Button>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              <Card className="bg-muted/50">
                <CardContent className="p-4">
                  {type === 'bio' || typeof result === 'string' ? (
                    <p className="text-sm whitespace-pre-wrap">{result as string}</p>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {(result as string[]).map((interest, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                        >
                          {interest}
                        </span>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              <div className="flex gap-2">
                <Button
                  onClick={() => generateContent(type)}
                  disabled={loading}
                  variant="outline"
                  className="flex-1 gap-2"
                >
                  {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <RefreshCw className="w-4 h-4" />
                  )}
                  Regenerate
                </Button>
                <Button
                  onClick={handleApply}
                  className="flex-1 gap-2"
                  variant="default"
                >
                  <Check className="w-4 h-4" />
                  Use This
                </Button>
              </div>
            </div>
          )}

          <p className="text-xs text-muted-foreground text-center">
            AI suggestions are based on your quiz answers and personality traits
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AIProfileAssistant;
