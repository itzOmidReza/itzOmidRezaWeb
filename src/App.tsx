import { useState, useEffect, FormEvent } from "react";
import {
  Search,
  Terminal as TermIcon,
  Layers,
  Award,
  Cpu,
  Mail,
  Menu,
  X,
  Send,
  Sparkles,
  ExternalLink,
  ChevronRight,
  Code
} from "lucide-react";

import CommandPalette from "./components/CommandPalette";
import Terminal from "./components/Terminal";
import AiChat from "./components/AiChat";
import TechUniverse from "./components/TechUniverse";
import ProjectsShowcase from "./components/ProjectsShowcase";
import BeyondCode from "./components/BeyondCode";
import ArchitecturePipeline from "./components/ArchitecturePipeline";

export default function App() {
  // Navigation & Menu States
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  // Accent Override (triggered via Command Palette / dynamic triggers)
  const [accent, setAccent] = useState<"emerald" | "cyan" | "indigo" | "amber">("indigo");

  // Console active toggle override
  const [showEmbeddedConsole, setShowEmbeddedConsole] = useState(true);

  // Forms states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [formLoading, setFormLoading] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const [formError, setFormError] = useState("");

  // Shortcut binder for Command Palette (⌘K or Ctrl+K)
  useEffect(() => {
    const handleShortcut = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleShortcut);
    return () => window.removeEventListener("keydown", handleShortcut);
  }, []);

  // Simple scroll listener to active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "about", "tech", "projects", "workflow", "beyond", "contact"];
      const scrollPosition = window.scrollY + 200;

      for (const sec of sections) {
        const el = document.getElementById(sec);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sec);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollToSection = (sectionId: string) => {
    const target = document.getElementById(sectionId);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
    }
  };

  const handleContactSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      setFormError("All input fields are required before triggering dispatch.");
      return;
    }

    setFormLoading(true);
    setFormError("");

    setTimeout(() => {
      setFormLoading(false);
      setFormSuccess(true);
      setName("");
      setEmail("");
      setMessage("");
    }, 1500);
  };

  // Accent classes mapper
  const getAccentClass = (type: "text" | "border" | "bg" | "gradient" | "glow") => {
    const map = {
      emerald: {
        text: "text-emerald-400",
        border: "border-emerald-500/25",
        bg: "bg-emerald-500",
        gradient: "from-emerald-500 to-teal-500",
        glow: "shadow-[0_0_20px_rgba(16,185,129,0.15)]",
      },
      cyan: {
        text: "text-cyan-400",
        border: "border-cyan-500/20",
        bg: "bg-cyan-500",
        gradient: "from-cyan-400 to-sky-500",
        glow: "shadow-[0_0_20px_rgba(34,211,238,0.15)]",
      },
      indigo: {
        text: "text-indigo-400",
        border: "border-indigo-500/20",
        bg: "bg-indigo-500",
        gradient: "from-indigo-400 to-purple-500",
        glow: "shadow-[0_0_20px_rgba(129,140,248,0.15)]",
      },
      amber: {
        text: "text-amber-400",
        border: "border-amber-500/20",
        bg: "bg-amber-500",
        gradient: "from-amber-400 to-orange-500",
        glow: "shadow-[0_0_20px_rgba(245,158,11,0.15)]",
      },
    };
    return map[accent][type];
  };

  return (
    <div className="min-h-screen bg-[#030303] text-zinc-300 font-sans selection:bg-indigo-500/20 selection:text-indigo-300 relative">
      {/* Dynamic Grid Background Overlay */}
      <div id="grid-overlay" className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      {/* Decorative Blur Backdrops (Twilight vibe) */}
      <div className="absolute top-[10%] left-[5%] h-96 w-96 rounded-full bg-indigo-500/5 blur-3xl pointer-events-none" />
      <div className="absolute top-[40%] right-[10%] h-96 w-96 rounded-full bg-purple-500/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[15%] left-[15%] h-96 w-96 rounded-full bg-indigo-500/5 blur-3xl pointer-events-none" />

      {/* Primary Sticky Header */}
      <header
        id="app-header"
        className="sticky top-0 z-40 w-full border-b border-white/5 bg-[#030303]/80 backdrop-blur-md px-6 py-4"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button
            onClick={() => handleScrollToSection("hero")}
            className="flex items-center gap-2 text-left cursor-pointer transition hover:opacity-90"
          >
            <div className={`h-8 w-8 rounded-lg bg-gradient-to-br ${getAccentClass("gradient")} flex items-center justify-center text-white font-bold font-sans text-sm shadow-lg shadow-indigo-500/10`}>
              OR
            </div>
            <div>
              <p className="text-sm font-semibold text-white font-sans tracking-tight">OmidReza</p>
              <p className="text-[10px] text-zinc-500 font-mono">@itzOmidReza</p>
            </div>
          </button>

          {/* Desktop Navigation Link items */}
          <nav id="desktop-nav" className="hidden md:flex items-center gap-7 text-xs font-sans font-medium text-zinc-400">
            {[
              { id: "about", label: "Engineer" },
              { id: "tech", label: "Frameworks" },
              { id: "projects", label: "Projects" },
              { id: "workflow", label: "Pipeline" },
              { id: "beyond", label: "Beyond Code" },
              { id: "contact", label: "Contact" },
            ].map((link) => {
              const isCurrent = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  id={`nav-link-${link.id}`}
                  className={`hover:text-white transition cursor-pointer relative py-1 ${
                    isCurrent ? `${getAccentClass("text")} font-semibold` : ""
                  }`}
                  onClick={() => handleScrollToSection(link.id)}
                >
                  {link.label}
                  {isCurrent && (
                    <span className={`absolute bottom-0 left-0 right-0 h-0.5 ${getAccentClass("bg")} rounded`} />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Utilities row */}
          <div className="flex items-center gap-3">
            {/* Quick search button */}
            <button
              id="search-trigger-btn"
              onClick={() => setCommandPaletteOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/5 bg-zinc-950 hover:bg-zinc-900/60 text-zinc-400 hover:text-zinc-200 transition text-[10px] cursor-pointer font-mono uppercase tracking-[0.1em]"
              title="Search commands (⌘K)"
            >
              <Search className="h-3.5 w-3.5" />
              <span className="hidden sm:inline font-mono">⌘K</span>
            </button>

            {/* Mobile Sidebar open */}
            <button
              id="mobile-nav-toggle"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="md:hidden p-2 rounded-lg border border-white/5 text-zinc-400 hover:text-zinc-200 cursor-pointer"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer menu sidebar fallback */}
      {mobileMenuOpen && (
        <div
          id="mobile-drawer-backdrop"
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex justify-end"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            id="mobile-drawer"
            className="w-full max-w-xs bg-[#0a0a0a] border-l border-white/10 h-full p-6 flex flex-col justify-between"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-white/5">
                <span className="text-sm font-semibold text-white font-sans">System Navigation</span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 rounded border border-white/10 text-zinc-500 hover:text-indigo-400 cursor-pointer"
                >
                  <X className="h-4.5 w-4.5" />
                </button>
              </div>

              <div className="flex flex-col gap-5 pt-8 text-sm font-medium font-sans text-zinc-300">
                {[
                  { id: "about", label: "Engineer Profile" },
                  { id: "tech", label: "Competencies" },
                  { id: "projects", label: "Performance Projects" },
                  { id: "workflow", label: "Architecture Workflow" },
                  { id: "beyond", label: "Timeline & Judo" },
                  { id: "contact", label: "Dispatch Message" },
                ].map((item) => (
                  <button
                    key={item.id}
                    id={`mobile-nav-${item.id}`}
                    onClick={() => handleScrollToSection(item.id)}
                    className="text-left py-1 hover:text-indigo-400 transition cursor-pointer"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-white/5 text-2xs text-zinc-500 font-sans space-y-2">
              <p>Email: itzomidreza@gmail.com</p>
              <p>© 2026 itzOmidReza portfolio</p>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section Container */}
      <section id="hero" className="py-20 lg:py-28 px-6 border-b border-white/5 bg-gradient-to-br from-zinc-900/20 to-black relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Hero text branding info */}
          <div id="hero-marketing" className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-zinc-300 text-xs font-mono">
              <Sparkles className="h-3.5 w-3.5 text-indigo-400 animate-pulse" />
              <span>SYSTEM_READY // 0x2A4F</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight font-sans tracking-tight">
              Software Engineering Student &amp;{" "}
              <span className={`bg-gradient-to-r ${getAccentClass("gradient")} bg-clip-text text-transparent`}>
                Full-Stack Architect
              </span>
            </h1>

            <p className="text-sm font-sans text-zinc-400 leading-relaxed max-w-xl">
              Hello, I am <span className="text-white font-semibold">OmidReza (itzOmidReza)</span>. I combine rigorous design systems thinking with raw computer science principles to prototype and deploy secure, high-throughput backend layers and type-safe frontends.
            </p>

            <div className="flex flex-wrap gap-3.5 text-xs font-sans font-bold pt-2">
              <button
                id="hero-view-projects-btn"
                onClick={() => handleScrollToSection("projects")}
                className="px-6 py-3 bg-white text-black hover:bg-zinc-200 rounded-xl font-bold text-sm shadow-lg shadow-white/5 transition duration-200 cursor-pointer flex items-center gap-1.5"
              >
                VIEW PROJECTS <ChevronRight className="h-4 w-4" />
              </button>
              <button
                id="hero-contact-btn"
                onClick={() => handleScrollToSection("contact")}
                className="px-6 py-3 bg-white/5 border border-white/10 text-white hover:bg-white/10 rounded-xl font-bold text-sm transition duration-200 cursor-pointer"
              >
                CONTACT ME
              </button>
            </div>

            {/* Quick horizontal telemetry statistics metrics */}
            <div id="hero-metrics-grid" className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 border-t border-white/5">
              <div>
                <span className="text-zinc-650 text-[10px] uppercase font-mono tracking-wide block">CURRICULUM FOCUS</span>
                <span className="text-xs font-bold text-zinc-300 font-sans mt-0.5 block">Scalable Software Arch</span>
              </div>
              <div>
                <span className="text-zinc-650 text-[10px] uppercase font-mono tracking-wide block">CORE MARTIAL ART</span>
                <span className="text-xs font-bold text-zinc-300 font-sans mt-0.5 block">Judo (Determination)</span>
              </div>
              <div>
                <span className="text-zinc-650 text-[10px] uppercase font-mono tracking-wide block">STACK CORES</span>
                <span className="text-xs font-bold text-zinc-300 font-sans mt-0.5 block">Nuxt 3 / NestJS / ML</span>
              </div>
            </div>
          </div>

          {/* Code Sandbox Terminal or Interactive Area */}
          <div id="hero-interactive" className="lg:col-span-6 space-y-4">
            <div className="flex items-center justify-between border-b border-white/5 pb-2 text-2xs text-zinc-500 font-sans">
              <span>SANDBOX STAGE CONSOLE</span>
              <button
                className="text-indigo-400 underline text-[10px] cursor-pointer"
                onClick={() => setShowEmbeddedConsole((prev) => !prev)}
              >
                {showEmbeddedConsole ? "Collapse diagnostics shell" : "Deploy diagnostics shell"}
              </button>
            </div>

            {showEmbeddedConsole ? (
              <Terminal accentClass={getAccentClass("text")} />
            ) : (
              <div className="rounded-xl border border-slate-900 bg-slate-950/40 p-12 text-center text-slate-500 font-sans text-xs">
                Diagnostics disabled. Click the switch in the upper corner to reboot.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* About Section Container */}
      <section id="about" className="py-20 lg:py-24 px-6 max-w-7xl mx-auto border-b border-white/5">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Identity narrative panel */}
          <div id="about-narrative" className="lg:col-span-5 space-y-5">
            <span className="text-[10px] text-indigo-400 font-mono tracking-widest uppercase block">
              ENGINEER IDENTITY
            </span>
            <h2 className="text-2xl font-bold text-white font-sans tracking-tight leading-tight">
              Mixing clean modular engineering with tactical designs
            </h2>
            <p className="text-xs text-zinc-400 font-sans leading-relaxed">
              I am an engineering student deeply specialized in constructing software systems that thrive in high pressure networks. By balancing complex backend transactions (Node, NestJS, Postgres) alongside elegant visual outputs (Vue 3, Nuxt 3, React), I deliver fullstack tools that are clean under the hood and gorgeous in front of client targets.
            </p>
            <p className="text-xs text-zinc-400 font-sans leading-relaxed">
              I place extreme trust in automated pipelines, modular folder separation, and generic type structures. The discipline and consistency that keeps me executing flawless code traces directly to Judo practice, shaping my professional patience and persistence.
            </p>
          </div>

          {/* Achievements Grid blocks */}
          <div id="about-grids" className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl border border-white/5 bg-[#0a0a0a] space-y-2 hover:border-white/10 transition duration-300">
              <div className="h-8 w-8 rounded-lg bg-indigo-500/10 border border-indigo-500/15 flex items-center justify-center text-indigo-400">
                <Layers className="h-4.5 w-4.5" />
              </div>
              <h3 className="text-xs font-bold text-white mt-1 font-sans">Architectural Integrity</h3>
              <p className="text-2s text-zinc-500 font-sans leading-relaxed">
                Prioritizing clean dependency structures, atomic components configurations, and type-safe ledgers to streamline peer onboarding.
              </p>
            </div>

            <div className="p-5 rounded-2xl border border-white/5 bg-[#0a0a0a] space-y-2 hover:border-white/10 transition duration-300">
              <div className="h-8 w-8 rounded-lg bg-indigo-500/10 border border-indigo-500/15 flex items-center justify-center text-indigo-400">
                <Award className="h-4.5 w-4.5" />
              </div>
              <h3 className="text-xs font-bold text-white mt-1 font-sans">Judo Focus</h3>
              <p className="text-2s text-zinc-500 font-sans leading-relaxed">
                An indomitable drive for balance under high stress, turning challenging server glitches into simple procedural tasks.
              </p>
            </div>

            <div className="p-5 rounded-2xl border border-white/5 bg-[#0a0a0a] space-y-2 hover:border-white/10 transition duration-300">
              <div className="h-8 w-8 rounded-lg bg-indigo-500/10 border border-indigo-500/15 flex items-center justify-center text-indigo-400">
                <Cpu className="h-4.5 w-4.5" />
              </div>
              <h3 className="text-xs font-bold text-white mt-1 font-sans">Futuristic Web AI</h3>
              <p className="text-2s text-zinc-500 font-sans leading-relaxed">
                Adopting large language models prompt integrations, function calling schemas, and statistical analysis directly inside production setups.
              </p>
            </div>

            <div className="p-5 rounded-2xl border border-white/5 bg-[#0a0a0a] space-y-2 hover:border-white/10 transition duration-300">
              <div className="h-8 w-8 rounded-lg bg-indigo-500/10 border border-indigo-500/15 flex items-center justify-center text-indigo-400">
                <Mail className="h-4.5 w-4.5" />
              </div>
              <h3 className="text-xs font-bold text-white mt-1 font-sans">Agile Communication</h3>
              <p className="text-2s text-zinc-500 font-sans leading-relaxed">
                Providing precise design proposals, clean task breakdowns, and consistent status checks inside globally-distributed teams.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack Competency Section */}
      <section id="tech" className="py-20 lg:py-24 px-6 max-w-7xl mx-auto border-b border-white/5">
        <div className="space-y-12">
          <div className="max-w-xl space-y-3">
            <span className="text-[10px] text-indigo-400 font-mono tracking-widest uppercase block">
              COMPETENCY ARCHIVES
            </span>
            <h2 className="text-2xl font-bold text-white font-sans tracking-tight">
              My Categorized Technical Stack
            </h2>
            <p className="text-xs text-zinc-400 font-sans">
              Explore my technical tools catalog. Filter by engineering category and click a row to analyze my usage, mastery coefficient, and procedural experience.
            </p>
          </div>

          <TechUniverse />
        </div>
      </section>

      {/* Projects Showcase Ledger Section */}
      <section id="projects" className="py-20 lg:py-24 px-6 max-w-7xl mx-auto border-b border-white/5">
        <div className="space-y-12">
          <div className="max-w-xl space-y-3">
            <span className="text-[10px] text-indigo-400 font-mono tracking-widest uppercase block">
              PORTFOLIO LEDGER
            </span>
            <h2 className="text-2xl font-bold text-white font-sans tracking-tight">
              Production Assemblies &amp; Labs
            </h2>
            <p className="text-xs text-zinc-400 font-sans">
              A curated catalog of software systems built at the crossroads of scale, clean interface mechanics, and AI processing nodes.
            </p>
          </div>

          <ProjectsShowcase />
        </div>
      </section>

      {/* Workflow Architecture pipeline section */}
      <section id="workflow" className="py-20 lg:py-24 px-6 max-w-7xl mx-auto border-b border-white/5">
        <div className="space-y-12">
          <div className="max-w-xl space-y-3">
            <span className="text-[10px] text-indigo-400 font-mono tracking-widest uppercase block">
              DESIGN PHILOSOPHIES
            </span>
            <h2 className="text-2xl font-bold text-white font-sans tracking-tight">
              Core Workflow Pipeline
            </h2>
            <p className="text-xs text-zinc-400 font-sans">
              My development philosophy focuses on rapid delivery followed by structural refactoring. Step through the stages below to review how I approach modular scalability.
            </p>
          </div>

          <ArchitecturePipeline />
        </div>
      </section>

      {/* Experimental Digital twin AI Section */}
      <section id="ai-twin-section" className="py-20 lg:py-24 px-6 max-w-7xl mx-auto border-b border-white/5">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Conceptual description of AI twin */}
          <div id="ai-conceptual" className="lg:col-span-5 space-y-5">
            <span className="text-[10px] text-indigo-400 font-mono tracking-widest uppercase block">
              INTELLIGENT EXPERIMENTS
            </span>
            <h2 className="text-2xl font-bold text-white font-sans tracking-tight leading-tight">
              Consult My AI Digital Clone
            </h2>
            <p className="text-xs text-zinc-400 font-sans leading-relaxed">
              To represent our focus on machine learning and intelligent user interfaces, I deployed an interactive representation of my identity directly onto this page. This clone is tuned with my experience profiles and professional philosophies.
            </p>
            <div className="rounded-xl border border-white/5 bg-[#0a0a0a] p-4 font-sans text-2xs space-y-2 text-zinc-400">
              <p className="font-semibold text-white">How it operates under the hood:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Server intercepts triggers safely on node backends.</li>
                <li>Uses <span className="text-indigo-400 font-semibold">Gemini 3.5 Flash</span> to analyze query parameters.</li>
                <li>Hydrates conversational responses reflecting my structured lore.</li>
              </ul>
            </div>
          </div>

          {/* AI clone box interface */}
          <div id="ai-chat-box" className="lg:col-span-7">
            <AiChat />
          </div>
        </div>
      </section>

      {/* Beyond Code (Judo milestones) section */}
      <section id="beyond" className="py-20 lg:py-24 px-6 max-w-7xl mx-auto border-b border-white/5">
        <div className="space-y-12">
          <div className="max-w-xl space-y-3">
            <span className="text-[10px] text-indigo-400 font-mono tracking-widest uppercase block">
              DISCIPLINED BEYOND
            </span>
            <h2 className="text-2xl font-bold text-white font-sans tracking-tight">
              Beyond the Editor
            </h2>
            <p className="text-xs text-zinc-400 font-sans">
              Learn about OmidReza's hobbies and habits that keep him sharp. Judo, strategy games, and personal milestones that shape his continuous training mindset.
            </p>
          </div>

          <BeyondCode />
        </div>
      </section>

      {/* Contact Section Box */}
      <section id="contact" className="py-20 lg:py-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Quick connections detail column */}
          <div id="contact-credentials" className="lg:col-span-5 space-y-6">
            <span className="text-[10px] text-indigo-400 font-mono tracking-widest uppercase block">
              COMMUNICATION ROUTERS
            </span>
            <h2 className="text-2xl font-bold text-white font-sans tracking-tight">
              Initiate Secure Connection
            </h2>
            <p className="text-xs text-zinc-400 font-sans leading-relaxed">
              Have an opening in high performance web applications setups? Or want to brainstorm custom Nuxt/Nest solutions? Dispatch a secure query directly, or reach out on any of my active portals.
            </p>

            <div className="font-sans text-xs space-y-3 border-y border-white/5 py-5">
              <div className="flex items-center gap-3">
                <span className="text-zinc-[650] uppercase font-mono text-[9px] w-20 shrink-0">EMAIL:</span>
                <a href="mailto:itzomidreza@gmail.com" className="hover:text-indigo-400 text-zinc-350 font-medium transition">
                  itzomidreza@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-zinc-[650] uppercase font-mono text-[9px] w-20 shrink-0">GITHUB:</span>
                <a href="https://github.com/itzOmidReza" target="_blank" rel="noreferrer" className="hover:text-indigo-400 text-zinc-350 font-medium transition">
                  github.com/itzOmidReza
                </a>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-zinc-[650] uppercase font-mono text-[9px] w-20 shrink-0">LINKEDIN:</span>
                <a href="https://linkedin.com/in/OmidReza" target="_blank" rel="noreferrer" className="hover:text-indigo-400 text-zinc-350 font-medium transition">
                  linkedin.com/in/OmidReza
                </a>
              </div>
            </div>

            <p className="text-[10px] text-zinc-500 font-mono">
              Active Location: London, UK / Available for remote pipelines globally.
            </p>
          </div>

          {/* Secure interactive message form */}
          <div id="contact-form-col" className="lg:col-span-7">
            <div className="rounded-2xl border border-white/5 bg-[#0a0a0a] p-6 lg:p-8 relative overflow-hidden">
              <div className="absolute -right-20 -bottom-20 h-44 w-44 rounded-full bg-indigo-500/5 blur-3xl" />

              <span className="text-[9px] text-zinc-500 font-mono uppercase tracking-widest block mb-4">
                MESSAGE GATEWAY
              </span>

              {formSuccess ? (
                <div id="form-success-alert" className="py-8 text-center space-y-4">
                  <div className="h-12 w-12 rounded-full bg-indigo-950/25 border border-indigo-500/35 flex items-center justify-center text-indigo-400 mx-auto text-sm">
                    ✓
                  </div>
                  <h3 className="text-sm font-bold text-white font-sans">Message Dispatched Seamlessly</h3>
                  <p className="text-xs text-zinc-400 font-sans max-w-sm mx-auto leading-relaxed">
                    Thank you! Your communication tag has been successfully parsed into my logs. I will respond to your provided address shortly.
                  </p>
                  <button
                    onClick={() => setFormSuccess(false)}
                    className="text-2xs text-indigo-400 underline font-mono cursor-pointer"
                  >
                    Reset transfer gateway
                  </button>
                </div>
              ) : (
                <form id="contact-form" onSubmit={handleContactSubmit} className="space-y-4.5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5 focus-within:text-indigo-400">
                      <label htmlFor="form-name-input" className="text-[10px] text-zinc-400 font-sans font-medium">
                        Your Identity / Name
                      </label>
                      <input
                        id="form-name-input"
                        type="text"
                        className="w-full bg-[#0d0d0d] text-xs text-white placeholder-zinc-650 px-4 py-2.5 rounded-xl border border-white/5 focus:outline-none focus:ring-1 focus:ring-indigo-500/50 font-sans"
                        placeholder="e.g. John Doe"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        disabled={formLoading}
                      />
                    </div>

                    <div className="space-y-1.5 focus-within:text-indigo-400">
                      <label htmlFor="form-email-input" className="text-[10px] text-zinc-400 font-sans font-medium">
                        Your Return Email
                      </label>
                      <input
                        id="form-email-input"
                        type="email"
                        className="w-full bg-[#0d0d0d] text-xs text-white placeholder-zinc-650 px-4 py-2.5 rounded-xl border border-white/5 focus:outline-none focus:ring-1 focus:ring-indigo-500/50 font-sans"
                        placeholder="e.g. name@company.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        disabled={formLoading}
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5 focus-within:text-indigo-400">
                    <label htmlFor="form-message-input" className="text-[10px] text-zinc-400 font-sans font-medium">
                      Brief Message Details
                    </label>
                    <textarea
                      id="form-message-input"
                      rows={4}
                      className="w-full bg-[#0d0d0d] text-xs text-white placeholder-zinc-650 px-4 py-2.5 rounded-xl border border-white/5 focus:outline-none focus:ring-1 focus:ring-indigo-500/50 font-sans leading-relaxed"
                      placeholder="Outline details or schedules for custom contracts..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                      disabled={formLoading}
                    />
                  </div>

                  {formError && (
                    <div className="text-2xs text-red-400 font-sans p-3 bg-red-950/10 border border-red-900/20 rounded">
                      {formError}
                    </div>
                  )}

                  <button
                    id="form-submit-btn"
                    disabled={formLoading}
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition cursor-pointer shadow-lg shadow-indigo-500/10"
                  >
                    {formLoading ? (
                      <>Analyzing transmission parameters...</>
                    ) : (
                      <>
                        Dispatch Secure Message <Send className="h-3.5 w-3.5" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Primary Footer */}
      <footer id="app-footer" className="px-6 py-10 max-w-7xl mx-auto">
        <div className="px-8 py-5 bg-white/5 border border-white/10 rounded-[24px] backdrop-blur-md text-2xs text-zinc-400 font-sans">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className={`h-6 w-6 rounded-md bg-gradient-to-br ${getAccentClass("gradient")} flex items-center justify-center text-white font-bold text-[10px] shadow-sm shadow-indigo-500/10`}>
                OR
              </div>
              <span>Designed &amp; built by OmidReza (itzOmidReza) • 2026 Ledger</span>
            </div>

            <div className="flex gap-6">
              <a href="https://github.com/itzOmidReza" target="_blank" rel="noreferrer" className="hover:text-indigo-400 transition font-medium">
                GitHub
              </a>
              <a href="https://linkedin.com/in/OmidReza" target="_blank" rel="noreferrer" className="hover:text-indigo-400 transition font-medium">
                LinkedIn
              </a>
              <a href="mailto:itzomidreza@gmail.com" className="hover:text-indigo-400 transition font-medium">
                Email
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Globally tracked Command Palette Overlay */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        onNavigate={(sectionId) => handleScrollToSection(sectionId)}
        onOpenTerminal={() => {
          setShowEmbeddedConsole(true);
          handleScrollToSection("hero");
        }}
        onOpenAiChat={() => {
          handleScrollToSection("ai-twin-section");
        }}
        onAccentChange={(newAccent) => {
          setAccent(newAccent);
        }}
      />
    </div>
  );
}
