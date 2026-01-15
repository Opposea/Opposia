import { Heart, Twitter, Facebook, Instagram, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import opposiaLogo from "@/assets/opposia-logo.jpg";
const Footer = () => {
  return <footer className="bg-foreground text-background py-16">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <img src={opposiaLogo} alt="Opposia" className="h-12 w-auto" />
              
              
            </div>
            <p className="text-background/70 mb-6 max-w-md leading-relaxed">
              We match how you live — because compatibility is practical. 
              Find your compatible match and discover love through meaningful relationships.
            </p>
            <div className="flex gap-4">
              <Twitter className="w-6 h-6 text-background/60 hover:text-secondary cursor-pointer transition-colors" />
              <Facebook className="w-6 h-6 text-background/60 hover:text-secondary cursor-pointer transition-colors" />
              <Instagram className="w-6 h-6 text-background/60 hover:text-secondary cursor-pointer transition-colors" />
              <Linkedin className="w-6 h-6 text-background/60 hover:text-secondary cursor-pointer transition-colors" />
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-6 text-lg">Quick Links</h4>
            <ul className="space-y-3">
              <li><a href="/about" className="text-background/70 hover:text-background transition-colors">About Us</a></li>
              <li><a href="/how-it-works" className="text-background/70 hover:text-background transition-colors">How It Works</a></li>
              <li><a href="/blog" className="text-background/70 hover:text-background transition-colors">Blog</a></li>
              
              <li><a href="/safety-tips" className="text-background/70 hover:text-background transition-colors">Safety Tips</a></li>
            </ul>
          </div>
          
          {/* Support */}
          <div>
            <h4 className="font-semibold mb-6 text-lg">Support</h4>
            <ul className="space-y-3">
              <li><a href="/help-center" className="text-background/70 hover:text-background transition-colors">Help Center</a></li>
              <li><a href="/contact" className="text-background/70 hover:text-background transition-colors">Contact Us</a></li>
              <li><a href="/privacy" className="text-background/70 hover:text-background transition-colors">Privacy Policy</a></li>
              <li><a href="/terms" className="text-background/70 hover:text-background transition-colors">Terms of Service</a></li>
              <li><a href="/safety-moderation-policy" className="text-background/70 hover:text-background transition-colors">Safety & Moderation Policy</a></li>
              <li><a href="/refund-policy" className="text-background/70 hover:text-background transition-colors">Refund Policy</a></li>
              <li><a href="/cookie-policy" className="text-background/70 hover:text-background transition-colors">Cookie Policy</a></li>
              <li><a href="/cookie-settings" className="text-background/70 hover:text-background transition-colors">Cookie Settings</a></li>
            </ul>
          </div>
        </div>
        
        
        {/* Bottom */}
        <div className="border-t border-background/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-background/60 text-sm">
            © 2026 Opposia Ltd. All rights reserved.
          </p>
          <p className="text-background/60 text-sm flex items-center gap-1">
            Made with <Heart className="w-4 h-4 text-secondary fill-secondary" /> for finding love
          </p>
        </div>
      </div>
    </footer>;
};
export default Footer;