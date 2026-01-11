import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Heart, User, LogOut, Menu, X } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useState, useEffect } from 'react';

const Navigation = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Error in handleSignOut:', error);
    }
  };

  const navLinks = [
    { to: '/about', label: 'About' },
    { to: '/blog', label: 'Blog' },
    { to: '/how-it-works', label: 'How It Works' },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled || !isHomePage
          ? 'bg-background/80 backdrop-blur-xl border-b border-border shadow-sm' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link 
          to="/" 
          className="flex items-center gap-2 group" 
          aria-label="Opposia home"
        >
          <div className={`w-10 h-10 rounded-xl bg-gradient-hero flex items-center justify-center shadow-magnetic transition-transform group-hover:scale-105`}>
            <Heart className="w-5 h-5 text-white fill-white" />
          </div>
          <span className={`text-xl font-bold tracking-tight transition-colors ${
            scrolled || !isHomePage ? 'text-foreground' : 'text-white'
          }`}>
            Opposia
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link 
              key={link.to}
              to={link.to} 
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                scrolled || !isHomePage
                  ? 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Auth Section */}
        <div className="flex items-center gap-3">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  className={`relative h-10 w-10 rounded-full ${
                    scrolled || !isHomePage ? '' : 'hover:bg-white/10'
                  }`}
                  aria-label="User menu"
                >
                  <Avatar className="h-10 w-10 border-2 border-primary/20">
                    <AvatarFallback className="bg-gradient-hero text-white font-semibold">
                      {user.email?.charAt(0).toUpperCase() || 'U'}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 rounded-xl p-2" align="end" forceMount>
                <DropdownMenuItem asChild className="rounded-lg cursor-pointer">
                  <Link to="/profile" className="flex w-full py-2">
                    <User className="mr-3 h-4 w-4" />
                    <span>My Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="rounded-lg cursor-pointer">
                  <Link to="/quiz" className="flex w-full py-2">
                    <Heart className="mr-3 h-4 w-4" />
                    <span>Take Quiz</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <div className="px-2 py-2">
                  <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut} className="rounded-lg cursor-pointer text-destructive focus:text-destructive">
                  <LogOut className="mr-3 h-4 w-4" />
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Button 
                asChild 
                variant="ghost"
                className={`hidden sm:inline-flex rounded-full ${
                  scrolled || !isHomePage 
                    ? 'text-foreground hover:bg-muted' 
                    : 'text-white hover:bg-white/10'
                }`}
              >
                <Link to="/auth">Sign In</Link>
              </Button>
              <Button 
                asChild 
                className="rounded-full bg-gradient-hero hover:opacity-90 shadow-magnetic"
              >
                <Link to="/auth">Get Started</Link>
              </Button>
            </div>
          )}

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className={`md:hidden rounded-full ${
              scrolled || !isHomePage ? '' : 'text-white hover:bg-white/10'
            }`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-xl border-b border-border p-4">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-3 rounded-xl text-foreground hover:bg-muted font-medium transition-colors"
              >
                {link.label}
              </Link>
            ))}
            {!user && (
              <Link
                to="/auth"
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-3 rounded-xl text-foreground hover:bg-muted font-medium transition-colors sm:hidden"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
