import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

const CTA = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle email submission here
    console.log("Email submitted:", email);
    setEmail("");
  };

  return (
    <section className="py-20 bg-gradient-hero relative overflow-hidden">
      <div className="container mx-auto px-6 text-center relative z-10">
        <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white">
          Ready to Find Your
          <span className="block">Perfect Opposite?</span>
        </h2>
        
        <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto leading-relaxed">
          Join thousands of people who've discovered that their perfect match was their perfect opposite all along.
        </p>
        
        <div className="max-w-md mx-auto mb-8">
          <form onSubmit={handleSubmit} className="flex gap-4">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:bg-white/20"
              required
            />
            <Button type="submit" variant="magnetic" className="bg-white/20 hover:bg-white/30">
              Get Started
            </Button>
          </form>
        </div>
        
        <p className="text-white/70 text-sm mb-8">
          Free to join • No credit card required • Find your match in minutes
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/quiz">
            <Button variant="magnetic" size="lg" className="bg-white/20 hover:bg-white/30">
              Take Compatibility Quiz
            </Button>
          </Link>
          <Button variant="outline" size="lg" className="bg-white/10 border-white/30 text-white hover:bg-white/20">
            Download Our App
          </Button>
        </div>
        
      </div>
      
      {/* Background decoration */}
      <div className="absolute top-10 left-10 w-20 h-20 border border-white/20 rounded-full"></div>
      <div className="absolute bottom-10 right-10 w-32 h-32 border border-white/10 rounded-full"></div>
      <div className="absolute top-1/2 left-20 w-16 h-16 bg-white/5 rounded-full blur-xl"></div>
      <div className="absolute top-20 right-20 w-24 h-24 bg-white/5 rounded-full blur-xl"></div>
    </section>
  );
};

export default CTA;