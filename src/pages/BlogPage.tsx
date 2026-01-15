import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Calendar, User, ArrowRight } from "lucide-react";

const blogPosts = [
  {
    id: "why-opposites-attract-in-relationships",
    title: "Why Opposites Attract in Relationships: The Science Explained",
    excerpt: "Discover the psychological research behind why complementary personalities often create the strongest, most lasting relationships.",
    author: "Dr. Sarah Mitchell",
    date: "January 3, 2026",
    category: "Relationship Science",
    readTime: "5 min read",
  },
  {
    id: "introvert-extrovert-dating",
    title: "Introvert and Extrovert Dating: Making It Work",
    excerpt: "Learn how introverts and extroverts can build amazing relationships by leveraging their differences as strengths.",
    author: "James Cooper",
    date: "December 28, 2025",
    category: "Dating Tips",
    readTime: "7 min read",
  },
  {
    id: "complementary-personalities-marriage",
    title: "How Complementary Personalities Lead to Happier Marriages",
    excerpt: "Research shows that couples with complementary traits report higher satisfaction. Here is why balance matters more than similarity.",
    author: "Dr. Emily Chen",
    date: "December 20, 2025",
    category: "Relationship Science",
    readTime: "6 min read",
  },
  {
    id: "opposites-attract-dating-tips",
    title: "Dating Someone Different From You: 10 Essential Tips",
    excerpt: "Practical advice for navigating a relationship with someone whose personality complements rather than mirrors yours.",
    author: "Michael Torres",
    date: "December 15, 2025",
    category: "Dating Tips",
    readTime: "8 min read",
  },
  {
    id: "personality-compatibility-quiz-guide",
    title: "Understanding Your Personality Compatibility Quiz Results",
    excerpt: "A deep dive into what your Opposites Attract quiz results mean and how to use them to find your perfect match.",
    author: "Lisa Anderson",
    date: "December 10, 2025",
    category: "App Guide",
    readTime: "4 min read",
  },
  {
    id: "successful-opposite-couples",
    title: "5 Famous Couples Who Prove Opposites Attract",
    excerpt: "From Hollywood to history, these couples show how different personalities can create unbreakable bonds.",
    author: "Rachel Green",
    date: "December 5, 2025",
    category: "Inspiration",
    readTime: "5 min read",
  },
];

const BlogPage = () => {
  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Header */}
      <div className="bg-gradient-hero py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Opposia Blog
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Insights, tips, and stories about matching how you live.
          </p>
        </div>
      </div>

      {/* Featured Post */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">Featured Article</span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
              {blogPosts[0].title}
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              {blogPosts[0].excerpt}
            </p>
            <div className="flex items-center gap-6 text-sm text-muted-foreground mb-6">
              <span className="flex items-center gap-2">
                <User className="w-4 h-4" />
                {blogPosts[0].author}
              </span>
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {blogPosts[0].date}
              </span>
              <span>{blogPosts[0].readTime}</span>
            </div>
            <Link to={`/blog/${blogPosts[0].id}`}>
              <Button variant="magnetic" className="gap-2">
                Read Article <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-6">
          <h2 className="text-2xl font-bold text-foreground mb-8">Latest Articles</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.slice(1).map((post) => (
              <article key={post.id} className="bg-card rounded-lg border overflow-hidden hover:shadow-lg transition-shadow">
                <div className="p-6">
                  <span className="text-primary text-sm font-medium">{post.category}</span>
                  <h3 className="text-xl font-semibold text-foreground mt-2 mb-3 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>{post.date}</span>
                    <span>{post.readTime}</span>
                  </div>
                </div>
                <div className="px-6 pb-6">
                  <Link to={`/blog/${post.id}`} className="text-primary font-medium hover:underline inline-flex items-center gap-1">
                    Read more <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Stay Updated on Love & Relationships
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Get the latest articles on dating, relationships, and finding your perfect opposite delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Button variant="magnetic">Subscribe</Button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-hero text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Find Your Opposite?
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

export default BlogPage;
