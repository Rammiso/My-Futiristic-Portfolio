import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { IoSend, IoTrash, IoCopy, IoCheckmark, IoSparkles } from "react-icons/io5";
import Card from "@components/ui/Card.jsx";
import { FADE_IN_UP, STAGGER_CONTAINER } from "@utils/constants.js";
import api from "@utils/api.js";
import toast from "react-hot-toast";

// ── Markdown-lite renderer (bold, inline code, code blocks, line breaks) ──────
const renderMarkdown = (text) => {
  const lines = text.split("\n");
  const elements = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Code block
    if (line.startsWith("```")) {
      const lang = line.slice(3).trim();
      const codeLines = [];
      i++;
      while (i < lines.length && !lines[i].startsWith("```")) {
        codeLines.push(lines[i]);
        i++;
      }
      elements.push(
        <pre key={i} className="my-3 p-4 rounded-lg bg-black/40 border border-neon-green/20 overflow-x-auto text-xs font-mono text-neon-green/90 leading-relaxed">
          {lang && <div className="text-neon-cyan/50 text-[10px] mb-2 uppercase">{lang}</div>}
          <code>{codeLines.join("\n")}</code>
        </pre>
      );
      i++;
      continue;
    }

    // Heading
    if (line.startsWith("### ")) {
      elements.push(<h4 key={i} className="text-white font-bold mt-3 mb-1 text-sm">{inlineFormat(line.slice(4))}</h4>);
    } else if (line.startsWith("## ")) {
      elements.push(<h3 key={i} className="text-white font-bold mt-4 mb-1">{inlineFormat(line.slice(3))}</h3>);
    } else if (line.startsWith("# ")) {
      elements.push(<h2 key={i} className="text-white font-bold mt-4 mb-2 text-lg">{inlineFormat(line.slice(2))}</h2>);
    // Bullet
    } else if (line.startsWith("- ") || line.startsWith("* ")) {
      elements.push(
        <li key={i} className="ml-4 list-disc text-white/80 text-sm leading-relaxed">
          {inlineFormat(line.slice(2))}
        </li>
      );
    // Numbered list
    } else if (/^\d+\.\s/.test(line)) {
      elements.push(
        <li key={i} className="ml-4 list-decimal text-white/80 text-sm leading-relaxed">
          {inlineFormat(line.replace(/^\d+\.\s/, ""))}
        </li>
      );
    // Empty line
    } else if (line.trim() === "") {
      elements.push(<div key={i} className="h-2" />);
    // Normal paragraph
    } else {
      elements.push(
        <p key={i} className="text-white/85 text-sm leading-relaxed">
          {inlineFormat(line)}
        </p>
      );
    }
    i++;
  }
  return elements;
};

const inlineFormat = (text) => {
  // bold **text**, inline `code`
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**"))
      return <strong key={i} className="text-white font-semibold">{part.slice(2, -2)}</strong>;
    if (part.startsWith("`") && part.endsWith("`"))
      return <code key={i} className="px-1.5 py-0.5 rounded bg-neon-green/15 text-neon-green text-xs font-mono">{part.slice(1, -1)}</code>;
    return part;
  });
};

