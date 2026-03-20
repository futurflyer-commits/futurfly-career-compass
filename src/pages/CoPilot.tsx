import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Rocket, Search, Settings, MessageSquare, Send, Mic, Paperclip, Bot, User, FileText, TrendingUp } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

interface ChatSession {
  id: string;
  title: string;
  date: string;
  icon: React.ReactNode;
}

const chatHistory: ChatSession[] = [
  { id: "1", title: "Salary Negotiation", date: "2 hours ago", icon: <MessageSquare className="h-4 w-4" /> },
  { id: "2", title: "Resume Review", date: "Yesterday", icon: <FileText className="h-4 w-4" /> },
  { id: "3", title: "Upskilling Path", date: "3 days ago", icon: <TrendingUp className="h-4 w-4" /> },
];

const initialMessages: Message[] = [
  {
    id: "1",
    role: "assistant",
    content: `Hello! I'm **Flynn**, your AI career co-pilot. I've analyzed your recent profile updates and the Senior Product Designer market trends.\n\nHow can I help you accelerate your career path today?`,
    timestamp: "10:24 AM",
  },
  {
    id: "2",
    role: "user",
    content: "I'm preparing for a salary negotiation tomorrow. The company offered ₹14.5L base, but based on my experience and the current market for Senior roles, I was targeting ₹16.5L. How should I frame this?",
    timestamp: "10:26 AM",
  },
  {
    id: "3",
    role: "assistant",
    content: `That's a valid target. Data shows the 75th percentile for Senior Product Designers is currently **₹16.8L**.\n\nHere's a strategic framework for your conversation:\n\n• **Anchoring:** Mention the market data early to set a high baseline.\n\n• **Value-Based Pitch:** Connect the ₹16.5L to the specific impact you'll have on their upcoming Q3 design system launch.\n\n• **The "Pivot" technique:** If they can't meet the base, pivot to equity or a signing bonus.\n\n*Would you like me to generate a specific script for the "Value-Based Pitch"?*`,
    timestamp: "10:27 AM",
  },
];

const renderMarkdown = (text: string) => {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong class="text-primary font-semibold">$1</strong>')
    .replace(/\*(.*?)\*/g, '<em class="text-primary/80">$1</em>')
    .replace(/\n/g, "<br />");
};

const CoPilot = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [activeSession, setActiveSession] = useState("1");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    // Simulated AI response
    setTimeout(() => {
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "I'm processing your request. This is a demo preview — full AI responses will be available once the backend is connected.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, aiMsg]);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-background">
            <div className="flex h-[calc(100vh-4rem)]">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-72 border-r border-border/30 bg-card/50">
        <div className="p-4">
          <p className="text-xs uppercase tracking-wider text-primary font-semibold mb-3">Chat History</p>
          <div className="space-y-1">
            {chatHistory.map((session) => (
              <button
                key={session.id}
                onClick={() => setActiveSession(session.id)}
                className={`w-full flex items-start gap-3 rounded-xl px-3 py-3 text-left transition-colors ${
                  activeSession === session.id
                    ? "bg-primary/10 border border-primary/30"
                    : "hover:bg-muted/50"
                }`}
              >
                <span className="mt-0.5 text-muted-foreground">{session.icon}</span>
                <div className="min-w-0">
                  <p className="text-sm font-medium truncate">{session.title}</p>
                  <p className="text-xs text-muted-foreground">{session.date}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-auto p-4">
          <button className="w-full flex items-center justify-center gap-2 rounded-xl bg-primary text-primary-foreground py-3 text-sm font-semibold hover:opacity-90 transition-opacity">
            + New Session
          </button>
        </div>
      </aside>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Chat Header */}
        <div className="flex items-center gap-3 px-6 py-4 border-b border-border/30">
          <div className="w-10 h-10 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center">
            <Bot className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="font-display font-bold text-base">Flynn</h1>
            <p className="text-xs text-primary flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" /> AI Career Co-pilot
            </p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 md:px-16 py-8 space-y-6">
          <AnimatePresence>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.role === "assistant" && (
                  <div className="w-9 h-9 rounded-full bg-primary/20 border border-primary/30 flex-shrink-0 flex items-center justify-center mt-1">
                    <Bot className="h-4 w-4 text-primary" />
                  </div>
                )}
                <div className="max-w-2xl">
                  <div
                    className={`rounded-2xl px-5 py-4 text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-muted border border-border/50 text-foreground"
                        : "bg-card border border-border/30 text-foreground"
                    }`}
                    dangerouslySetInnerHTML={{ __html: renderMarkdown(msg.content) }}
                  />
                  <p className={`text-[10px] text-muted-foreground mt-1.5 ${msg.role === "user" ? "text-right" : ""}`}>
                    {msg.role === "assistant" ? "FLYNN" : "YOU"} • {msg.timestamp}
                  </p>
                </div>
                {msg.role === "user" && (
                  <div className="w-9 h-9 rounded-full bg-muted border border-border/50 flex-shrink-0 flex items-center justify-center mt-1">
                    <User className="h-4 w-4 text-muted-foreground" />
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="px-4 md:px-16 pb-4">
          <div className="flex items-center gap-3 bg-card border border-border/30 rounded-2xl px-4 py-3">
            <Paperclip className="h-5 w-5 text-muted-foreground hover:text-foreground cursor-pointer transition-colors flex-shrink-0" />
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Message Flynn..."
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
            <Mic className="h-5 w-5 text-muted-foreground hover:text-foreground cursor-pointer transition-colors flex-shrink-0" />
            <button
              onClick={handleSend}
              className="w-9 h-9 rounded-full bg-primary flex items-center justify-center hover:opacity-90 transition-opacity flex-shrink-0"
            >
              <Send className="h-4 w-4 text-primary-foreground" />
            </button>
          </div>
          <p className="text-center text-[10px] text-muted-foreground mt-2 tracking-widest uppercase">
            FuturFly AI can make mistakes. Verify critical career advice.
          </p>
        </div>
      </div>
      </div>
    </div>
  );
};

export default CoPilot;
