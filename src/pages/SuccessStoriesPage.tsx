import { Card, CardContent } from "@/components/ui/card";
import { Star, Heart } from "lucide-react";

const SuccessStoriesPage = () => {
  const stories = [
    {
      couple: "Sarah & Mike",
      story: "I'm a night owl who loves spontaneous adventures, while Mike is an early bird who plans everything. At first, I thought we were too different, but our differences actually make us stronger. He helps me stay grounded, and I help him embrace spontaneity. We've been together for 2 years now!",
      image1: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face",
      image2: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
      months: 24,
      rating: 5
    },
    {
      couple: "Emma & Alex",
      story: "Emma is super logical and detail-oriented - she's a software engineer. I'm more of a creative, big-picture artist. Our different perspectives help us solve problems together in ways neither of us could alone. We balance each other perfectly.",
      image1: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face",
      image2: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
      months: 18,
      rating: 5
    },
    {
      couple: "Jessica & David",
      story: "I wake up at 5 AM for yoga and she goes to bed at 2 AM after cooking amazing meals. We thought our schedules would never work, but we found our rhythm. She makes me appreciate life's pleasures, and I help her discover the peace of morning routines.",
      image1: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=face",
      image2: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face",
      months: 15,
      rating: 5
    },
    {
      couple: "Lisa & Tom",
      story: "Lisa loves the city buzz and I prefer quiet nature spots. Instead of compromising, we explore both worlds together. Weekend city adventures followed by peaceful hikes. Our differences expanded both our horizons in the most beautiful way.",
      image1: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop&crop=face",
      image2: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop&crop=face",
      months: 30,
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Header */}
      <div className="bg-gradient-hero py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Success Stories
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Real couples who found love through their differences
          </p>
        </div>
      </div>

      {/* Stories */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto space-y-12">
            {stories.map((story, index) => (
              <Card key={index} className="overflow-hidden">
                <CardContent className="p-8">
                  <div className="flex flex-col md:flex-row gap-8 items-start">
                    {/* Images */}
                    <div className="flex-shrink-0">
                      <div className="flex items-center gap-4">
                        <img 
                          src={story.image1} 
                          alt="Partner 1"
                          className="w-20 h-20 rounded-full object-cover"
                        />
                        <Heart className="w-6 h-6 text-primary" />
                        <img 
                          src={story.image2} 
                          alt="Partner 2"
                          className="w-20 h-20 rounded-full object-cover"
                        />
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-4">
                        <h3 className="text-2xl font-bold">{story.couple}</h3>
                        <div className="flex">
                          {[...Array(story.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                          ))}
                        </div>
                      </div>
                      
                      <p className="text-muted-foreground text-lg leading-relaxed mb-4">
                        "{story.story}"
                      </p>
                      
                      <div className="text-sm text-primary font-semibold">
                        Together for {story.months} months
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-12">Our Success by the Numbers</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="text-4xl font-bold text-primary mb-2">98%</div>
              <div className="text-muted-foreground">Success Rate</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">2.5 years</div>
              <div className="text-muted-foreground">Average Relationship Length</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">15K+</div>
              <div className="text-muted-foreground">Happy Couples</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SuccessStoriesPage;