import { Star, Quote } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah & Mike",
      story: "I'm a quiet introvert who loves books, he's an adventurous extrovert who loves rock climbing. Opposites Attract showed us that our differences make us stronger together!",
      status: "Together 8 months",
      rating: 5,
      avatar: "SM"
    },
    {
      name: "Elena & James",
      story: "She's a morning person who plans everything, I'm a night owl who goes with the flow. We balance each other perfectly and couldn't be happier!",
      status: "Engaged after 1 year",
      rating: 5,
      avatar: "EJ"
    },
    {
      name: "Alex & Taylor",
      story: "Artist meets accountant - sounds impossible, right? Wrong! Our different perspectives create the most beautiful conversations and deepest connection.",
      status: "Together 2 years",
      rating: 5,
      avatar: "AT"
    }
  ];

  return (
    <section className="py-24 md:py-32 bg-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-0 w-80 h-80 bg-gradient-to-bl from-primary/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-gradient-to-tr from-secondary/10 to-transparent rounded-full blur-3xl" />
      </div>
      
      <div className="container mx-auto px-6 relative">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <span className="inline-block px-4 py-1.5 rounded-full bg-secondary/10 text-secondary text-sm font-medium mb-4">
            Success Stories
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground tracking-tight">
            Real Love <span className="text-gradient-hero">Stories</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Thousands of couples have found their perfect opposite. Here are just a few.
          </p>
        </div>
        
        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="group relative bg-card rounded-3xl p-8 transition-all duration-500 hover:-translate-y-2 border border-border/50 hover:border-primary/20 hover:shadow-elegant"
            >
              {/* Quote Icon */}
              <Quote className="w-10 h-10 text-primary/20 mb-4" />
              
              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              
              {/* Story */}
              <p className="text-foreground/80 leading-relaxed mb-6 text-[15px]">
                "{testimonial.story}"
              </p>
              
              {/* Author */}
              <div className="flex items-center gap-4 pt-6 border-t border-border">
                <div className="w-12 h-12 rounded-full bg-gradient-hero flex items-center justify-center text-white font-semibold text-sm">
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.status}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
