import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Eye, MessageSquare, Heart, AlertTriangle, CheckCircle } from "lucide-react";

const SafetyTipsPage = () => {
  const safetyTips = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Profile Verification",
      description: "Always verify your matches through our photo verification system. Look for the blue checkmark on verified profiles.",
      tips: [
        "Complete your own profile verification",
        "Only connect with verified profiles",
        "Report suspicious or unverified accounts"
      ]
    },
    {
      icon: <MessageSquare className="w-8 h-8" />,
      title: "Safe Communication",
      description: "Keep conversations on our platform until you feel comfortable. Never share personal information too early.",
      tips: [
        "Avoid sharing phone numbers initially",
        "Don't give out your address or workplace",
        "Use our in-app video chat feature first"
      ]
    },
    {
      icon: <Eye className="w-8 h-8" />,
      title: "First Meeting Guidelines",
      description: "When you're ready to meet, always choose public places and let someone know your plans.",
      tips: [
        "Meet in busy, public locations",
        "Tell a friend about your date plans",
        "Drive yourself or use your own transportation"
      ]
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Trust Your Instincts",
      description: "If something feels off, trust your gut. It's better to be cautious than sorry.",
      tips: [
        "Don't ignore red flags",
        "Take things at your own pace",
        "Block users who make you uncomfortable"
      ]
    }
  ];

  const redFlags = [
    "Asks for money or financial information",
    "Refuses to video chat or talk on the phone",
    "Has very few photos or photos that seem too professional",
    "Professes love very quickly",
    "Asks for personal information immediately",
    "Stories don't add up or keep changing"
  ];

  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Header */}
      <div className="bg-gradient-hero py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Safety First
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Your safety is our priority. Learn how to stay safe while finding your perfect match.
          </p>
        </div>
      </div>

      {/* Safety Tips */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Essential Safety Tips</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {safetyTips.map((tip, index) => (
              <Card key={index} className="h-full">
                <CardHeader>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="text-primary">{tip.icon}</div>
                    <CardTitle className="text-xl">{tip.title}</CardTitle>
                  </div>
                  <p className="text-muted-foreground">{tip.description}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {tip.tips.map((tipItem, tipIndex) => (
                      <li key={tipIndex} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                        <span className="text-sm">{tipItem}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Red Flags */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <h2 className="text-3xl font-bold mb-4">Red Flags to Watch Out For</h2>
              <p className="text-muted-foreground">
                Be aware of these warning signs that might indicate someone is not genuine or safe to meet.
              </p>
            </div>
            
            <Card>
              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 gap-4">
                  {redFlags.map((flag, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <AlertTriangle className="w-4 h-4 text-red-500 mt-1 flex-shrink-0" />
                      <span className="text-sm">{flag}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Emergency */}
      <section className="py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Need Help?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            If you feel unsafe or need to report someone, we're here to help 24/7.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Card className="p-6">
              <h3 className="font-bold mb-2">Report a User</h3>
              <p className="text-sm text-muted-foreground">
                Use the report button on any profile or conversation
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="font-bold mb-2">24/7 Support</h3>
              <p className="text-sm text-muted-foreground">
                Contact our safety team anytime at safety@oppositesattract.com
              </p>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SafetyTipsPage;