import { useState, useRef, useEffect } from "react";
import { Send, Cpu, User, AlertCircle, RefreshCw, Sparkles, Check } from "lucide-react";
import { ChatMessage } from "../types";

export default function AiChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "initial",
      sender: "clone",
      text: "Hello! I am Omid's AI digital twin, powered by Gemini 3.5. Ask me about my scalable software engineering credentials, backend NestJS structures, Judo discipline, or check out my live project ledger!",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorText, setErrorText] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);

  const presets = [
    { label: "Judo Philosophy", text: "How does Judo shape your coding practices and discipline?" },
    { label: "Backend Scalability", text: "What is your main strategy for building highly scalable microservices?" },
    { label: "Nuxt & Vue Focus", text: "Why do you prefer Nuxt 3 and Vue for high-fidelity frontends?" },
    { label: "Future AI Goals", text: "What are your future research interests in AI & ML interfaces?" },
  ];

  const handleSend = async (textToSend: string) => {
    if (!textToSend.trim() || loading) return;

    setErrorText("");
    const userMsgMsg: ChatMessage = {
      id: Math.random().toString(),
      sender: "user",
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsgMsg]);
    setInput("");
    setLoading(true);

    try {
      // Gather last 8 message histories to preserve contextual depth without overflowing Gemini tokens
      const historyToSend = messages
        .slice(-8)
        .map((m) => ({ sender: m.sender === "clone" ? "model" : "user", text: m.text }));

      const res = await fetch("/api/gemini/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: textToSend, history: historyToSend }),
      });

      if (!res.ok) {
        throw new Error("Assistant response failed. Server returned status code " + res.status);
      }

      const data = await res.json();
      const cloneMsg: ChatMessage = {
        id: Math.random().toString(),
        sender: "clone",
        text: data.response || "I appreciate your response! Let me review my source code modules regarding that request.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, cloneMsg]);
    } catch (err: any) {
      console.error(err);
      setErrorText("Oops! Fished out an error linking to OmidReza's twin. Please query again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  return (
    <div
      id="aichat-interface-panel"
      className="flex flex-col h-[520px] rounded-2xl border border-white/5 bg-[#030303]/95 overflow-hidden shadow-2xl relative"
    >
      {/* Header */}
      <div id="aichat-hdr" className="px-5 py-4 border-b border-white/5 bg-[#0a0a0a] flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="relative">
            <div className="h-9 w-9 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <Cpu className="h-4.5 w-4.5" />
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-indigo-500 border-2 border-[#0a0a0a] animate-ping" />
            <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-indigo-500 border-2 border-[#0a0a0a]" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <p className="text-xs font-semibold text-white font-sans tracking-wide">
                OmidReza <span className="text-indigo-400 text-2xs uppercase bg-[#0d0d0d] px-1.5 py-0.5 border border-white/5 rounded">AI Clone</span>
              </p>
            </div>
            <p className="text-2xs text-zinc-500 font-sans flex items-center gap-1">
              <Sparkles className="h-2.5 w-2.5 text-indigo-400" /> Powered by Gemini • Online
            </p>
          </div>
        </div>
        <div className="text-2xs text-zinc-400 font-mono bg-[#0d0d0d] px-2 py-1 rounded border border-white/5 flex items-center gap-1.5">
          <Check className="h-3 w-3 text-indigo-400" /> CLONE INSTANTIATED
        </div>
      </div>

      {/* Messages Window */}
      <div id="aichat-stream" className="flex-1 overflow-y-auto p-5 space-y-4">
        {messages.map((msg) => {
          const isUser = msg.sender === "user";
          return (
            <div
              key={msg.id}
              id={`chat-bubble-${msg.id}`}
              className={`flex items-start gap-3 max-w-[85%] ${isUser ? "ml-auto flex-row-reverse" : "mr-auto"}`}
            >
              <div
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/5 bg-[#0d0d0d] text-indigo-400 shrink-0"
              >
                {isUser ? <User className="h-3.5 w-3.5" /> : <Cpu className="h-3.5 w-3.5" />}
              </div>
              <div>
                <div
                  className={`rounded-2xl px-4 py-2.5 text-xs font-sans leading-relaxed whitespace-pre-wrap border border-white/5 ${
                    isUser
                      ? "bg-[#0a0a0a] text-white rounded-tr-none"
                      : "bg-[#0d0d0d] text-zinc-350 rounded-tl-none"
                  }`}
                >
                  {msg.text}
                </div>
                <p className={`text-[9px] text-zinc-500 mt-1 font-mono tracking-wide ${isUser ? "text-right" : "text-left"}`}>
                  {msg.timestamp}
                </p>
              </div>
            </div>
          );
        })}

        {loading && (
          <div className="flex items-start gap-3 max-w-[80%]">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/5 bg-[#0d0d0d] text-indigo-400 shrink-0">
              <Cpu className="h-3.5 w-3.5 animate-spin" />
            </div>
            <div className="bg-[#0d0d0d] border border-white/5 rounded-2xl rounded-tl-none px-4 py-3 flex items-center gap-1.5">
              <div className="h-2 w-2 rounded-full bg-indigo-500/60 animate-bounce" style={{ animationDelay: "0ms" }} />
              <div className="h-2 w-2 rounded-full bg-indigo-500/60 animate-bounce" style={{ animationDelay: "150ms" }} />
              <div className="h-2 w-2 rounded-full bg-indigo-500/60 animate-bounce" style={{ animationDelay: "300ms" }} />
            </div>
          </div>
        )}

        {errorText && (
          <div className="flex items-center gap-2 p-3 rounded-lg border border-red-950/50 bg-red-950/10 text-red-400 text-2xs font-sans max-w-[85%] mx-auto">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{errorText}</span>
            <button
              onClick={() => handleSend(messages[messages.length - 1]?.text)}
              className="ml-auto flex items-center gap-1 text-[10px] text-red-300 underline cursor-pointer"
            >
              <RefreshCw className="h-2.5 w-2.5" /> Retry
            </button>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* Preset Suggested Questions */}
      <div id="preset-prompts-wrapper" className="px-5 py-2 overflow-x-auto flex gap-2 scrollbar-none border-t border-white/5 bg-[#0a0a0a] shrink-0">
        {presets.map((preset, idx) => (
          <button
            key={idx}
            className="shrink-0 text-[10px] font-sans text-zinc-400 bg-[#0d0d0d] hover:bg-white/5 border border-white/5 px-2.5 py-1.5 rounded-lg hover:text-indigo-400 transition"
            onClick={() => handleSend(preset.text)}
            disabled={loading}
          >
            {preset.label}
          </button>
        ))}
      </div>

      {/* Input Tray */}
      <div id="aichat-input-bar" className="p-4 border-t border-white/5 bg-[#0a0a0a] flex items-center gap-2.5 shrink-0">
        <input
          type="text"
          className="flex-1 bg-[#0d0d0d] text-white placeholder-zinc-500 px-4 py-2.5 rounded-xl border border-white/5 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500/50 font-sans"
          placeholder={loading ? "Generating response..." : "Ask OmidReza AI clone anything..."}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSend(input);
          }}
          disabled={loading}
        />
        <button
          className="h-10 w-10 shrink-0 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white flex items-center justify-center shadow-lg transition disabled:opacity-50 cursor-pointer shadow-indigo-500/10"
          onClick={() => handleSend(input)}
          disabled={!input.trim() || loading}
        >
          <Send className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
