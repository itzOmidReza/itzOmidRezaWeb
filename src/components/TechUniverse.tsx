import { useState } from "react";
import { Code, Server, Brain, Wrench, Sparkles, ChevronRight } from "lucide-react";

interface Skill {
  name: string;
  level: number;
  info: string;
  color: string;
}

interface Category {
  id: string;
  title: string;
  desc: string;
  icon: any;
  skills: Skill[];
}

export default function TechUniverse() {
  const [activeCategory, setActiveCategory] = useState<string>("frontend");
  const [focusedSkill, setFocusedSkill] = useState<Skill | null>(null);

  const categories: Category[] = [
    {
      id: "frontend",
      title: "Front-End",
      desc: "Pixel-perfect interfaces focusing on Vue 3 / Nuxt and modern reactive state engines.",
      icon: Code,
      skills: [
        { name: "Vue.js / Nuxt 3", level: 95, info: "Expert in SSR, static rendering, composables state design, and hook architectures.", color: "from-emerald-500 to-teal-500" },
        { name: "React / Vite", level: 90, info: "Deep knowledge of hooks, bundle sizing optimizations, virtual DOM pipelines, and modular routing.", color: "from-blue-500 to-cyan-500" },
        { name: "TypeScript", level: 92, info: "Strict type safety, generic utilities, mapped tuples, and advanced interface contracts.", color: "from-blue-600 to-indigo-500" },
        { name: "Tailwind CSS", level: 95, info: "High-level design systems, utility structure refactoring, theme configurations, and custom animations.", color: "from-sky-500 to-indigo-500" },
      ],
    },
    {
      id: "backend",
      title: "Back-End & APIs",
      desc: "Robust architectural servers handling secure routing and persistent queries.",
      icon: Server,
      skills: [
        { name: "Node.js", level: 90, info: "Event-loop optimizations, asynchronous file systems streaming, and cluster multi-threading.", color: "from-green-600 to-emerald-500" },
        { name: "NestJS", level: 85, info: "Clean architecture, dependency injection layers, modular structural nodes, and guards validation.", color: "from-red-600 to-pink-500" },
        { name: "PostgreSQL", level: 88, info: "Complex transactional pooling, custom composite indexes, and strict normalized schema structures.", color: "from-blue-750 to-indigo-600" },
        { name: "MongoDB", level: 85, info: "Document structures design, high-performance aggregation pipelines, and secondary clustering.", color: "from-green-500 to-emerald-600" },
        { name: "REST / GraphQL", level: 90, info: "Comprehensive endpoint contract validation, query throttling, and state hydration endpoints.", color: "from-pink-600 to-purple-500" },
      ],
    },
    {
      id: "ai",
      title: "AI & Data Science",
      desc: "Intelligent analytics engines integrating deep LLM prompts with descriptive analysis.",
      icon: Brain,
      skills: [
        { name: "Python", level: 80, info: "Scripting, asynchronous web servers, object-oriented custom layers, and matrix data structures.", color: "from-yellow-500 to-blue-500" },
        { name: "pandas", level: 75, info: "Detailed statistical cleaning, Series/DataFrame manipulations, index-based querying, and data CSV pipelines.", color: "from-purple-500 to-pink-500" },
        { name: "scikit-learn basics", level: 65, info: "Baseline linear modeling regression, classification boundaries, Clustering, and train/test scoring.", color: "from-orange-500 to-yellow-500" },
        { name: "AI APIs (Gemini)", level: 85, info: "Multi-modal schema declarations, functional calling bindings, contextual chat queues, and TTS outputs.", color: "from-indigo-500 to-purple-500" },
      ],
    },
    {
      id: "tools",
      title: "DevOps & Tools",
      desc: "Automating validation gates to keep integration tests bulletproof.",
      icon: Wrench,
      skills: [
        { name: "Docker", level: 82, info: "Image layering caching optimizations, secure minimal alpine multi-stages, and compose service networks.", color: "from-blue-500 to-sky-400" },
        { name: "GitHub Actions", level: 85, info: "Fully automated CI/CD runners, lint gates trigger setups, bundle analysis, and deploy releases.", color: "from-slate-700 to-slate-500" },
        { name: "Figma", level: 78, info: "High-fidelity modern mockups, responsive grid layouts, vector component structures, and design tokens.", color: "from-purple-500 to-orange-500" },
        { name: "Jest / Testing tools", level: 80, info: "Functional testing, mock assertions, structural coverage reports, and end-to-end regression scripts.", color: "from-red-500 to-pink-500" },
      ],
    },
  ];

  const currentCategory = categories.find((c) => c.id === activeCategory)!;

  // Initialize focused skill with the first of current category on hover/load
  const handleCategorySelect = (id: string) => {
    setActiveCategory(id);
    const cat = categories.find((c) => c.id === id)!;
    setFocusedSkill(cat.skills[0]);
  };

  const currentFocusedSkill = focusedSkill || currentCategory.skills[0];

  return (
    <div id="tech-universe-container" className="space-y-6">
      {/* Category Selection Tabs */}
      <div id="tech-tabs-grid" className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = cat.id === activeCategory;
          return (
            <button
              key={cat.id}
              id={`tech-cat-btn-${cat.id}`}
              className={`flex items-center gap-3 p-3.5 rounded-xl border text-left transition-all duration-200 cursor-pointer ${
                isActive
                  ? "bg-white/5 border-white/10 shadow-[0_0_15px_rgba(99,102,241,0.05)]"
                  : "bg-[#0a0a0a] border-white/5 hover:border-white/10 hover:bg-[#0d0d0d]"
              }`}
              onClick={() => handleCategorySelect(cat.id)}
            >
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-lg border ${
                  isActive
                    ? "border-indigo-500/30 bg-indigo-500/10 text-indigo-400"
                    : "border-white/5 bg-[#0a0a0a] text-zinc-500"
                }`}
              >
                <Icon className="h-4.5 w-4.5" />
              </div>
              <div>
                <p className={`text-xs font-semibold font-sans leading-none ${isActive ? "text-indigo-400" : "text-zinc-300"}`}>
                  {cat.title}
                </p>
                <span className="text-[9px] text-zinc-500 font-sans mt-1 block">
                  {cat.skills.length} nodes active
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Main detail ledger */}
      <div id="tech-grid" className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
        {/* Dynamic Slider meters */}
        <div id="tech-meters" className="md:col-span-7 rounded-2xl border border-white/5 bg-[#0a0a0a] p-6 space-y-5">
          <div id="tech-meters-hdr" className="border-b border-white/5 pb-3 flex items-center justify-between">
            <p className="text-2xs text-zinc-500 uppercase font-mono tracking-widest">
              COMPETENCY SCORES
            </p>
            <span className="text-[10px] text-zinc-400 font-sans flex items-center gap-1.5 font-medium">
              <Sparkles className="h-3 w-3 text-indigo-400 animate-pulse" /> Click row to inspect node details
            </span>
          </div>

          <div id="tech-skills-stack" className="space-y-4">
            {currentCategory.skills.map((sk) => {
              const isFocused = sk.name === currentFocusedSkill?.name;
              return (
                <button
                  key={sk.name}
                  id={`skill-meter-row-${sk.name.replace(/\s+/g, "-")}`}
                  className={`w-full text-left rounded-lg p-3 transition border ${
                    isFocused
                      ? "bg-white/5 border-indigo-500/30"
                      : "bg-transparent border-transparent hover:bg-white/2"
                  }`}
                  onClick={() => setFocusedSkill(sk)}
                >
                  <div className="flex items-center justify-between font-sans mb-1.5 text-xs">
                    <span className="font-semibold text-white flex items-center gap-1.5">
                      {sk.name}
                      {isFocused && <span className="h-1.5 w-1.5 rounded-full bg-indigo-500 shadow-sm shadow-indigo-400" />}
                    </span>
                    <span className="font-mono text-zinc-400">{sk.level}%</span>
                  </div>
                  {/* Progress track */}
                  <div className="h-2 w-full rounded-full bg-[#0d0d0d] overflow-hidden border border-white/5 p-[1px]">
                    <div
                      className={`h-full rounded-full bg-gradient-to-r ${sk.color} transition-all duration-500`}
                      style={{ width: `${sk.level}%` }}
                    />
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected skill info pane */}
        <div id="tech-info-pane" className="md:col-span-5 rounded-2xl border border-white/5 bg-[#0a0a0a] p-6 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute -right-16 -top-16 h-32 w-32 rounded-full bg-indigo-500/5 blur-2xl" />

          <div id="tech-info-content" className="space-y-4">
            <div id="tech-info-hdr" className="flex items-center gap-2">
              <div className={`h-2.5 w-2.5 rounded-full bg-gradient-to-r ${currentFocusedSkill?.color}`} />
              <span className="text-[10px] text-zinc-500 uppercase font-mono tracking-widest">
                NODE METADATA DIAGNOSTICS
              </span>
            </div>

            <p className="text-sm font-bold text-white font-sans tracking-wide">
              {currentFocusedSkill?.name}
            </p>

            <p className="text-xs text-zinc-400 font-sans leading-relaxed">
              {currentFocusedSkill?.info}
            </p>

            <div className="rounded-xl border border-white/5 bg-[#0d0d0d] p-4 shrink-0 font-mono text-[10px] space-y-1.5 mt-2">
              <div className="flex justify-between">
                <span className="text-zinc-500">System State:</span>
                <span className="text-indigo-400 font-medium">PRODUCTION READY</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Integrity Score:</span>
                <span className="text-zinc-300">{currentFocusedSkill?.level}/100</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Execution Mode:</span>
                <span className="text-zinc-300">MODULAR / TYPE-SAFE</span>
              </div>
            </div>
          </div>

          <div id="tech-info-footer" className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-2xs text-zinc-500 font-sans">
            <span className="flex items-center gap-1.5">
              Knowledge Base <ChevronRight className="h-3 w-3 text-zinc-600" />
            </span>
            <span>Ref: {currentCategory.id}_stack</span>
          </div>
        </div>
      </div>
    </div>
  );
}
