import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, ArrowRight, Sparkles } from "lucide-react";

const CTA = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Email submitted:", email);
    setEmail("");
  };

  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-hero animate-gradient" />
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-white/5 rounded-full blur-3xl animate-float-delayed" />
        
        {/* Decorative circles */}
        <div className="absolute top-20 left-20 w-40 h-40 border border-white/10 rounded-full" />
        <div className="absolute bottom-20 right-20 w-60 h-60 border border-white/5 rounded-full" />
        <div className="absolute top-1/2 -translate-y-1/2 -left-20 w-96 h-96 border border-white/5 rounded-full" />
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8">
            <Sparkles className="w-4 h-4 text-white" />
            <span className="text-sm font-medium text-white/90">Join 50,000+ happy users</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white tracking-tight leading-tight">
            Ready to Find Your
            <span className="block mt-2">Perfect Opposite?</span>
          </h2>
          
          <p className="text-lg md:text-xl text-white/80 mb-10 max-w-xl mx-auto leading-relaxed">
            Join thousands who've discovered that their perfect match was their perfect opposite all along.
          </p>
          
          {/* Email Form */}
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-6">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-5 py-4 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:bg-white/20 focus:border-white/40 transition-all backdrop-blur-sm"
              required
            />
            <Button 
              type="submit" 
              className="px-8 py-4 rounded-full bg-white text-foreground hover:bg-white/90 font-semibold shadow-elegant group"
            >
              Get Started
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </form>
          
          <p className="text-white/50 text-sm mb-10">
            Free to join • No credit card required • Find your match in minutes
          </p>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link to="/quiz">
              <Button 
                variant="outline" 
                size="lg" 
                className="rounded-full bg-white/10 border-white/20 text-white hover:bg-white/20 hover:border-white/30 px-8"
              >
                Take Compatibility Quiz
              </Button>
            </Link>
          </div>
          
          {/* Support Section */}
          <div className="pt-8 border-t border-white/10">
            <a 
              href="https://buy.stripe.com/4gM6oHayDe1G6Mk7BXgfu01" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 border border-white/10 text-white/80 hover:bg-white/10 hover:text-white transition-all group"
            >
              <Heart className="w-5 h-5 fill-current group-hover:scale-110 transition-transform" />
              <span className="font-medium">Support Opposia</span>
            </a>
            <p className="text-white/40 text-sm mt-3">
              Help us keep bringing opposites together
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
