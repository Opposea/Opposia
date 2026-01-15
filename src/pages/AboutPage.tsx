import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Heart, Users, Shield, Sparkles } from "lucide-react";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Header */}
      <div className="bg-gradient-hero py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            About Opposia
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            We match how you live. The dating app that celebrates differences and creates lasting connections.
          </p>
        </div>
      </div>

      {/* Our Story */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-8">Our Story</h2>
            
            <div className="prose prose-lg max-w-none text-muted-foreground space-y-6">
              <p>
                Opposia was founded on a simple but powerful observation: the most successful relationships often bring together people with complementary personalities, not identical ones. While traditional dating apps focus on matching people who are similar, we took a different approach.
              </p>
              
              <p>
                Our team of relationship experts, psychologists, and technologists came together to create an algorithm that understands the nuances of personality compatibility. We believe that an introvert and an extrovert, a planner and a spontaneous adventurer, or a dreamer and a pragmatist can create something beautiful together—filling in each other's gaps and growing through their differences.
              </p>
              
              <p>
                Since our launch, thousands of couples have found meaningful connections through Opposia. Our success stories speak for themselves: partners who challenge each other, complement each other, and build stronger relationships because of their differences, not despite them.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-foreground mb-12 text-center">Our Values</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div className="bg-card p-6 rounded-lg border text-center">
              <Heart className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-3">Authentic Connections</h3>
              <p className="text-muted-foreground">
                We prioritize genuine compatibility over superficial matches, helping you find someone who truly complements your personality.
              </p>
            </div>
            
            <div className="bg-card p-6 rounded-lg border text-center">
              <Users className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-3">Celebrating Differences</h3>
              <p className="text-muted-foreground">
                We believe diversity in relationships creates strength. Opposites don't just attract—they thrive together.
              </p>
            </div>
            
            <div className="bg-card p-6 rounded-lg border text-center">
              <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-3">Safety First</h3>
              <p className="text-muted-foreground">
                Your security is our priority. We verify profiles and provide tools to ensure a safe dating experience.
              </p>
            </div>
            
            <div className="bg-card p-6 rounded-lg border text-center">
              <Sparkles className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-3">Science-Backed Matching</h3>
              <p className="text-muted-foreground">
                Our algorithm is built on psychological research about complementary personalities and relationship success.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Science */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-8">The Science Behind Opposia</h2>
            
            <div className="prose prose-lg max-w-none text-muted-foreground space-y-6">
              <p>
                Research in relationship psychology has consistently shown that while some similarities are important (shared values, life goals), complementary personality traits often lead to more satisfying long-term relationships. This is because partners with different strengths can support each other in areas where the other may struggle.
              </p>
              
              <p>
                Our compatibility quiz measures key personality dimensions including introversion/extroversion, thinking styles, planning preferences, and emotional expression. We then use these insights to match you with someone whose traits complement yours, creating a balanced and dynamic partnership.
              </p>
              
              <p>
                The "opposites attract" phenomenon isn't just a saying—it's backed by decades of research into what makes relationships work. When two people bring different perspectives to a relationship, they challenge each other to grow, see the world differently, and become better versions of themselves.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-hero text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Find Your Opposite?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Take our compatibility quiz and discover the person who complements you perfectly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/quiz">
              <Button variant="magnetic" size="lg" className="text-lg px-8">
                Take the Quiz
              </Button>
            </Link>
            <Link to="/how-it-works">
              <Button variant="outline" size="lg" className="text-lg px-8 bg-white/10 border-white/30 text-white hover:bg-white/20">
                Learn How It Works
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
