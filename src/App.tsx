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
import DetailedAssessment from "./pages/DetailedAssessment";
import NotFound from "./pages/NotFound";
import Waitlist from "./pages/Waitlist";
import SetupScreen from "./pages/SetupScreen";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { DashboardLayout } from "./layouts/DashboardLayout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/assessment" element={<Assessment />} />
            <Route path="/persona" element={<Persona />} />
            <Route path="/register" element={<Register />} />
            
            {/* Protected Routes */}
            <Route element={<DashboardLayout />}>
              <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/setup" element={<ProtectedRoute><SetupScreen /></ProtectedRoute>} />
              <Route path="/simulation" element={<ProtectedRoute><Simulation /></ProtectedRoute>} />
              <Route path="/roadmap" element={<ProtectedRoute><Roadmap /></ProtectedRoute>} />
              <Route path="/market" element={<ProtectedRoute><Market /></ProtectedRoute>} />
              <Route path="/skill-lab" element={<ProtectedRoute><SkillLab /></ProtectedRoute>} />
              <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
              <Route path="/career-nav-ai" element={<ProtectedRoute><CoPilot /></ProtectedRoute>} />
              <Route path="/role-hub" element={<ProtectedRoute><RoleHub /></ProtectedRoute>} />
              <Route path="/role/:id" element={<ProtectedRoute><RoleDetail /></ProtectedRoute>} />
              <Route path="/detailed-assessment" element={<ProtectedRoute><DetailedAssessment /></ProtectedRoute>} />
            </Route>
            
            
            {/* Public Routes */}
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/waitlist" element={<Waitlist />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
