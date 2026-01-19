import { Card, CardContent } from "@/components/ui/card";
import { CalendarCheck, ClipboardList, MessagesSquare } from "lucide-react";

const steps = [
  {
    title: "Set Weekly Rhythm",
    description:
      "Pick who handles cooking, planning, or errands and align on the cadence that feels natural for both of you.",
    icon: <CalendarCheck className="h-6 w-6" />,
  },
  {
    title: "Task Style Preferences",
    description:
      "Capture how you each like to tackle responsibilities—quick bursts, deep focus, or shared sessions.",
    icon: <ClipboardList className="h-6 w-6" />,
  },
  {
    title: "Talk It Through",
    description:
      "Conversation prompts help you build a relationship operating system that keeps expectations clear.",
    icon: <MessagesSquare className="h-6 w-6" />,
  },
];

const RoutinePlanner = () => {
  return (
    <section aria-labelledby="routine-planner-heading" className="py-16 sm:py-20">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] items-center">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-primary/70 font-semibold mb-3">
              Feature Spotlight
            </p>
            <h2
              id="routine-planner-heading"
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4"
            >
              Shared Routine & Task Planning
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-8">
              Turn complementary life skills into a simple plan. Build routines that reduce friction and help both partners
              feel supported.
            </p>

            <div className="space-y-4">
              {steps.map((step) => (
                <div key={step.title} className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-full bg-gradient-hero text-white flex items-center justify-center shadow-sm">
                    {step.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">{step.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Card className="border-border/50 bg-gradient-to-br from-background via-background to-primary/5 shadow-elegant">
            <CardContent className="p-8">
              <p className="text-sm uppercase tracking-[0.3em] text-primary/70 font-semibold mb-4">
                Your Balance Plan
              </p>
              <div className="space-y-6">
                <div className="rounded-xl border border-border/60 p-4 bg-background/70">
                  <p className="text-sm font-semibold text-foreground">Daily flow</p>
                  <p className="text-muted-foreground text-sm mt-1">
                    You handle morning routines and planning. They take lead on meals and evening wind-downs.
                  </p>
                </div>
                <div className="rounded-xl border border-border/60 p-4 bg-background/70">
                  <p className="text-sm font-semibold text-foreground">Weekly sync</p>
                  <p className="text-muted-foreground text-sm mt-1">
                    Share calendars on Sundays and align on shared chores, errands, and downtime.
                  </p>
                </div>
                <div className="rounded-xl border border-border/60 p-4 bg-background/70">
                  <p className="text-sm font-semibold text-foreground">Communication style</p>
                  <p className="text-muted-foreground text-sm mt-1">
                    Quick check-ins for logistics, deeper talks for big decisions.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default RoutinePlanner;
