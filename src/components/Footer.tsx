import { Link } from "react-router-dom";
import { Rocket } from "lucide-react";

export const Footer = () => (
  <footer className="border-t border-white/10 bg-background py-12">
    <div className="container">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        <div>
          <Link to="/" className="flex items-center mb-6">
            <img src="/logo.png" alt="FuturFly Logo" className="h-10 md:h-12 object-contain" />
          </Link>
          <p className="text-sm text-slate-300 leading-relaxed">
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
                <Link key={label} to={href} className="text-sm text-slate-300 hover:text-primary transition-colors">
                  {label}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-xs text-slate-300">© 2026 FuturFly AI. All rights reserved.</p>
        <p className="text-xs text-slate-300">Built for Indian Tech Ecosystem</p>
      </div>
    </div>
  </footer>
);
