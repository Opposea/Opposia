import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Heart, Users, MessageCircle, Sparkles } from "lucide-react";

const HowItWorksPage = () => {
  const steps = [
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Take Our Quiz",
      description: "Answer 20 questions about your preferences and personality to help us understand what makes you unique."
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: "Our Algorithm Works",
      description: "We analyze your answers and find people whose differences complement your strengths perfectly."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Meet Your Matches",
      description: "Browse through carefully selected profiles of people who balance your personality traits."
    },
    {
      icon: <MessageCircle className="w-8 h-8" />,
      title: "Start Connecting",
      description: "Chat with your matches and discover how your differences create amazing chemistry."
    }
  ];

  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Header */}
      <div className="bg-gradient-hero py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            How It Works
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Discover how we help you find your perfect match through our proven process
          </p>
        </div>
      </div>

      {/* Steps */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div className="text-primary mb-4 flex justify-center">
                    {step.icon}
                  </div>
                  <div className="text-primary text-sm font-semibold mb-2">
                    Step {index + 1}
                  </div>
                  <h3 className="text-xl font-bold mb-4">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Take our compatibility quiz and let us find your perfect opposite
          </p>
          <Link to="/quiz">
            <Button variant="magnetic" size="lg">
              Take the Quiz Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HowItWorksPage;