import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Send } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";

const Waitlist = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    comments: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const { error } = await supabase.from('waitlist').insert([
        {
          name: formData.name,
          email: formData.email,
          comments: formData.comments,
        }
      ]);

      if (error) {
        if (error.code === '23505') { // PostgreSQL unique violation code
          toast.error("This email is already on the waitlist!");
        } else {
          toast.error(`Error: ${error.message || 'Please try again.'}`);
          console.error("Supabase insert error:", error);
        }
        setIsSubmitting(false);
        return;
      }

      setIsSubmitting(false);
      setIsSuccess(true);
      toast.success("Successfully joined the waitlist!");

      // Fire off the email API asynchronously without awaiting to not block the UI
      supabase.functions.invoke('send-waitlist-email', {
        body: { name: formData.name, email: formData.email }
      }).catch(err => {
        console.error("Failed to trigger welcome email:", err);
      });
      
    } catch (err: any) {
      toast.error(`An unexpected error occurred: ${err.message || 'Please try again.'}`);
      console.error(err);
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-primary/30">
      <Navbar />

      <main className="flex-1 flex flex-col items-center justify-center px-6 pt-32 pb-24 relative overflow-hidden">
        {/* Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md bg-white/10 shadow-[0_0_20px_rgba(255,255,255,0.05)] border border-white/20 rounded-3xl p-8 md:p-10 shadow-2xl relative z-10 backdrop-blur-xl"
        >
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-primary/10 mb-4 border border-primary/20">
              <Sparkles className="h-6 w-6 text-primary" />
            </div>
            <h1 className="text-3xl font-display font-bold mb-2 text-white">Join the Waitlist</h1>
            <p className="text-slate-300 text-sm">Be the first to know when we launch new premium features.</p>
          </div>

          {isSuccess ? (
            <motion.div 
               initial={{ opacity: 0, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1 }}
               className="text-center py-8"
            >
              <div className="w-16 h-16 bg-green-500/10 border border-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Send className="w-8 h-8 text-green-500" />
              </div>
              <h3 className="text-xl font-bold mb-2">You're on the list!</h3>
              <p className="text-slate-300 text-sm mb-8">We'll reach out to {formData.email} as soon as we have news to share.</p>
              <button 
                onClick={() => setIsSuccess(false)}
                className="text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
              >
                Submit another request
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-1.5">
                <label htmlFor="name" className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                  Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-[#111111] border border-white/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-white placeholder:text-slate-500"
                  placeholder="John Doe"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="email" className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-[#111111] border border-white/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-white placeholder:text-slate-500"
                  placeholder="john@example.com"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="comments" className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                  Comments (Optional)
                </label>
                <textarea
                  id="comments"
                  name="comments"
                  value={formData.comments}
                  onChange={handleChange}
                  className="w-full bg-[#111111] border border-white/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all min-h-[100px] resize-y text-white placeholder:text-slate-500"
                  placeholder="Tell us what you're most excited about..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3.5 text-sm font-bold transition-all disabled:opacity-70 disabled:cursor-not-allowed mt-4 glow-aqua-sm"
              >
                {isSubmitting ? "Submitting..." : "Join Waitlist"} <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          )}
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default Waitlist;
