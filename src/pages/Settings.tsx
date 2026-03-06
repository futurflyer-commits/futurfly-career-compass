import { useState } from "react";
import { DashboardNav } from "@/components/DashboardNav";
import { Footer } from "@/components/Footer";
import {
  User,
  Settings as SettingsIcon,
  Shield,
  Link2,
  LogOut,
  Eye,
  Trash2,
} from "lucide-react";

const tabs = [
  { id: "account", label: "Account Information", icon: User },
  { id: "preferences", label: "Preferences", icon: SettingsIcon },
  { id: "security", label: "Security & Privacy", icon: Shield },
  { id: "linked", label: "Linked Accounts", icon: Link2 },
];

const Settings = () => {
  const [activeTab, setActiveTab] = useState("account");
  const [careerVisible, setCareerVisible] = useState(true);

  const [form, setForm] = useState({
    fullName: "Alex Rivers",
    title: "The AI Product Architect",
    email: "alex.rivers@futurfly.ai",
    timezone: "Pacific Time (PT)",
  });

  return (
    <div className="min-h-screen bg-background">
      <DashboardNav />

      <div className="container py-10 md:py-14">
        <div className="grid md:grid-cols-[260px_1fr] gap-8">
          {/* Sidebar */}
          <aside className="glass-card p-6 flex flex-col items-center gap-4 h-fit">
            <div className="relative">
              <div className="w-28 h-28 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-4xl font-bold text-primary-foreground">
                AR
              </div>
              <span className="absolute bottom-1 right-1 w-5 h-5 rounded-full bg-primary border-2 border-background" />
            </div>
            <div className="text-center">
              <h3 className="font-display font-semibold text-lg">{form.fullName}</h3>
              <p className="text-sm text-primary">{form.title}</p>
            </div>
            <button className="w-full rounded-lg border border-primary/40 py-2 text-sm font-medium text-primary hover:bg-primary/10 transition-colors">
              Edit Avatar
            </button>

            <nav className="w-full flex flex-col gap-1 mt-4">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors w-full text-left ${
                    activeTab === tab.id
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}
                >
                  <tab.icon className="h-4 w-4" />
                  {tab.label}
                </button>
              ))}
            </nav>

            <button className="flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors w-full mt-4">
              <LogOut className="h-4 w-4" />
              Sign Out
            </button>
          </aside>

          {/* Main Content */}
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-display font-bold">User Profile & Account Settings</h1>
              <p className="text-muted-foreground mt-1">Manage your AI career co-pilot preferences and professional identity.</p>
            </div>

            {/* Account Information */}
            {activeTab === "account" && (
              <div className="glass-card p-6 md:p-8 space-y-6">
                <h2 className="flex items-center gap-2 font-display font-semibold text-lg">
                  <SettingsIcon className="h-5 w-5 text-primary" />
                  Account Information
                </h2>
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="text-sm text-muted-foreground mb-1.5 block">Full Name</label>
                    <input
                      className="w-full rounded-lg bg-input border border-border/50 px-4 py-2.5 text-sm text-foreground outline-none focus:border-primary/50 transition-colors"
                      value={form.fullName}
                      onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground mb-1.5 block">Professional Title</label>
                    <input
                      className="w-full rounded-lg bg-input border border-border/50 px-4 py-2.5 text-sm text-foreground outline-none focus:border-primary/50 transition-colors"
                      value={form.title}
                      onChange={(e) => setForm({ ...form, title: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground mb-1.5 block">Email Address</label>
                    <input
                      className="w-full rounded-lg bg-input border border-border/50 px-4 py-2.5 text-sm text-foreground outline-none focus:border-primary/50 transition-colors"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground mb-1.5 block">Timezone</label>
                    <select
                      className="w-full rounded-lg bg-input border border-border/50 px-4 py-2.5 text-sm text-foreground outline-none focus:border-primary/50 transition-colors appearance-none"
                      value={form.timezone}
                      onChange={(e) => setForm({ ...form, timezone: e.target.value })}
                    >
                      <option>Pacific Time (PT)</option>
                      <option>India Standard Time (IST)</option>
                      <option>Eastern Time (ET)</option>
                      <option>Central European Time (CET)</option>
                    </select>
                  </div>
                </div>
                <div className="flex justify-end">
                  <button className="rounded-lg bg-gradient-to-r from-primary to-secondary px-6 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-all">
                    Save Changes
                  </button>
                </div>
              </div>
            )}

            {/* Preferences */}
            {activeTab === "preferences" && (
              <div className="glass-card p-6 md:p-8 space-y-4">
                <h2 className="flex items-center gap-2 font-display font-semibold text-lg">
                  <SettingsIcon className="h-5 w-5 text-primary" />
                  Preferences
                </h2>
                <p className="text-sm text-muted-foreground">Notification and display preferences coming soon.</p>
              </div>
            )}

            {/* Security */}
            {activeTab === "security" && (
              <div className="glass-card p-6 md:p-8 space-y-4">
                <h2 className="flex items-center gap-2 font-display font-semibold text-lg">
                  <Shield className="h-5 w-5 text-primary" />
                  Security & Privacy
                </h2>
                <p className="text-sm text-muted-foreground">Password management and 2FA settings coming soon.</p>
              </div>
            )}

            {/* Linked Accounts */}
            {activeTab === "linked" && (
              <div className="glass-card p-6 md:p-8 space-y-4">
                <h2 className="flex items-center gap-2 font-display font-semibold text-lg">
                  <Link2 className="h-5 w-5 text-primary" />
                  Linked Accounts
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-4 rounded-lg bg-input border border-border/50 p-4">
                    <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-lg font-bold">G</div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Google</p>
                      <p className="text-xs text-muted-foreground">Connected as alex.r@gmail.com</p>
                    </div>
                    <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive cursor-pointer transition-colors" />
                  </div>
                  <div className="flex items-center gap-4 rounded-lg bg-input border border-border/50 p-4">
                    <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-lg font-bold">in</div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">LinkedIn</p>
                      <p className="text-xs text-muted-foreground">Not connected</p>
                    </div>
                    <button className="text-sm font-semibold text-primary hover:underline">Connect</button>
                  </div>
                </div>
              </div>
            )}

            {/* Career Visibility — always visible */}
            <div className="glass-card p-6 md:p-8 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Eye className="h-5 w-5 text-primary" />
                <div>
                  <h3 className="font-display font-semibold">Career Visibility</h3>
                  <p className="text-sm text-muted-foreground">Allow FuturFly to suggest your profile to top AI recruiters and potential mentors.</p>
                </div>
              </div>
              <button
                onClick={() => setCareerVisible(!careerVisible)}
                className={`relative w-12 h-7 rounded-full transition-colors ${careerVisible ? "bg-primary" : "bg-muted"}`}
              >
                <span
                  className={`absolute top-0.5 w-6 h-6 rounded-full bg-background transition-transform ${
                    careerVisible ? "left-[calc(100%-1.625rem)]" : "left-0.5"
                  }`}
                />
              </button>
            </div>

            {/* Danger Zone */}
            <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-6 md:p-8 flex items-center justify-between">
              <div>
                <h3 className="font-display font-semibold text-destructive">Danger Zone</h3>
                <p className="text-sm text-muted-foreground">Permanently delete your FuturFly account and all associated AI career data.</p>
              </div>
              <button className="rounded-lg border border-destructive/50 px-5 py-2 text-sm font-semibold text-destructive hover:bg-destructive/10 transition-colors whitespace-nowrap">
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Settings;
