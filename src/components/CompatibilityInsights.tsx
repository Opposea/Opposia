import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, Scale, BadgeCheck } from "lucide-react";

const insights = [
  {
    icon: <Sparkles className="h-6 w-6" />,
    title: "Compatibility Breakdown",
    description:
      "See which life skills sync best—like planning, finances, or home care—with a clear percentage score.",
  },
  {
    icon: <Scale className="h-6 w-6" />,
    title: "Life Balance Gauge",
    description:
      "A visual balance meter shows how your strengths complement theirs, so you know where you naturally support each other.",
  },
  {
    icon: <BadgeCheck className="h-6 w-6" />,
    title: "Explainable Matches",
    description:
      "Every match comes with a quick summary of why you fit—no black box, just transparent compatibility.",
  },
];

const CompatibilityInsights = () => {
  return (
    <section
      aria-labelledby="compatibility-insights-heading"
      className="py-16 sm:py-20 bg-muted/30"
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 sm:mb-14">
          <p className="text-sm uppercase tracking-[0.3em] text-primary/70 font-semibold mb-3">
            Feature Spotlight
          </p>
          <h2
            id="compatibility-insights-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4"
          >
            Compatibility Explainability
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto">
            Understand exactly why a match works with a life balance summary built around your everyday strengths.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {insights.map((item) => (
            <Card
              key={item.title}
              className="border-border/50 bg-background/80 shadow-sm hover:shadow-elegant transition-smooth"
            >
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-gradient-hero text-white flex items-center justify-center mb-4">
                  {item.icon}
                </div>
                <CardTitle className="text-xl text-foreground">{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CompatibilityInsights;
