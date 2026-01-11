import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-dating.jpg";
import { ArrowRight, Sparkles } from "lucide-react";

const Hero = () => {
  return (
    <section aria-label="Hero section" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Modern Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
        style={{ backgroundImage: `url(${heroImage})` }}
        role="img" 
        aria-label="Romantic couple embracing at sunset"
      >
        {/* Multi-layer gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/70 via-foreground/50 to-foreground/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/30 via-transparent to-secondary/30" />
      </div>
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/20 rounded-full blur-3xl animate-float-delayed" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/10 rounded-full blur-3xl animate-pulse-slow" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-8">
          <Sparkles className="w-4 h-4 text-secondary" />
          <span className="text-sm font-medium text-white/90">Where Opposites Find Love</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-[0.95] tracking-tight">
          <span className="text-white block">Find someone who</span>
          <span className="text-gradient-hero block mt-2">completes you</span>
        </h1>
        
        <p className="text-lg md:text-xl mb-10 text-white/80 max-w-2xl mx-auto leading-relaxed font-light">
          The dating app that celebrates your differences. Discover meaningful connections 
          with people who complement your personality perfectly.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link to="/quiz">
            <Button 
              variant="magnetic" 
              size="lg" 
              className="text-base px-8 py-6 rounded-full bg-white text-foreground hover:bg-white/90 shadow-elegant group"
            >
              Start Your Journey
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <Link to="/how-it-works">
            <Button 
              variant="outline" 
              size="lg" 
              className="text-base px-8 py-6 rounded-full bg-white/5 border-white/20 text-white hover:bg-white/10 backdrop-blur-sm"
            >
              See How It Works
            </Button>
          </Link>
        </div>
        
        {/* Stats */}
        <div className="mt-16 pt-8 border-t border-white/10">
          <div className="grid grid-cols-3 gap-8 max-w-lg mx-auto">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white">50K+</div>
              <div className="text-sm text-white/60 mt-1">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white">89%</div>
              <div className="text-sm text-white/60 mt-1">Match Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white">12K+</div>
              <div className="text-sm text-white/60 mt-1">Love Stories</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-white/40 text-xs uppercase tracking-widest">Scroll</span>
        <div className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-white/60 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
