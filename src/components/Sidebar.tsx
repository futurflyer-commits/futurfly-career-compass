import { Link, useLocation } from "react-router-dom";
import { 
  Rocket, LayoutDashboard, BrainCircuit, Microscope, 
  Briefcase, Compass, Map, LineChart, X 
} from "lucide-react";
import { useEffect } from "react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navSections = [
  {
    title: "Core",
    items: [
      { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
      { label: "CareerNav AI", href: "/career-nav-ai", icon: BrainCircuit },
      { label: "Skill Matrix", href: "/skill-lab", icon: Microscope },
    ]
  },
  {
    title: "Career Intelligence",
    items: [
      { label: "Role Hub", href: "/role-hub", icon: Briefcase },
      { label: "Career Simulation", href: "/simulation", icon: Compass },
      { label: "Roadmap", href: "/roadmap", icon: Map },
      { label: "Market Radar", href: "/market", icon: LineChart },
    ]
  }
];

export const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const location = useLocation();

  // Close sidebar on mobile when route changes
  useEffect(() => {
    onClose();
  }, [location.pathname, onClose]);

  const navContent = (
    <>
      <div className="flex items-center justify-between h-16 px-6 shrink-0">
        <Link to="/" className="flex items-center transition-transform hover:scale-105 py-2">
          <img src="/logo.png" alt="FuturFly Logo" className="h-10 md:h-12 object-contain drop-shadow-md" />
        </Link>
        <button 
          onClick={onClose} 
          className="md:hidden p-2 rounded-md justify-center flex items-center text-muted-foreground hover:bg-muted/50 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-6 custom-scrollbar">
        {navSections.map((section, idx) => (
          <div key={section.title} className={idx > 0 ? "mt-8" : ""}>
            <p className="px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground mb-3 opacity-80">
              {section.title}
            </p>
            <div className="space-y-1">
              {section.items.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group relative overflow-hidden ${
                      isActive 
                        ? "text-foreground bg-aqua/10 border border-aqua/20 shadow-[inset_0_0_15px_rgba(45,212,191,0.05)]" 
                        : "text-muted-foreground border border-transparent hover:text-foreground hover:bg-muted/40"
                    }`}
                  >
                    {isActive && (
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-aqua rounded-r-md shadow-[0_0_10px_rgba(45,212,191,0.8)]" />
                    )}
                    <item.icon className={`h-4 w-4 transition-colors ${isActive ? "text-aqua" : "group-hover:text-foreground"}`} />
                    <span className="tracking-wide">{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      
      {/* Bottom Promo/Upgrade Section */}
      <div className="p-4 shrink-0">
        <div className="rounded-xl border border-aqua/20 bg-gradient-to-b from-aqua/5 to-transparent p-4 text-center group cursor-pointer hover:border-aqua/40 transition-colors relative overflow-hidden">
          <div className="absolute inset-0 bg-aqua/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          <p className="text-xs font-bold text-foreground mb-1">PRO Access</p>
          <p className="text-[10px] text-muted-foreground mb-3">Unlock deeper analytics</p>
          <button className="w-full py-2 rounded-lg bg-aqua/10 text-aqua text-[10px] font-bold uppercase tracking-wider hover:bg-aqua hover:text-background transition-colors">
            Upgrade
          </button>
        </div>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile Drawer Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden" 
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 w-[260px] bg-background/95 backdrop-blur-xl border-r border-border/50 flex flex-col transition-transform duration-300 ease-in-out md:translate-x-0 ${
          isOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"
        }`}
      >
        {navContent}
      </aside>
    </>
  );
};
