import { useState, useEffect, useRef } from "react";
import { Search, Terminal, User, Mail, Layout, Cpu, Circle, Award, Code } from "lucide-react";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (sectionId: string) => void;
  onOpenTerminal: () => void;
  onOpenAiChat: () => void;
  onAccentChange: (accent: "emerald" | "cyan" | "indigo" | "amber") => void;
}

export default function CommandPalette({
  isOpen,
  onClose,
  onNavigate,
  onOpenTerminal,
  onOpenAiChat,
  onAccentChange,
}: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const commands = [
    {
      id: "nav-hero",
      title: "Navigate: Home Section",
      subtitle: "Jump to the top showcase dashboard",
      icon: Cpu,
      action: () => onNavigate("hero"),
    },
    {
      id: "nav-about",
      title: "Navigate: Engineered Identity",
      subtitle: "Read Omid's design philosophies and background",
      icon: User,
      action: () => onNavigate("about"),
    },
    {
      id: "nav-tech",
      title: "Navigate: Stack & Frameworks",
      subtitle: "Nuxt, Node, Nest, ML, and tools",
      icon: Code,
      action: () => onNavigate("tech"),
    },
    {
      id: "nav-projects",
      title: "Navigate: Projects Ledger",
      subtitle: "Filter interactive fullstack & AI cards",
      icon: Layout,
      action: () => onNavigate("projects"),
    },
    {
      id: "nav-workflow",
      title: "Navigate: Pipeline & Architecture",
      subtitle: "Modular MVP process visualization",
      icon: Cpu,
      action: () => onNavigate("workflow"),
    },
    {
      id: "nav-beyond",
      title: "Navigate: Beyond Code (Judo)",
      subtitle: "Judo, game design and tactical break routines",
      icon: Award,
      action: () => onNavigate("beyond"),
    },
    {
      id: "nav-contact",
      title: "Navigate: Secure Contact Node",
      subtitle: "Initiate professional communications",
      icon: Mail,
      action: () => onNavigate("contact"),
    },
    {
      id: "tool-terminal",
      title: "Launch: Developer Shell Terminal",
      subtitle: "Interactive diagnostics terminal component",
      icon: Terminal,
      action: () => onOpenTerminal(),
    },
    {
      id: "tool-chat",
      title: "Query: Digital Clone Chatbot",
      subtitle: "Direct dynamic QA with OmidReza's Gemini clone",
      icon: Cpu,
      action: () => onOpenAiChat(),
    },
    {
      id: "accent-emerald",
      title: "Set Theme: Emerald Core State",
      subtitle: "Switch dashboard to high-contrast tech green theme",
      icon: Circle,
      action: () => onAccentChange("emerald"),
      color: "text-emerald-500",
    },
    {
      id: "accent-cyan",
      title: "Set Theme: Silicon Cyan State",
      subtitle: "Activate sleek sub-optimal teal cyan glowing hue",
      icon: Circle,
      action: () => onAccentChange("cyan"),
      color: "text-cyan-400",
    },
    {
      id: "accent-indigo",
      title: "Set Theme: Royal Indigo Flow",
      subtitle: "Calm evening purple-blue gradient filter",
      icon: Circle,
      action: () => onAccentChange("indigo"),
      color: "text-indigo-400",
    },
  ];

  const filtered = commands.filter(
    (c) =>
      c.title.toLowerCase().includes(query.toLowerCase()) ||
      c.subtitle.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 80);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % Math.max(1, filtered.length));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filtered.length) % Math.max(1, filtered.length));
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (filtered[selectedIndex]) {
          filtered[selectedIndex].action();
          onClose();
        }
      } else if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, selectedIndex, filtered]);

  if (!isOpen) return null;

  return (
    <div
      id="command-palette-backdrop"
      className="fixed inset-0 z-50 flex items-start justify-center bg-[#030303]/70 py-16 px-4 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        id="command-palette-container"
        className="w-full max-w-2xl overflow-hidden rounded-xl border border-white/5 bg-[#0a0a0a] shadow-[0_0_50px_rgba(0,0,0,0.9)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div id="palette-search-wrapper" className="flex items-center border-b border-white/5 px-4 py-3">
          <Search className="mr-3 h-5 w-5 text-zinc-400" />
          <input
            ref={inputRef}
            type="text"
            className="w-full bg-transparent text-white placeholder-zinc-500 focus:outline-none text-base font-sans"
            placeholder="Type a command or query... (e.g. 'Project', 'Theme')"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
          />
          <div className="rounded border border-white/5 bg-[#0d0d0d] px-1.5 py-0.5 text-2xs text-zinc-500 font-mono">
            ESC
          </div>
        </div>

        <div id="palette-list" className="max-h-[380px] overflow-y-auto px-2 py-3 scrollbar-none">
          {filtered.length === 0 ? (
            <div className="py-6 text-center text-sm text-zinc-500 font-sans">
              No tactical nodes found matching "{query}"
            </div>
          ) : (
            filtered.map((cmd, idx) => {
              const Icon = cmd.icon;
              const isSelected = idx === selectedIndex;
              return (
                <button
                  key={cmd.id}
                  id={`command-item-${cmd.id}`}
                  className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left transition-colors duration-150 ${
                    isSelected
                      ? "bg-white/5 text-indigo-400"
                      : "text-zinc-300 hover:bg-[#0d0d0d]"
                  }`}
                  onClick={() => {
                    cmd.action();
                    onClose();
                  }}
                  onMouseEnter={() => setSelectedIndex(idx)}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-md border ${
                        isSelected
                          ? "border-indigo-500/30 bg-indigo-500/10 text-indigo-400"
                          : "border-white/5 bg-[#0d0d0d] text-zinc-400"
                      }`}
                    >
                      <Icon className={`h-4.5 w-4.5 ${cmd.color || ""}`} />
                    </div>
                    <div>
                      <p className="text-xs font-semibold font-sans leading-none">
                        {cmd.title}
                      </p>
                      <p className="text-2xs text-zinc-500 mt-1 font-sans leading-none">
                        {cmd.subtitle}
                      </p>
                    </div>
                  </div>
                  {isSelected && (
                    <span className="text-2xs text-indigo-400 font-mono leading-none flex items-center gap-1">
                      RUN ↵
                    </span>
                  )}
                </button>
              );
            })
          )}
        </div>

        <div
          id="palette-footer"
          className="flex items-center justify-between border-t border-white/5 px-4 py-3 text-2xs text-zinc-500 bg-[#0d0d0d] font-sans"
        >
          <div className="flex gap-4">
            <span>
              Use <span className="font-mono text-zinc-400">↑↓</span> to step
            </span>
            <span>
              <span className="font-mono text-zinc-400">↵ Enter</span> to fire
            </span>
          </div>
          <span>Active Command Palette</span>
        </div>
      </div>
    </div>
  );
}
