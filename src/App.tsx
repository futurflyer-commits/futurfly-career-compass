import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Assessment from "./pages/Assessment";
import Persona from "./pages/Persona";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Simulation from "./pages/Simulation";
import Roadmap from "./pages/Roadmap";
import Market from "./pages/Market";
import SkillLab from "./pages/SkillLab";
import Pricing from "./pages/Pricing";
import Settings from "./pages/Settings";
import CoPilot from "./pages/CoPilot";
import RoleHub from "./pages/RoleHub";
import RoleDetail from "./pages/RoleDetail";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/assessment" element={<Assessment />} />
          <Route path="/persona" element={<Persona />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/simulation" element={<Simulation />} />
          <Route path="/roadmap" element={<Roadmap />} />
          <Route path="/market" element={<Market />} />
          <Route path="/skill-lab" element={<SkillLab />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/career-nav-ai" element={<CoPilot />} />
          <Route path="/role-hub" element={<RoleHub />} />
          <Route path="/role/:id" element={<RoleDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
