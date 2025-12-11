import { Heart, Users, Sparkles, Target } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: <Users className="w-12 h-12" />,
      title: "Take Our Quiz",
      description: "Tell us about your interests, values, and what makes you unique. Our algorithm learns what you're looking for."
    },
    {
      icon: <Target className="w-12 h-12" />,
      title: "Find Your Opposite",
      description: "We match you with people who complement your personality, creating that perfect spark of chemistry."
    },
    {
      icon: <Sparkles className="w-12 h-12" />,
      title: "Connect & Discover",
      description: "Start meaningful conversations and discover how your differences can create something beautiful together."
    },
    {
      icon: <Heart className="w-12 h-12" />,
      title: "Build Something Amazing",
      description: "Watch as your unique combination creates a love story that's perfectly balanced and wonderfully unexpected."
    }
  ];

  return (
    <section className="py-20 bg-gradient-subtle">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            How It Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Our unique matching system brings together people whose differences create perfect harmony
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center group">
              <div className="relative mb-6">
                <div className="w-20 h-20 mx-auto bg-gradient-hero rounded-full flex items-center justify-center text-white shadow-magnetic group-hover:shadow-warm transition-magnetic group-hover:scale-110">
                  {step.icon}
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-secondary rounded-full flex items-center justify-center text-white text-sm font-bold">
                  {index + 1}
                </div>
              </div>
              
              <h3 className="text-xl font-semibold mb-4 text-foreground">
                {step.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;