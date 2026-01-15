import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-dating.jpg";
import opposiaLogo from "@/assets/opposia-logo-new.png";

const Hero = () => {
  return <section aria-label="Hero section" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Gradient Overlay */}
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{
      backgroundImage: `url(${heroImage})`
    }} role="img" aria-label="Romantic couple embracing at sunset">
        <div className="absolute inset-0 bg-gradient-hero opacity-80"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 text-center text-white px-6 max-w-4xl mx-auto">
        {/* Large Logo */}
        <img src={opposiaLogo} alt="Opposia" className="w-48 md:w-64 h-auto mx-auto mb-6" />
        
        <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight drop-shadow-lg">
          <span className="text-white [text-shadow:_0_2px_10px_rgb(0_0_0_/_40%)]">We Match How You Live</span>
          <span className="block text-lg md:text-2xl font-medium mt-2 text-white/90 [text-shadow:_0_1px_8px_rgb(0_0_0_/_30%)]">
            Because compatibility is practical
          </span>
        </h1>
        
        <p className="text-lg md:text-xl mb-8 text-white/95 max-w-2xl mx-auto leading-relaxed [text-shadow:_0_1px_8px_rgb(0_0_0_/_30%)]">
          The dating app that celebrates connections and creates perfect chemistry. Find your compatible match and discover love through meaningful relationships.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link to="/quiz">
            <Button variant="magnetic" size="lg" className="text-lg px-8 py-4">
              Find Your Opposite
            </Button>
          </Link>
          <Link to="/how-it-works">
            <Button variant="outline" size="lg" className="text-lg px-8 py-4 bg-white/10 border-white/30 text-white hover:bg-white/20">
              How It Works
            </Button>
          </Link>
        </div>
        
        
      </div>
      
      {/* Floating Elements for Visual Interest */}
      <div className="absolute top-20 left-10 w-8 h-8 bg-secondary-glow rounded-full animate-pulse opacity-80 shadow-glow" aria-hidden="true"></div>
      <div className="absolute bottom-32 right-16 w-10 h-10 bg-primary-glow rounded-full animate-pulse opacity-75 delay-1000 shadow-glow" aria-hidden="true"></div>
      <div className="absolute top-1/3 right-8 w-6 h-6 bg-accent rounded-full animate-pulse opacity-85 delay-500 shadow-glow" aria-hidden="true"></div>
    </section>;
};
export default Hero;