// ── Single message bubble ─────────────────────────────────────────────────────
const MessageBubble = ({ msg }) => {
  const [copied, setCopied] = useState(false);
  const isUser = msg.role === "user";

  const copy = () => {
    navigator.clipboard.writeText(msg.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex gap-3 ${isUser ? "flex-row-reverse" : "flex-row"}`}
    >
      {/* Avatar */}
      <div
        className={`w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center text-xs font-bold font-mono border ${
          isUser
            ? "bg-neon-green/20 border-neon-green/40 text-neon-green"
            : "bg-neon-cyan/15 border-neon-cyan/30 text-neon-cyan"
        }`}
      >
        {isUser ? "YOU" : "AI"}
      </div>

      {/* Bubble */}
      <div className={`group relative max-w-[80%] ${isUser ? "items-end" : "items-start"} flex flex-col gap-1`}>
        <div
          className={`px-4 py-3 rounded-xl text-sm relative ${
            isUser
              ? "bg-neon-green/15 border border-neon-green/30 text-white/90 rounded-tr-sm"
              : "glass border border-white/10 rounded-tl-sm"
          }`}
        >
          {isUser ? (
            <p className="text-white/90 text-sm leading-relaxed">{msg.text}</p>
          ) : (
            <div className="space-y-1">{renderMarkdown(msg.text)}</div>
          )}
        </div>

        {/* Copy button */}
        <button
          onClick={copy}
          className="opacity-0 group-hover:opacity-100 transition-opacity self-end flex items-center gap-1 text-[10px] font-mono text-white/40 hover:text-white/70"
        >
          {copied ? <IoCheckmark className="text-neon-green" /> : <IoCopy />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
    </motion.div>
  );
};

// ── Typing indicator ──────────────────────────────────────────────────────────
const TypingIndicator = () => (
  <div className="flex gap-3">
    <div className="w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center text-xs font-bold font-mono border bg-neon-cyan/15 border-neon-cyan/30 text-neon-cyan">
      AI
    </div>
    <div className="px-4 py-3 glass border border-white/10 rounded-xl rounded-tl-sm flex items-center gap-1.5">
      {[0, 0.2, 0.4].map((d, i) => (
        <div
          key={i}
          className="w-1.5 h-1.5 rounded-full bg-neon-cyan/60"
          style={{ animation: `typingDot 1.2s ease-in-out ${d}s infinite` }}
        />
      ))}
    </div>
  </div>
);

// ── Suggestion chips ──────────────────────────────────────────────────────────
const suggestions = [
  "Explain how React hooks work",
  "Write a Node.js REST API example",
  "What is the difference between SQL and NoSQL?",
  "Give me tips for clean code",
  "How does JWT authentication work?",
  "Explain async/await in JavaScript",
];

// ── Main component ────────────────────────────────────────────────────────────
const AIPlayground = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollContainerRef = useRef(null);
  const textareaRef = useRef(null);

  // Auto-scroll the chat container (not the page) to bottom on new messages
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;
    container.scrollTop = container.scrollHeight;
  }, [messages, loading]);

  // Auto-resize textarea
  useEffect(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = "auto";
    ta.style.height = Math.min(ta.scrollHeight, 160) + "px";
  }, [input]);

  const buildHistory = () =>
    messages.map((m) => ({
      role: m.role === "user" ? "user" : "assistant",
      content: m.text,
    }));

  const send = async (promptText) => {
    const text = (promptText || input).trim();
    if (!text || loading) return;

    const userMsg = { role: "user", text, id: Date.now() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await api.post("/ai-playground/text", {
        prompt: text,
        history: buildHistory(),
      });
      const aiText = res.data.data.generatedText;
      setMessages((prev) => [...prev, { role: "model", text: aiText, id: Date.now() + 1 }]);
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to get a response. Please try again.";
      toast.error(msg);
      setMessages((prev) => [...prev, { role: "model", text: `⚠️ ${msg}`, id: Date.now() + 1 }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  const clearChat = () => {
    setMessages([]);
    setInput("");
    toast.success("Chat cleared");
  };

  const isEmpty = messages.length === 0;

  return (
    <section id="ai-playground" className="section-padding bg-cyber-darker relative overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(57,255,20,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(57,255,20,0.1) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        />
      </div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-green/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-cyan/8 rounded-full blur-3xl pointer-events-none" />

      {/* HUD corners */}
      <div className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-neon-green/30 pointer-events-none" />
      <div className="absolute top-8 right-8 w-16 h-16 border-r-2 border-t-2 border-neon-cyan/30 pointer-events-none" />

      <div className="container-custom relative z-10">
        <motion.div
          variants={STAGGER_CONTAINER}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Header */}
          <div className="text-center mb-12">
            <motion.div variants={FADE_IN_UP} className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-neon-green" />
              <span className="text-sm font-mono text-neon-green uppercase tracking-wider">LLaMA 3.3 · Groq</span>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-neon-green" />
            </motion.div>
            <motion.h2 variants={FADE_IN_UP} className="section-title">AI Playground</motion.h2>
            <motion.p variants={FADE_IN_UP} className="text-white/60 max-w-2xl mx-auto leading-relaxed">
              Chat with Llama AI — ask anything, get instant answers
            </motion.p>
          </div>

          {/* Chat window */}
          <motion.div variants={FADE_IN_UP} className="max-w-4xl mx-auto">
            <Card variant="glass" className="p-0 overflow-hidden relative">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-green to-transparent" />

              {/* Title bar */}
              <div className="flex items-center justify-between px-5 py-3 border-b border-white/10 bg-black/20">
                <div className="flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/60" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400/60" />
                    <div className="w-3 h-3 rounded-full bg-neon-green/60" />
                  </div>
                  <span className="text-xs font-mono text-white/40">llama-3.3-70b · groq inference</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 bg-neon-green rounded-full animate-pulse" />
                    <span className="text-[10px] font-mono text-neon-green uppercase">Online</span>
                  </div>
                  {!isEmpty && (
                    <button
                      onClick={clearChat}
                      className="flex items-center gap-1 text-[10px] font-mono text-white/40 hover:text-neon-pink transition-colors"
                    >
                      <IoTrash className="text-xs" /> Clear
                    </button>
                  )}
                </div>
              </div>

              {/* Messages area */}
              <div className="h-[420px] overflow-y-auto p-5 space-y-5 scrollbar-thin" ref={scrollContainerRef}>
                {isEmpty ? (
                  /* Empty state */
                  <div className="h-full flex flex-col items-center justify-center gap-6">
                    <div className="text-center">
                      <div
                        className="text-5xl mb-4"
                        style={{ animation: "iconFloat 3s ease-in-out infinite" }}
                      >
                        <IoSparkles className="text-neon-green mx-auto" />
                      </div>
                      <p className="text-white/50 text-sm font-mono">Start a conversation with Gemini AI</p>
                      <p className="text-white/30 text-xs mt-1">Press Enter to send · Shift+Enter for new line</p>
                    </div>

                    {/* Suggestion chips */}
                    <div className="flex flex-wrap gap-2 justify-center max-w-lg">
                      {suggestions.map((s) => (
                        <button
                          key={s}
                          onClick={() => send(s)}
                          className="px-3 py-1.5 text-xs font-mono glass border border-neon-green/20 rounded-full text-white/60 hover:text-neon-green hover:border-neon-green/50 transition-all"
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <>
                    {messages.map((msg) => (
                      <MessageBubble key={msg.id} msg={msg} />
                    ))}
                    {loading && <TypingIndicator />}
                  </>
                )}
              </div>

              {/* Input area */}
              <div className="border-t border-white/10 p-4">
                <div className="flex gap-3 items-end">
                  <div className="flex-1 relative">
                    <textarea
                      ref={textareaRef}
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Ask anything... (Enter to send)"
                      rows={1}
                      disabled={loading}
                      className="w-full px-4 py-3 bg-black/30 border border-white/15 rounded-xl text-white/90 placeholder-white/30 text-sm font-sans resize-none focus:outline-none focus:border-neon-green/50 transition-colors leading-relaxed"
                      style={{ minHeight: "48px", maxHeight: "160px" }}
                    />
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => send()}
                    disabled={loading || !input.trim()}
                    className="flex-shrink-0 w-12 h-12 rounded-xl border-2 border-neon-green/50 bg-neon-green/10 text-neon-green flex items-center justify-center hover:bg-neon-green/20 hover:border-neon-green transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <IoSend className={loading ? "animate-pulse" : ""} />
                  </motion.button>
                </div>
                <p className="text-[10px] font-mono text-white/25 mt-2 text-center">
                  Powered by LLaMA 3.3 70B via Groq · Responses may vary in accuracy
                </p>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-green to-transparent opacity-30 pointer-events-none" />

      <style>{`
        @keyframes iconFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        @keyframes typingDot {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
          30% { transform: translateY(-6px); opacity: 1; }
        }
        .scrollbar-thin::-webkit-scrollbar { width: 4px; }
        .scrollbar-thin::-webkit-scrollbar-track { background: transparent; }
        .scrollbar-thin::-webkit-scrollbar-thumb { background: rgba(57,255,20,0.2); border-radius: 2px; }
      `}</style>
    </section>
  );
};

export default AIPlayground;
