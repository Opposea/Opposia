import Hero from "@/components/Hero";
import Features from "@/components/Features";
import CompatibilityInsights from "@/components/CompatibilityInsights";
import RoutinePlanner from "@/components/RoutinePlanner";
import Testimonials from "@/components/Testimonials";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen pt-20">
      <Hero />
      <Features />
      <CompatibilityInsights />
      <RoutinePlanner />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  );
};

export default Index;
