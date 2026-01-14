import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
const Testimonials = () => {
  const testimonials = [{
    name: "Sarah & Mike",
    story: "I'm a quiet introvert who loves books, he's an adventurous extrovert who loves rock climbing. Opposia showed us that our differences make us stronger together!",
    months: "Together 8 months",
    rating: 5
  }, {
    name: "Elena & James",
    story: "She's a morning person who plans everything, I'm a night owl who goes with the flow. We balance each other perfectly and couldn't be happier!",
    months: "Engaged after 1 year",
    rating: 5
  }, {
    name: "Alex & Taylor",
    story: "Artist meets accountant - sounds impossible, right? Wrong! Our different perspectives create the most beautiful conversations and deepest connection.",
    months: "Together 2 years",
    rating: 5
  }];
  return <section className="py-20 bg-gradient-subtle">
      <div className="container mx-auto px-6">
        
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => <Card key={index} className="bg-card/50 backdrop-blur-sm border-border/50 hover:shadow-warm transition-magnetic group">
              
            </Card>)}
        </div>
      </div>
    </section>;
};
export default Testimonials;