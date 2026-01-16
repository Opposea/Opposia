import { Button } from "@/components/ui/button";
import { Link, useParams } from "react-router-dom";
import { Calendar, User, ArrowLeft, Share2 } from "lucide-react";

const blogContent: Record<string, {
  title: string;
  author: string;
  date: string;
  category: string;
  readTime: string;
  content: string[];
}> = {
  "why-opposites-attract-in-relationships": {
    title: "Why Opposites Attract in Relationships: The Science Explained",
    author: "Dr. Sarah Mitchell",
    date: "January 3, 2026",
    category: "Relationship Science",
    readTime: "5 min read",
    content: [
      "The phrase \"opposites attract\" has been a cornerstone of relationship wisdom for centuries, but is there actual science behind this common saying? Research in psychology and relationship studies suggests that yes, there are compelling reasons why people with complementary personalities often form the strongest bonds.",
      "## The Psychology of Complementary Attraction",
      "Dr. Robert Winch first proposed the theory of complementary needs in the 1950s, suggesting that we are drawn to partners who possess qualities we lack. This theory has been refined over decades of research, and modern psychologists now understand that the most successful relationships often combine both similarity and complementarity.",
      "While shared values and life goals create a foundation for lasting relationships, complementary personality traits add richness and balance. An introvert paired with an extrovert, for example, can help each other grow—the introvert learns to be more socially engaged, while the extrovert discovers the value of quiet reflection.",
      "## The Balance Theory",
      "Relationship researchers have identified what they call the \"balance theory\" of attraction. This theory suggests that we seek partners who balance our own tendencies. If you are highly organized and structured, you might be drawn to someone more spontaneous who can help you loosen up. Conversely, that spontaneous person might appreciate your ability to bring order to their life.",
      "## Why Similarity Is Not Everything",
      "While dating apps traditionally focus on matching similar people, research shows this approach has limitations. Couples who are too similar may lack the creative tension that drives growth and keeps relationships exciting. They may also share the same blind spots, making it harder to navigate challenges together.",
      "## The Opposites Attract Advantage",
      "Partners with complementary traits bring different perspectives to problem-solving, decision-making, and daily life. This diversity of thought and approach can make the relationship more resilient and adaptable. When one partner is anxious, the calmer one provides stability. When one is hesitant, the more decisive one moves things forward.",
      "## Finding Your Complement",
      "The key to successful opposite attraction is understanding which differences complement each other and which create conflict. Core values should align, but personality traits can beneficially differ. This is why our compatibility quiz at Opposia focuses on identifying complementary personality dimensions while ensuring fundamental compatibility.",
      "Ready to find someone who complements you perfectly? Take our compatibility quiz and discover your ideal opposite match today.",
    ],
  },
  "introvert-extrovert-dating": {
    title: "Introvert and Extrovert Dating: Making It Work",
    author: "James Cooper",
    date: "December 28, 2025",
    category: "Dating Tips",
    readTime: "7 min read",
    content: [
      "One of the most common examples of opposites attracting is the introvert-extrovert pairing. These relationships can be incredibly rewarding, but they require understanding and mutual respect to thrive.",
      "## Understanding the Differences",
      "Introverts recharge through solitude and quiet activities, while extroverts gain energy from social interaction. Neither approach is better—they are simply different ways of processing the world and managing energy.",
      "## Communication Is Key",
      "The foundation of any successful introvert-extrovert relationship is open communication about needs. The extrovert needs to understand that their partner is not being antisocial when they need alone time. The introvert needs to recognize that social activities are genuinely energizing for their partner.",
      "## Finding Compromise",
      "Successful couples find creative compromises. Perhaps the extrovert attends some social events alone, while the couple also hosts smaller, more intimate gatherings that the introvert enjoys. Maybe they establish quiet time after busy social weekends.",
      "## Leveraging Your Differences",
      "The beauty of this pairing is how each partner expands the other's world. The extrovert introduces their introverted partner to new people and experiences. The introvert helps their extroverted partner discover the joys of deeper one-on-one connections and peaceful moments.",
      "## Tips for Introverts Dating Extroverts",
      "Be clear about your needs without apologizing for them. Appreciate that your partner's social nature is not a rejection of spending time with you. Try to step out of your comfort zone occasionally—you might surprise yourself.",
      "## Tips for Extroverts Dating Introverts",
      "Do not take your partner's need for solitude personally. Create space for them to recharge. Appreciate the depth and thoughtfulness they bring to your conversations and relationship.",
      "## The Perfect Balance",
      "When introvert-extrovert couples find their rhythm, they often report being happier than couples who share the same social style. They balance each other beautifully, creating a relationship that has both depth and breadth, quiet moments and exciting adventures.",
    ],
  },
  "complementary-personalities-marriage": {
    title: "How Complementary Personalities Lead to Happier Marriages",
    author: "Dr. Emily Chen",
    date: "December 20, 2025",
    category: "Relationship Science",
    readTime: "6 min read",
    content: [
      "Long-term relationship research has revealed something surprising: couples with complementary rather than identical personalities often report higher satisfaction in marriage. Here is why balance matters more than similarity.",
      "## The Research Says",
      "A landmark study following couples over 20 years found that those with complementary personality traits—where one partner's strengths offset the other's weaknesses—showed greater relationship stability and satisfaction than couples who were highly similar.",
      "## Why Complementary Works",
      "When partners have different strengths, they naturally divide responsibilities in ways that play to each person's abilities. One might handle finances while the other manages social planning. One might be the emotional anchor while the other drives practical decisions.",
      "## Avoiding the Echo Chamber",
      "Couples who are too similar may reinforce each other's biases and blind spots. Complementary partners challenge each other's perspectives, leading to better decision-making and personal growth.",
      "## The Growth Factor",
      "Being with someone different from you pushes you to develop new skills and perspectives. This personal growth is one of the greatest gifts a relationship can offer, and it is more common in complementary pairings.",
      "## Conflict Resolution Benefits",
      "While complementary couples may have more initial disagreements, they often develop stronger conflict resolution skills. Their different approaches mean they bring varied problem-solving strategies to challenges.",
      "## Making It Work Long-Term",
      "The key is appreciating differences rather than trying to change your partner. Successful complementary couples learn to see their partner's different approach as valuable rather than wrong.",
      "## Finding Your Complement",
      "If you are looking for a lasting relationship, consider seeking someone whose personality complements yours. The initial adjustment may require more effort, but the long-term rewards are worth it.",
    ],
  },
  "opposites-attract-dating-tips": {
    title: "Dating Someone Different From You: 10 Essential Tips",
    author: "Michael Torres",
    date: "December 15, 2025",
    category: "Dating Tips",
    readTime: "8 min read",
    content: [
      "Dating someone with a complementary personality can be one of life's most rewarding experiences—but it requires some adjustment. Here are 10 essential tips for making opposite attraction work.",
      "## 1. Embrace Curiosity Over Judgment",
      "When your partner does something differently than you would, approach it with curiosity rather than criticism. Ask questions to understand their perspective rather than assuming your way is correct.",
      "## 2. Communicate Your Needs Clearly",
      "Do not expect your partner to automatically understand your needs—they process the world differently. Be explicit about what you need and invite them to do the same.",
      "## 3. Find Common Ground",
      "While you may have different personalities, identify shared values and interests. These become the foundation of your connection while your differences add spice.",
      "## 4. Appreciate Their Strengths",
      "Your partner's different approach brings skills and perspectives you lack. Recognize and appreciate what they contribute to the relationship.",
      "## 5. Be Patient",
      "Adjusting to a partner who operates differently takes time. Give yourself and your relationship the space to find your rhythm.",
      "## 6. Create Rituals That Honor Both Personalities",
      "Design relationship rituals that work for both of you. If one is a homebody and one loves going out, alternate between quiet date nights and social adventures.",
      "## 7. Learn Their Love Language",
      "Different personalities often have different love languages. Discover how your partner gives and receives love, even if it is different from your own preference.",
      "## 8. Give Each Other Space",
      "Respect that your partner may need different things to feel balanced. Allow space for individual activities and interests.",
      "## 9. Turn Conflicts Into Learning Opportunities",
      "When differences cause friction, use it as a chance to understand each other better rather than a reason to pull apart.",
      "## 10. Celebrate Your Differences",
      "Regularly acknowledge how your different personalities make your relationship stronger and more interesting.",
    ],
  },
  "personality-compatibility-quiz-guide": {
    title: "Understanding Your Personality Compatibility Quiz Results",
    author: "Lisa Anderson",
    date: "December 10, 2025",
    category: "App Guide",
    readTime: "4 min read",
    content: [
      "You have taken the Opposites Attract compatibility quiz—now what? Here is a guide to understanding your results and using them to find your perfect match.",
      "## What We Measure",
      "Our quiz assesses several key personality dimensions: introversion/extroversion, thinking style, planning preferences, emotional expression, and adventure orientation. Each dimension is scored on a spectrum.",
      "## Understanding Your Profile",
      "Your results show where you fall on each spectrum. There is no good or bad score—each position has its strengths. The goal is not to label you but to understand your natural tendencies.",
      "## How Matching Works",
      "We match you with people who complement your profile. If you score high on introversion, we might match you with someone more extroverted—not at the extreme opposite, but balanced enough to bring new energy to your life.",
      "## Compatibility Is Not About Extremes",
      "The best matches are not complete opposites but complementary. We look for profiles that balance yours while maintaining enough common ground for connection.",
      "## Using Your Results",
      "Review your profile to understand yourself better. When you meet matches, pay attention to how their different qualities complement yours. Notice where the balance feels energizing versus challenging.",
      "## Growth Opportunities",
      "Your results can highlight areas for personal growth. A very high planning score might indicate an opportunity to practice spontaneity. Use your results as a self-improvement roadmap as well as a matching tool.",
    ],
  },
  "successful-opposite-couples": {
    title: "5 Famous Couples Who Prove Opposites Attract",
    author: "Rachel Green",
    date: "December 5, 2025",
    category: "Inspiration",
    readTime: "5 min read",
    content: [
      "From Hollywood to history, some of the most enduring relationships have been between people with dramatically different personalities. Here are five famous couples who prove that opposites truly attract.",
      "## 1. Barack and Michelle Obama",
      "Barack, known for his calm, measured approach, found his perfect complement in Michelle's more direct, assertive personality. Their different styles have created a powerful partnership that balances thoughtfulness with action.",
      "## 2. John Lennon and Yoko Ono",
      "The dreamy, sometimes scattered artist found grounding in Yoko's more business-minded, practical approach. Their different perspectives fueled creative collaboration and a lasting love.",
      "## 3. David and Victoria Beckham",
      "The laid-back footballer and the driven, fashion-forward Spice Girl might seem like an unlikely pair, but their complementary personalities have sustained one of celebrity culture's longest-lasting marriages.",
      "## 4. Chip and Joanna Gaines",
      "The spontaneous, joke-cracking Chip balances perfectly with the organized, design-focused Joanna. Their renovation empire was built on their ability to leverage their different strengths.",
      "## 5. Freddie Mercury and Mary Austin",
      "Though their romantic relationship eventually transformed into a deep friendship, Freddie's flamboyant extroversion and Mary's quiet steadiness created a bond that lasted until his death.",
      "## What They Teach Us",
      "These couples show that success comes not from finding your twin but from finding someone whose strengths complement your weaknesses and whose differences challenge you to grow.",
    ],
  },
};

