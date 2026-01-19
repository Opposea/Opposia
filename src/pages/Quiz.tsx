import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Heart, Camera } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { VerificationSelfieUpload } from "@/components/VerificationSelfieUpload";
import { useIsAdmin } from "@/hooks/useIsAdmin";

const quizQuestions = [
  {
    id: "gender",
    question: "Are you a man or a woman?",
    options: [
      { value: "man", label: "Man" },
      { value: "woman", label: "Woman" }
    ]
  },
  {
    id: "looking_for",
    question: "Are you looking for a man or a woman?",
    options: [
      { value: "man", label: "A man" },
      { value: "woman", label: "A woman" },
      { value: "both", label: "Both" }
    ]
  },
  {
    id: "cooking",
    question: "In day-to-day life, what's your relationship with cooking?",
    options: [
      { value: "love", label: "I love cooking" },
      { value: "sometimes", label: "I like to cook sometimes — I like to share it" },
      { value: "rather-not", label: "I'd rather not" },
      { value: "together", label: "I prefer cooking together" }
    ]
  },
  {
    id: "dishes",
    question: "How do you feel about washing up and keeping the kitchen clean?",
    options: [
      { value: "dont-mind", label: "I don't mind it" },
      { value: "sometimes", label: "I'll do it sometimes — I like to share it" },
      { value: "dont-enjoy", label: "I really don't enjoy it" },
      { value: "together", label: "I prefer doing it together" }
    ]
  },
  {
    id: "driving",
    question: "On longer trips, what's your driving style?",
    options: [
      { value: "main-driver", label: "I'm the main driver — I like being in charge of the route" },
      { value: "share", label: "I like to share it" },
      { value: "rather-not", label: "I'd rather not drive — I prefer my partner to drive" },
      { value: "together", label: "I prefer driving together (switching often / co-pilot teamwork)" }
    ]
  },
  {
    id: "finances",
    question: "When it comes to money admin (bills, budgeting, keeping things on track), what suits you?",
    options: [
      { value: "lead", label: "I like managing it — I'm happy to take the lead" },
      { value: "share", label: "I'm comfortable sharing it" },
      { value: "rather-not", label: "I'd rather not — I prefer my partner handles it" },
      { value: "together", label: "I prefer doing it together (full transparency, decisions together)" }
    ]
  },
  {
    id: "planning_events",
    question: "For social plans (dinners, weekends, friend catch-ups), what role do you naturally take?",
    options: [
      { value: "organiser", label: "I'm the organiser — I enjoy planning" },
      { value: "sometimes", label: "I'll plan sometimes / I can share it" },
      { value: "rather-not", label: "I'd rather not — I prefer someone else leads" },
      { value: "together", label: "I prefer planning together" }
    ]
  },
  {
    id: "fixing_things",
    question: "If something needs fixing (or furniture needs assembling), what's your vibe?",
    options: [
      { value: "fixer", label: "I'm the fixer — I'll take the lead" },
      { value: "basics", label: "I can do basics / happy to help" },
      { value: "not-my-thing", label: "Not my thing — I'd prefer my partner handles it" },
      { value: "together", label: "I prefer tackling it together" }
    ]
  },
  {
    id: "decorating",
    question: "When it comes to decorating and creating the \"feel\" of a home, what best describes you?",
    options: [
      { value: "love-lead", label: "I love it — I'm happy to lead" },
      { value: "sometimes", label: "I enjoy it sometimes / happy to collaborate" },
      { value: "not-into-it", label: "I'm not into it — I'd prefer my partner leads" },
      { value: "together", label: "I prefer deciding together" }
    ]
  },
  {
    id: "grocery_shopping",
    question: "How do you feel about grocery shopping / stocking the house?",
    options: [
      { value: "dont-mind", label: "I don't mind it — I'm happy to take the lead" },
      { value: "sometimes", label: "I'll do it sometimes / happy to share it" },
      { value: "dont-enjoy", label: "I really don't enjoy it — I'd prefer my partner does it" },
      { value: "together", label: "I prefer doing it together" }
    ]
  },
  {
    id: "customer_service",
    question: "When something needs sorting (delivery issue, bills, cancellations), are you the one who handles it?",
    options: [
      { value: "yes", label: "Yes — I'll handle it, no problem" },
      { value: "share", label: "I can, but I'd rather share it" },
      { value: "prefer-partner", label: "I'd strongly prefer my partner handles it" },
      { value: "together", label: "I prefer doing it together (speakerphone teamwork)" }
    ]
  },
  {
    id: "making_bed",
    question: "In the morning, how do you feel about making the bed / doing a quick reset?",
    options: [
      { value: "matters", label: "It matters to me — I usually do it" },
      { value: "sometimes", label: "I do it sometimes" },
      { value: "rarely", label: "I rarely do it — I'd prefer my partner cares more about this" },
      { value: "together", label: "I prefer doing it together / shared routine" }
    ]
  },
  {
    id: "gardening",
    question: "What's your relationship with outdoor upkeep (plants, garden, yard work)?",
    options: [
      { value: "enjoy-lead", label: "I enjoy it — I'm happy to take the lead" },
      { value: "sometimes", label: "I'll do it sometimes / happy to help" },
      { value: "not-for-me", label: "Not for me — I'd prefer my partner handles it" },
      { value: "together", label: "I prefer doing it together" }
    ]
  },
  {
    id: "packing_trips",
    question: "Before a trip, what's your packing style?",
    options: [
      { value: "planner", label: "I'm the planner/packer — I like to take the lead" },
      { value: "pack-fine", label: "I pack fine — happy to share it" },
      { value: "last-minute", label: "I'm a last-minute packer — I'd prefer my partner leads" },
      { value: "together", label: "I prefer packing together" }
    ]
  },
  {
    id: "planning_birthdays",
    question: "For birthdays/holidays, how do you approach planning and making it special?",
    options: [
      { value: "love-lead", label: "I love it — I'm happy to lead" },
      { value: "contribute", label: "I'll contribute / share it" },
      { value: "not-great", label: "I'm not great at it" },
      { value: "together", label: "I prefer planning together" }
    ]
  },
  {
    id: "picking_movies",
    question: "On a night in, how do you prefer choosing what to watch?",
    options: [
      { value: "chooser", label: "I'm the chooser — I like picking" },
      { value: "easy", label: "I'm easy — happy to take turns" },
      { value: "rather-not", label: "I'd rather someone else choose" },
      { value: "together", label: "I prefer choosing together (agreeing on a vibe first)" }
    ]
  },
  {
    id: "initiating_social",
    question: "With friends/family, who usually gets the plan moving?",
    options: [
      { value: "me", label: "Me — I naturally initiate and organise" },
      { value: "sometimes", label: "Sometimes me, sometimes them" },
      { value: "usually-not", label: "I usually don't — I prefer my partner initiates" },
      { value: "together", label: "I prefer initiating together" }
    ]
  }
];

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentSelfieUrl, setCurrentSelfieUrl] = useState<string | null>(null);
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { isAdmin } = useIsAdmin();

  const fetchCurrentSelfie = async () => {
    if (!user) return;
    const { data } = await supabase
      .from('profiles')
      .select('verification_selfie_url')
      .eq('user_id', user.id)
      .single();
    if (data?.verification_selfie_url) {
      setCurrentSelfieUrl(data.verification_selfie_url);
    }
  };

  useEffect(() => {
    fetchCurrentSelfie();
  }, [user]);
  
  const form = useForm({
    defaultValues: Object.fromEntries(
      quizQuestions.map(q => [q.id, ""])
    )
  });

  const onSubmit = async (data: any) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to save your quiz results.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Extract gender and looking_for to update profile
      const gender = data.gender;
      const lookingFor = data.looking_for;
      
      // Map quiz values to database values for compatibility matching
      const genderMapping: Record<string, string> = {
        'man': 'male',
        'woman': 'female'
      };
      const dbGender = genderMapping[gender] || gender;
      
      // Derive sexual orientation from gender + looking_for
      let sexualOrientation: string;
      if (lookingFor === 'both') {
        sexualOrientation = 'bi';
      } else if (gender === 'man' && lookingFor === 'man') {
        sexualOrientation = 'gay';
      } else if (gender === 'woman' && lookingFor === 'woman') {
        sexualOrientation = 'lesbian';
      } else {
        sexualOrientation = 'straight';
      }

      // Update profile with gender, looking_for, and derived sexual orientation
      const profilePatch = {
        gender: dbGender,
        looking_for: lookingFor,
        sexual_orientation: sexualOrientation,
      };

      const { data: updatedProfile, error: profileUpdateError } = await supabase
        .from('profiles')
        .update(profilePatch)
        .eq('user_id', user.id)
        .select('user_id')
        .maybeSingle();

      if (profileUpdateError) throw profileUpdateError;

      // If the profile row doesn't exist (common when the DB trigger isn't installed), create it.
      if (!updatedProfile) {
        const nameFromMeta = (user.user_metadata as any)?.name as string | undefined;
        const fallbackName = user.email?.split('@')[0] || 'User';

        const { error: insertError } = await supabase
          .from('profiles')
          .insert({
            user_id: user.id,
            name: (nameFromMeta || fallbackName).trim().slice(0, 100),
            ...profilePatch,
          } as any);

        if (insertError) throw insertError;
      }

      // Save quiz answers to database
      const answers = Object.entries(data).map(([questionId, answer]) => ({
        user_id: user.id,
        question_id: questionId,
        answer: answer as string,
      }));

      const { error } = await supabase
        .from('quiz_answers')
        .upsert(answers, { onConflict: 'user_id,question_id' });

      if (error) throw error;

      setIsComplete(true);
      toast({
        title: "Quiz Completed!",
        description: "Your answers have been saved. Let's find your matches!",
      });
    } catch (error) {
      console.error('Error saving quiz answers:', error);
      toast({
        title: "Error",
        description: "Failed to save quiz answers. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNext = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;
  const currentAnswer = form.watch(quizQuestions[currentQuestion].id);

  if (isComplete) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
        <div className="w-full max-w-2xl space-y-6 relative z-10">
          <Card>
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-gradient-attraction rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold bg-gradient-attraction bg-clip-text text-transparent">
                Quiz Complete!
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-6">
              <p className="text-muted-foreground">
                Thank you for completing our compatibility quiz! We're analyzing your preferences to find your compatible match.
              </p>
            </CardContent>
          </Card>

          <VerificationSelfieUpload 
            currentSelfieUrl={currentSelfieUrl}
            onComplete={() => fetchCurrentSelfie()}
          />

          <div className="space-y-4">
            {!isAdmin && !currentSelfieUrl && (
              <Card className="bg-amber-50/50 dark:bg-amber-950/20 border-amber-500/50">
                <CardContent className="py-4 text-center">
                  <p className="text-sm text-amber-800 dark:text-amber-200 flex items-center justify-center gap-2">
                    <Camera className="w-4 h-4" />
                    Please upload a verification selfie to access matches
                  </p>
                </CardContent>
              </Card>
            )}
            <Button 
              variant="magnetic" 
              size="lg" 
              className="w-full"
              onClick={() => navigate('/profile?tab=discover')}
              disabled={!isAdmin && !currentSelfieUrl}
            >
              Discover Your Matches
            </Button>
            <Link to="/">
              <Button variant="outline" size="lg" className="w-full">
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Link to="/" className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
            <h1 className="text-3xl font-bold bg-gradient-attraction bg-clip-text text-transparent mb-2">
              Compatibility Quiz
            </h1>
            <p className="text-muted-foreground">
              Answer these questions to help us find your compatible match
            </p>
          </div>

          {/* Progress */}
          <div className="mb-8">
            <div className="flex justify-between text-sm text-muted-foreground mb-2">
              <span>Question {currentQuestion + 1} of {quizQuestions.length}</span>
              <span>{Math.round(progress)}% complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Question Card */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">
                    {quizQuestions[currentQuestion].question}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <FormField
                    key={quizQuestions[currentQuestion].id}
                    control={form.control}
                    name={quizQuestions[currentQuestion].id}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            value={field.value}
                            className="space-y-4"
                          >
                            {quizQuestions[currentQuestion].options.map((option) => {
                              const uniqueId = `${quizQuestions[currentQuestion].id}-${option.value}`;
                              return (
                                <div key={option.value} className="flex items-center space-x-3 p-4 rounded-lg border hover:bg-accent/50 transition-colors">
                                  <RadioGroupItem value={option.value} id={uniqueId} />
                                  <FormLabel htmlFor={uniqueId} className="flex-1 cursor-pointer font-normal">
                                    {option.label}
                                  </FormLabel>
                                </div>
                              );
                            })}
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              {/* Navigation */}
              <div className="flex justify-between">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={currentQuestion === 0}
                >
                  Previous
                </Button>
                
                {currentQuestion === quizQuestions.length - 1 ? (
                  <Button
                    type="submit"
                    variant="magnetic"
                    disabled={!currentAnswer || isSubmitting}
                  >
                    {isSubmitting ? "Saving..." : "Complete Quiz"}
                  </Button>
                ) : (
                  <Button
                    type="button"
                    variant="default"
                    onClick={handleNext}
                    disabled={!currentAnswer}
                  >
                    Next
                  </Button>
                )}
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Quiz;