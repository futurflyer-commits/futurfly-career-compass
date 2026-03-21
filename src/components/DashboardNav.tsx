import { Link, useLocation, useNavigate } from "react-router-dom";
import { Rocket, Search, Bell, Bot, LogOut, User } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navLinks = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "CareerNavAI", href: "/career-nav-ai" },
  { label: "SkillLab", href: "/skill-lab" },
  { label: "RoleHub", href: "/role-hub" },
  { label: "CareerSimulation", href: "/simulation" },
  { label: "Roadmap", href: "/roadmap" },
  { label: "MarketRadar", href: "/market" },
];

const mobileLinks = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "CareerNavAI", href: "/career-nav-ai" },
  { label: "Skills", href: "/skill-lab" },
  { label: "Roles", href: "/role-hub" },
  { label: "CareerSimulation", href: "/simulation" },
  { label: "MarketRadar", href: "/market" },
];

export const DashboardNav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    navigate("/register");
  };

  return (
    <>
      <header className="border-b border-border/50 bg-background/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="container flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center mr-4">
            <img src="/logo.png" alt="FuturFly Logo" className="h-10 md:h-12 object-contain" />
          </Link>
          <div className="hidden md:flex items-center gap-2 bg-input rounded-full px-4 py-2 border border-border/50 w-64">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input className="bg-transparent text-sm flex-1 outline-none placeholder:text-muted-foreground" placeholder="Search insights or roles..." />
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`transition-colors ${
                  location.pathname === link.href
                    ? "font-semibold text-foreground underline underline-offset-4 decoration-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <Bell className="h-5 w-5 text-muted-foreground" />
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-primary-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background transition-all">
                  <User className="h-4 w-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div className="px-2 py-1.5 text-xs text-muted-foreground truncate">
                  {user?.email}
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild className="cursor-pointer">
                  <Link to="/settings" className="w-full flex items-center">
                    <Bot className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleSignOut} className="text-destructive focus:bg-destructive/10 cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Mobile Bottom Nav */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-xl border-t border-border/50 z-50">
        <div className="flex justify-around py-3">
          {mobileLinks.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className={`text-xs transition-colors text-center ${
                location.pathname === item.href ? "text-primary font-semibold" : "text-muted-foreground hover:text-primary"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};
