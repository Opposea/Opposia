import { Zap, Shield, MessageCircle, Compass, Brain, Infinity } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: <Brain className="w-6 h-6" />,
      title: "Smart Matching",
      description: "AI-powered personality analysis finds your perfect complement.",
      gradient: "from-violet-500 to-purple-600"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Instant Chemistry",
      description: "Advanced scoring identifies the ideal balance of traits.",
      gradient: "from-amber-500 to-orange-600"
    },
    {
      icon: <MessageCircle className="w-6 h-6" />,
      title: "Conversation Starters",
      description: "Personalized icebreakers to spark meaningful connections.",
      gradient: "from-emerald-500 to-teal-600"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Safe & Verified",
      description: "All profiles verified for authentic, secure connections.",
      gradient: "from-blue-500 to-indigo-600"
    },
    {
      icon: <Compass className="w-6 h-6" />,
      title: "Discovery Mode",
      description: "Explore matches based on different personality aspects.",
      gradient: "from-pink-500 to-rose-600"
    },
    {
      icon: <Infinity className="w-6 h-6" />,
      title: "Endless Possibilities",
      description: "Millions of unique combinations await discovery.",
      gradient: "from-cyan-500 to-blue-600"
    }
  ];

  return (
    <section aria-labelledby="features-heading" className="py-24 md:py-32 bg-muted/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-full">
        <div className="absolute top-20 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
      </div>
      
      <div className="container mx-auto px-6 relative">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Features
          </span>
          <h2 id="features-heading" className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground tracking-tight">
            Why Choose <span className="text-gradient-hero">Opposia</span>?
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Experience dating like never before with features designed to celebrate your differences
          </p>
        </div>
        
        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="group relative bg-card rounded-2xl p-8 transition-all duration-500 hover:-translate-y-2 border border-border/50 hover:border-primary/20 hover:shadow-elegant"
            >
              {/* Icon */}
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center text-white mb-6 shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                {feature.icon}
              </div>
              
              {/* Content */}
              <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
              
              {/* Hover glow effect */}
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
