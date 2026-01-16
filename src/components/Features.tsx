import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap, Shield, MessageCircle, Compass, Brain, Infinity } from "lucide-react";
const Features = () => {
  const features = [{
    icon: <Brain className="w-8 h-8" />,
    title: "Smart Matching Algorithm",
    description: "Our AI learns your personality and matches you with complementary souls who bring out your best qualities."
  }, {
    icon: <Zap className="w-8 h-8" />,
    title: "Instant Chemistry Detection",
    description: "Advanced compatibility scoring that identifies the perfect balance of similarities and differences."
  }, {
    icon: <MessageCircle className="w-8 h-8" />,
    title: "Conversation Starters",
    description: "Personalized icebreakers based on your unique combination to spark meaningful connections."
  }, {
    icon: <Shield className="w-8 h-8" />,
    title: "Safe & Verified",
    description: "All profiles are verified to ensure authentic connections in a secure environment."
  }, {
    icon: <Compass className="w-8 h-8" />,
    title: "Discovery Mode",
    description: "Explore potential matches based on different aspects of your personality for diverse connections."
  }, {
    icon: <Infinity className="w-8 h-8" />,
    title: "Endless Possibilities",
    description: "With millions of unique personality combinations, your compatible match is waiting to be discovered."
  }];
  return <section aria-labelledby="features-heading" className="py-16 sm:py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-16">
          <h2 id="features-heading" className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-foreground">
            Why   <span className="bg-gradient-hero bg-clip-text text-transparent">​Opposia?</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Experience dating like never before with features designed to celebrate your differences and create lasting connections
          </p>
        </div>
        
        <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => <Card key={index} className="group hover:shadow-elegant transition-smooth border-border/50 hover:border-primary/20">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-hero rounded-lg flex items-center justify-center text-white mb-4 group-hover:shadow-magnetic transition-magnetic group-hover:scale-105" aria-hidden="true">
                  {feature.icon}
                </div>
                <CardTitle className="text-xl font-semibold text-foreground">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>)}
        </div>
      </div>
    </section>;
};
export default Features;
