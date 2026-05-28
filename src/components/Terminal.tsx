import { useState, useEffect, useRef } from "react";
import { Terminal as TermIcon, Shield, RefreshCw } from "lucide-react";

interface TerminalProps {
  onClose?: () => void;
  accentClass: string;
}

interface LogEntry {
  type: "input" | "system" | "output";
  text: string;
}

export default function Terminal({ onClose, accentClass }: TerminalProps) {
  const [history, setHistory] = useState<LogEntry[]>([
    { type: "system", text: "itzOmidReza Digital Shell v3.11.0" },
    { type: "system", text: "STATUS: Secure container active at port 3000..." },
    { type: "system", text: "Type 'help' for tactical diagnostics." },
  ]);
  const [inputVal, setInputVal] = useState("");
  const [isDiagnosticRunning, setIsDiagnosticRunning] = useState(false);
  const terminalBottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const availableCommands = {
    help: "List available console commands",
    about: "Get to know OmidReza in depth",
    skills: "Print ASCII skill matrix",
    projects: "Summarize top completed systems",
    judo: "Expose personal discipline statistics (Judo philosophy)",
    sys: "Trigger system calibration checks",
    contact: "Retrieve secure endpoints for inquiries",
    clear: "Wipe terminal ledger clean",
  };

  const parseCommand = (rawLine: string) => {
    const line = rawLine.trim().toLowerCase();
    if (!line) return;

    const newLogs: LogEntry[] = [...history, { type: "input", text: `omid-shell$ ${rawLine}` }];

    switch (line) {
      case "help":
        newLogs.push({
          type: "output",
          text: `Available utilities:\n${Object.entries(availableCommands)
            .map(([cmd, desc]) => `- ${cmd.padEnd(10)} : ${desc}`)
            .join("\n")}`,
        });
        break;

      case "about":
        newLogs.push({
          type: "output",
          text: `OmidReza (itzOmidReza)\n----------------------\nRole: Software Engineering Student & Full-Stack Developer\nFocus: Scalable backend, microservices, cloud deployments, futuristic UI/UX systems & AI engineering.\nPhilosophy: Built upon martial arts discipline (Judo) for extreme focus, consistency, and pixel perfection in production.`,
        });
        break;

      case "skills":
        newLogs.push({
          type: "output",
          text: `OmidReza Core Competency Matrix:\n---------------------------------\nFront-End  : [==================] 90% (Nuxt 3, React, TS, Tailwind)\nBack-End   : [==================] 90% (Node, NestJS, Postgres, MongoDB)\nAI / ML    : [=============-----] 65% (Python, scikit-learn, LLM APIs)\nWorkflow   : [=================-] 85% (Docker, CI/CD, Jest, Git)`,
        });
        break;

      case "projects":
        newLogs.push({
          type: "output",
          text: `Featured Production Projects:\n---------------------------------\n1. Serene AI Dashboard : Fully responsive analytics platform backing real-time AI modeling triggers.\n2. NestJS Auth Edge    : High-throughput secure token validation microservice in Docker.\n3. Nuxt Dynamic Graph  : Multi-state interactive layout utilizing SVG nodes and canvas.\n4. Judo League Manager  : Client-side CRM tracking tournament results, belt updates, and player stats.`,
        });
        break;

      case "judo":
        newLogs.push({
          type: "output",
          text: `OmidReza Judo Registry:\n---------------------------------\nPracticing Judo (martial arts) has hammered deep physical discipline, tactical patience, and resilience into my coding habits.\nKey Principle: 'Seiryoku-Zenyo' (Maximum Efficiency, Minimum Effort) - translating directly to writing optimized code and scalable systems.\nConsistency is the bridge between a dream and production execution.`,
        });
        break;

      case "sys":
        setIsDiagnosticRunning(true);
        newLogs.push({ type: "system", text: "Calibrating systems. Verifying integrity of port 3000..." });
        setTimeout(() => {
          setHistory((prev) => [
            ...prev,
            { type: "output", text: "✔ Host 0.0.0.0 ... OK\n✔ Node JS runtime ... OK (v22.x)\n✔ Tailwind CSS framework ... OK (v4.0)\n✔ AI Chat Agent Connection ... OK\nIntegrity level 100%." },
          ]);
          setIsDiagnosticRunning(false);
        }, 1200);
        break;

      case "contact":
        newLogs.push({
          type: "output",
          text: `Inquiries Node:\n---------------------------------\nEmail    : itzomidreza@gmail.com\nGithub   : github.com/itzOmidReza\nLinkedIn : linkedin.com/in/OmidReza\nLocation : London, UK / Remote`,
        });
        break;

      case "clear":
        setHistory([]);
        setInputVal("");
        return;

      default:
        newLogs.push({
          type: "output",
          text: `Command not found: '${line}'. Type 'help' to review accessible nodes.`,
        });
    }

    setHistory(newLogs);
    setInputVal("");
  };

  useEffect(() => {
    terminalBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const handleContainerClick = () => {
    inputRef.current?.focus();
  };

  return (
    <div
      id="terminal-card"
      className="w-full rounded-xl border border-white/5 bg-[#030303] p-4 font-mono text-xs shadow-2xl relative flex flex-col h-[400px]"
      onClick={handleContainerClick}
    >
      {/* Terminal Title Bar */}
      <div id="terminal-bar" className="flex items-center justify-between border-b border-white/5 pb-3 mb-3 select-none">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="h-3 w-3 rounded-full bg-red-500/80 hover:bg-red-500 cursor-pointer" onClick={onClose}></span>
            <span className="h-3 w-3 rounded-full bg-yellow-500/80"></span>
            <span className="h-3 w-3 rounded-full bg-green-500/80"></span>
          </div>
          <span className="text-zinc-500 text-2xs flex items-center gap-1.5 pl-2">
            <TermIcon className="h-3 w-3 text-indigo-400" />
            itzomidreza@shell:~
          </span>
        </div>
        <div className="text-[10px] text-zinc-500 flex items-center gap-1">
          <Shield className="h-3 w-3 text-zinc-500" /> Secure Core Node
        </div>
      </div>

      {/* Terminal Output Stream */}
      <div id="terminal-output" className="flex-1 overflow-y-auto pr-1 space-y-2.5 scrollbar-thin scrollbar-thumb-zinc-850 scrollbar-track-transparent">
        {history.map((log, idx) => (
          <div key={idx} className="whitespace-pre-wrap leading-relaxed">
            {log.type === "input" ? (
              <span className="text-white">{log.text}</span>
            ) : log.type === "system" ? (
              <span className="text-indigo-400 font-semibold">{log.text}</span>
            ) : (
              <span className="text-zinc-350">{log.text}</span>
            )}
          </div>
        ))}
        {isDiagnosticRunning && (
          <div className="flex items-center gap-2 text-zinc-500 animate-pulse">
            <RefreshCw className="h-3 w-3 animate-spin text-indigo-400" /> Running matrix calibration checks...
          </div>
        )}
        <div ref={terminalBottomRef} />
      </div>

      {/* Input Form */}
      <div id="terminal-input-row" className="flex items-center gap-2 pt-3 border-t border-white/5 mt-2">
        <span className="text-indigo-400 shrink-0 font-medium">omid-shell$</span>
        <input
          ref={inputRef}
          type="text"
          className="bg-transparent text-white flex-1 focus:outline-none focus:ring-0 text-xs caret-indigo-400"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              parseCommand(inputVal);
            }
          }}
          disabled={isDiagnosticRunning}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
          placeholder={isDiagnosticRunning ? "Calibrating..." : "Type command and press Enter..."}
        />
      </div>
    </div>
  );
}
