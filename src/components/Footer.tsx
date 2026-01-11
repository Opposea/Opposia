import { Heart, Twitter, Facebook, Instagram, Linkedin, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const quickLinks = [
    { href: "/about", label: "About Us" },
    { href: "/how-it-works", label: "How It Works" },
    { href: "/blog", label: "Blog" },
    { href: "/safety-tips", label: "Safety Tips" },
  ];

  const supportLinks = [
    { href: "/help-center", label: "Help Center" },
    { href: "/contact", label: "Contact Us" },
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Service" },
    { href: "/cookie-policy", label: "Cookie Policy" },
    { href: "/cookie-settings", label: "Cookie Settings" },
  ];

  const socialLinks = [
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
  ];

  return (
    <footer className="bg-foreground text-background">
      {/* Main Footer */}
      <div className="container mx-auto px-6 py-16 md:py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-5">
            {/* Logo */}
            <Link to="/" className="inline-flex items-center gap-2 mb-6 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-hero flex items-center justify-center group-hover:scale-105 transition-transform">
                <Heart className="w-5 h-5 text-white fill-white" />
              </div>
              <span className="text-xl font-bold tracking-tight">Opposia</span>
            </Link>
            
            <p className="text-background/60 mb-8 max-w-sm leading-relaxed">
              The dating app that celebrates connections and creates perfect chemistry. 
              Find your compatible match and discover love through meaningful relationships.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a 
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary hover:scale-105 transition-all"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="lg:col-span-3">
            <h4 className="font-semibold mb-6 text-sm uppercase tracking-wider text-background/40">
              Quick Links
            </h4>
            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link 
                    to={link.href} 
                    className="text-background/70 hover:text-background transition-colors inline-flex items-center gap-1 group"
                  >
                    {link.label}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Support Links */}
          <div className="lg:col-span-4">
            <h4 className="font-semibold mb-6 text-sm uppercase tracking-wider text-background/40">
              Support
            </h4>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-4">
              {supportLinks.map((link) => (
                <li key={link.href}>
                  <Link 
                    to={link.href} 
                    className="text-background/70 hover:text-background transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      
      {/* Bottom Bar */}
      <div className="border-t border-background/10">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-background/40 text-sm">
              © {new Date().getFullYear()} Opposia. All rights reserved.
            </p>
            <p className="text-background/40 text-sm flex items-center gap-1.5">
              Made with 
              <Heart className="w-3.5 h-3.5 text-secondary fill-secondary" /> 
              for finding love
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
