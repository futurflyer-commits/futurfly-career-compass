import { Search, Bell, Menu, User, Bot, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface TopHeaderProps {
  onMenuClick: () => void;
}

export const TopHeader = ({ onMenuClick }: TopHeaderProps) => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    navigate("/register");
  };

  return (
    <header className="sticky top-0 z-30 h-16 w-full bg-background/80 backdrop-blur-xl border-b border-border/30 flex items-center justify-between px-4 md:px-8">
      <div className="flex items-center gap-4">
        {/* Mobile Hamburger Menu */}
        <button 
          onClick={onMenuClick}
          className="md:hidden p-2 -ml-2 rounded-md text-muted-foreground hover:bg-muted/50 transition-colors"
        >
          <Menu className="h-6 w-6" />
        </button>

        {/* Search Bar - hidden on very small screens */}
        <div className="hidden sm:flex items-center gap-2 bg-input rounded-full px-4 py-2 border border-border/50 w-64 md:w-80 group focus-within:border-aqua/50 focus-within:shadow-[0_0_10px_rgba(45,212,191,0.1)] transition-all">
          <Search className="h-4 w-4 text-muted-foreground group-focus-within:text-aqua transition-colors" />
          <input 
            className="bg-transparent text-sm flex-1 outline-none placeholder:text-muted-foreground" 
            placeholder="Search roles, skills, or insights..." 
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="relative p-2 rounded-full text-muted-foreground hover:bg-muted/50 hover:text-foreground transition-colors group">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-primary ring-2 ring-background shadow-[0_0_5px_rgba(239,68,68,0.8)]" />
        </button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="w-8 h-8 rounded-full bg-gradient-to-br from-aqua/80 to-primary/80 flex items-center justify-center text-primary-foreground focus:outline-none focus:ring-2 focus:ring-aqua focus:ring-offset-2 focus:ring-offset-background transition-all hover:scale-105 shadow-md">
              <User className="h-4 w-4" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 bg-background/95 backdrop-blur-xl border border-border/50">
            <DropdownMenuLabel className="font-display tracking-wider">My Account</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-border/30" />
            <div className="px-2 py-1.5 text-xs text-muted-foreground truncate">
              {user?.email || "user@futurfly.ai"}
            </div>
            <DropdownMenuSeparator className="bg-border/30" />
            <DropdownMenuItem asChild className="cursor-pointer hover:bg-aqua/10 focus:bg-aqua/10 focus:text-aqua transition-colors">
              <Link to="/settings" className="w-full flex items-center">
                <Bot className="mr-2 h-4 w-4" />
                <span className="font-medium">Settings & Config</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleSignOut} className="text-destructive focus:bg-destructive/10 cursor-pointer transition-colors mt-1">
              <LogOut className="mr-2 h-4 w-4" />
              <span className="font-medium">Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};
