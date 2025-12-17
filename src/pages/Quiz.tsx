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
    question: "What is your gender?",
    options: [
      { value: "male", label: "Male" },
      { value: "female", label: "Female" },
      { value: "non-binary/trans", label: "Non-binary/Trans" }
    ]
  },
  {
    id: "sexual_orientation",
    question: "What is your sexual orientation?",
    options: [
      { value: "straight", label: "Straight" },
      { value: "gay", label: "Gay" },
      { value: "lesbian", label: "Lesbian" },
      { value: "bi", label: "Bi" },
      { value: "pansexual", label: "Pansexual" }
    ]
  },
  {
    id: "cooking",
    question: "Do you enjoy cooking?",
    options: [
      { value: "yes", label: "Yes" },
      { value: "sometimes", label: "Sometimes" },
      { value: "no", label: "No" },
      { value: "together", label: "Likes to do it together" }
    ]
  },
  {
    id: "dishes",
    question: "Do you enjoy doing the dishes?",
    options: [
      { value: "yes", label: "Yes" },
      { value: "sometimes", label: "Sometimes" },
      { value: "no", label: "No" },
      { value: "together", label: "Likes to do it together" }
    ]
  },
  {
    id: "driving",
    question: "Do you enjoy being the one who drives on a long trip?",
    options: [
      { value: "yes", label: "Yes" },
      { value: "sometimes", label: "Sometimes" },
      { value: "no", label: "No" }
    ]
  },
  {
    id: "finances",
    question: "Do you enjoy handling the finances and budgeting?",
    options: [
      { value: "yes", label: "Yes" },
      { value: "sometimes", label: "Sometimes" },
      { value: "no", label: "No" },
      { value: "together", label: "Likes to do it together" }
    ]
  },
  {
    id: "planning_events",
    question: "Do you enjoy planning social events and get-togethers?",
    options: [
      { value: "yes", label: "Yes" },
      { value: "sometimes", label: "Sometimes" },
      { value: "no", label: "No" },
      { value: "together", label: "Likes to do it together" }
    ]
  },
  {
    id: "fixing_things",
    question: "Do you enjoy being the one who assembles furniture and fixes things?",
    options: [
      { value: "yes", label: "Yes" },
      { value: "sometimes", label: "Sometimes" },
      { value: "no", label: "No" },
      { value: "together", label: "Likes to do it together" }
    ]
  },
  {
    id: "decorating",
    question: "Do you enjoy being the one who decorates the home?",
    options: [
      { value: "yes", label: "Yes" },
      { value: "sometimes", label: "Sometimes" },
      { value: "no", label: "No" },
      { value: "together", label: "Likes to do it together" }
    ]
  },
  {
    id: "grocery_shopping",
    question: "Do you enjoy grocery shopping?",
    options: [
      { value: "yes", label: "Yes" },
      { value: "sometimes", label: "Sometimes" },
      { value: "no", label: "No" },
      { value: "together", label: "Likes to do it together" }
    ]
  },
  {
    id: "customer_service",
    question: "Do you enjoy being the one who talks to customer service on the phone?",
    options: [
      { value: "yes", label: "Yes" },
      { value: "sometimes", label: "Sometimes" },
      { value: "no", label: "No" },
      { value: "together", label: "Likes to do it together" }
    ]
  },
  {
    id: "making_bed",
    question: "Do you make the bed in the morning?",
    options: [
      { value: "yes", label: "Yes" },
      { value: "sometimes", label: "Sometimes" },
      { value: "no", label: "No" },
      { value: "together", label: "Likes to do it together" }
    ]
  },
  {
    id: "gardening",
    question: "Do you enjoy gardening and outdoor yard work?",
    options: [
      { value: "yes", label: "Yes" },
      { value: "sometimes", label: "Sometimes" },
      { value: "no", label: "No" },
      { value: "together", label: "Likes to do it together" }
    ]
  },
  {
    id: "packing_trips",
    question: "Do you enjoy being the one who packs for trips?",
    options: [
      { value: "yes", label: "Yes" },
      { value: "sometimes", label: "Sometimes" },
      { value: "no", label: "No" },
      { value: "together", label: "Likes to do it together" }
    ]
  },
  {
    id: "planning_birthdays",
    question: "Do you enjoy being the one who plans for birthdays and holidays?",
    options: [
      { value: "yes", label: "Yes" },
      { value: "sometimes", label: "Sometimes" },
      { value: "no", label: "No" },
      { value: "together", label: "Likes to do it together" }
    ]
  },
  {
    id: "picking_movies",
    question: "Do you enjoy being the one who picks the movie or show to watch?",
    options: [
      { value: "yes", label: "Yes" },
      { value: "sometimes", label: "Sometimes" },
      { value: "no", label: "No" },
      { value: "together", label: "Likes to do it together" }
    ]
  },
  {
    id: "initiating_social",
    question: "Do you enjoy being the one who initiates social plans with friends?",
    options: [
      { value: "yes", label: "Yes" },
      { value: "sometimes", label: "Sometimes" },
      { value: "no", label: "No" },
      { value: "together", label: "Likes to do it together" }
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
      // Extract gender and sexual_orientation to update profile
      const gender = data.gender;
      const sexualOrientation = data.sexual_orientation;

      // Update profile with gender and sexual orientation
      const { error: profileError } = await supabase
        .from("profiles")
        .update({
          gender,
          sexual_orientation: sexualOrientation,
        })
        .eq("user_id", user.id);

      if (profileError) throw profileError;

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
      <div className="min-h-screen bg-gradient-romantic flex items-center justify-center p-4">
        <div className="w-full max-w-2xl space-y-6">
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
                Thank you for completing our compatibility quiz! We're analyzing your preferences to find your perfect opposite match.
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
    <div className="min-h-screen bg-gradient-romantic pt-20">
      <div className="container mx-auto px-4 py-8">
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
              Answer these questions to help us find your perfect opposite match
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