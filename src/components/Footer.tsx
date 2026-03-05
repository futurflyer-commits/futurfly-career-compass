import { Link } from "react-router-dom";
import { Rocket } from "lucide-react";

export const Footer = () => (
  <footer className="border-t border-border/30 bg-background py-12">
    <div className="container">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        <div>
          <Link to="/" className="flex items-center gap-2 mb-3">
            <Rocket className="h-5 w-5 text-primary" />
            <span className="font-display text-base font-bold">FuturFly</span>
          </Link>
          <p className="text-sm text-muted-foreground leading-relaxed">
            AI-native career intelligence for the next generation of tech leaders.
          </p>
        </div>
        {[
          { title: "Product", links: [["Career Paths", "/roadmap"], ["Assessments", "/assessment"], ["Insights", "/market"]] },
          { title: "Company", links: [["About Us", "#"], ["Contact", "#"], ["Privacy", "#"]] },
          { title: "Social", links: [["Twitter", "#"], ["LinkedIn", "#"]] },
        ].map((col) => (
          <div key={col.title}>
            <h4 className="text-sm font-semibold text-foreground mb-3">{col.title}</h4>
            <div className="flex flex-col gap-2">
              {col.links.map(([label, href]) => (
                <Link key={label} to={href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {label}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="border-t border-border/30 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-xs text-muted-foreground">© 2026 FuturFly AI. All rights reserved.</p>
        <p className="text-xs text-muted-foreground">Built for Indian Tech Ecosystem</p>
      </div>
    </div>
  </footer>
);
