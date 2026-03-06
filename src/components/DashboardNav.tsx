import { Link, useLocation } from "react-router-dom";
import { Rocket, Search, Bell, Bot } from "lucide-react";

const navLinks = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Co-Pilot", href: "/co-pilot" },
  { label: "Skill Lab", href: "/skill-lab" },
  { label: "Simulation", href: "/simulation" },
  { label: "Roadmap", href: "/roadmap" },
  { label: "Market", href: "/market" },
];

const mobileLinks = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Co-Pilot", href: "/co-pilot" },
  { label: "Skills", href: "/skill-lab" },
  { label: "Simulate", href: "/simulation" },
  { label: "Market", href: "/market" },
];

export const DashboardNav = () => {
  const location = useLocation();

  return (
    <>
      <header className="border-b border-border/30 bg-background/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="container flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Rocket className="h-5 w-5 text-primary" />
            <span className="font-display text-base font-bold">FuturFly</span>
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
            <Link to="/settings" className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary" />
          </div>
        </div>
      </header>

      {/* Mobile Bottom Nav */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-xl border-t border-border/30 z-50">
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