const BlogPostPage = () => {
  const { postId } = useParams<{ postId: string }>();
  const post = postId ? blogContent[postId] : null;

  if (!post) {
    return (
      <div className="min-h-screen bg-background pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Article Not Found</h1>
          <Link to="/blog">
            <Button variant="magnetic">Back to Blog</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Header */}
      <div className="bg-gradient-hero py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <Link to="/blog" className="text-white/80 hover:text-white inline-flex items-center gap-2 mb-6">
              <ArrowLeft className="w-4 h-4" /> Back to Blog
            </Link>
            <span className="text-white/80 text-sm font-medium">{post.category}</span>
            <h1 className="text-3xl md:text-5xl font-bold text-white mt-2 mb-6">
              {post.title}
            </h1>
            <div className="flex items-center gap-6 text-white/80">
              <span className="flex items-center gap-2">
                <User className="w-4 h-4" />
                {post.author}
              </span>
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {post.date}
              </span>
              <span>{post.readTime}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <article className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto prose prose-lg">
            {post.content.map((paragraph, index) => {
              if (paragraph.startsWith("## ")) {
                return (
                  <h2 key={index} className="text-2xl font-bold text-foreground mt-8 mb-4">
                    {paragraph.replace("## ", "")}
                  </h2>
                );
              }
              return (
                <p key={index} className="text-muted-foreground mb-4 leading-relaxed">
                  {paragraph}
                </p>
              );
            })}
          </div>
        </div>
      </article>

      {/* Share */}
      <section className="py-8 border-t">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto flex items-center justify-between">
            <Link to="/blog" className="text-primary hover:underline inline-flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" /> More Articles
            </Link>
            <Button variant="outline" className="gap-2">
              <Share2 className="w-4 h-4" /> Share Article
            </Button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-hero text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to see who you're compatible with?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Take our compatibility quiz and start your journey today.
          </p>
          <Link to="/quiz">
            <Button variant="magnetic" size="lg">
              Take the Quiz
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default BlogPostPage;
