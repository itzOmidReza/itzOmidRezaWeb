import { useState } from "react";
import { Award, ShieldAlert, Heart, Calendar } from "lucide-react";
import { TimelineEvent } from "../types";

export default function BeyondCode() {
  const [hoveredValue, setHoveredValue] = useState<string | null>(null);

  const keyValues = [
    {
      id: "eff",
      title: "Maximum Efficiency (Seiryoku-Zenyo)",
      desc: "An core judo axiom of directing power to achieve the highest possible outcome with optimal conservation of stress. Directly translates to highly refactored and lightweight server payloads.",
      icon: Award,
    },
    {
      id: "dis",
      title: "Iron Core Discipline",
      desc: "Waking up early, stepping on the tatami (judo mats), and facing grueling sparring drills. This shapes a mindset that thrives during long debugging cycles and complex system migrations.",
      icon: ShieldAlert,
    },
    {
      id: "res",
      title: "Mutual Benefit (Jita-Kyoei)",
      desc: "Growing together beside teammates and respecting adversaries. Drives an commitment to writing highly readable, well-commented modules that empower and assist peer team members.",
      icon: Heart,
    },
  ];

  const milestones: TimelineEvent[] = [
    {
      year: "2023",
      title: "Acquisition & Assembly",
      subtitle: "Software Engineering Student Enrollment",
      description: "Stepped deep into computer architectures, memory pointer schemas, and algorithmic basics.",
      tag: "Academics",
    },
    {
      year: "2024",
      title: "The Web Breakthrough",
      subtitle: "Full-Stack React & Node System Formulation",
      description: "Delivered first custom databases syncing real-time charts. Focused heavily on Express scalability queues and client state managers.",
      tag: "Engineering",
    },
    {
      year: "2025",
      title: "Framework Specialization",
      subtitle: "Vue 3, Nuxt 3 & NestJS Core Systems Adoption",
      description: "A major shift towards modular, SSR architectures. Mastered robust dependency injection networks, types contracts, and docker container setups.",
      tag: "Architecture",
    },
    {
      year: "2026",
      title: "Intelligent Interfaces",
      subtitle: "Machine Learning Concepts & Gemini AI Tool Hybridization",
      description: "Merging pure developer craftsmanship with LLM prompt functions and multi-modal schemas to deploy elite developer portfolio twins.",
      tag: "AI Frontier",
    },
  ];

  return (
    <div id="beyond-code-grid" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Judo Persona panel */}
      <div id="judo-persona-col" className="lg:col-span-5 space-y-6">
        <div className="rounded-2xl border border-white/5 bg-[#0a0a0a] p-6 relative overflow-hidden flex flex-col justify-between">
          <div>
            <span className="text-[10px] text-indigo-400 font-mono tracking-widest uppercase block mb-2 font-medium">
              MARTIAL PHILOSOPHY
            </span>
            <p className="text-sm font-bold text-white font-sans tracking-tight">
              Judo: The Discipline Behind Code
            </p>
            <p className="text-xs text-zinc-455 mt-2 font-sans leading-relaxed">
              Judo is not simply throwing an opponent — it is the science of redirection, leverage, and balance. I integrate Judo principles inside my daily routines to hammer down discipline, tactical analysis, and deep patience.
            </p>
          </div>

          <div className="mt-6 space-y-3.5 border-t border-white/5 pt-5">
            {keyValues.map((v) => {
              const Icon = v.icon;
              return (
                <div
                  key={v.id}
                  className={`flex gap-3 text-xs leading-relaxed transition-all ${
                    hoveredValue === v.id ? "opacity-100" : "opacity-75"
                  }`}
                  onMouseEnter={() => setHoveredValue(v.id)}
                  onMouseLeave={() => setHoveredValue(null)}
                >
                  <div className="h-7 w-7 rounded-lg bg-[#0d0d0d] border border-indigo-500/30 flex items-center justify-center text-indigo-400 shrink-0 mt-0.5">
                    <Icon className="h-3.5 w-3.5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white font-sans">{v.title}</h4>
                    <p className="text-2xs text-zinc-500 mt-0.5 font-sans leading-relaxed">{v.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Strategic gaming block */}
        <div className="rounded-xl border border-white/5 bg-[#0a0a0a] p-5 shrink-0 text-zinc-300">
          <p className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider mb-2.5">
            TACTICAL BREAKS: CHESS & STRATEGY
          </p>
          <p className="text-2xs text-zinc-400 font-sans leading-relaxed">
            Outside Judo and standard web assemblies, I dedicate breaks to chess and strategical video games. Visualizing logic pipelines 10 moves ahead keeps my mental pathways optimized for parsing convoluted database transactions.
          </p>
        </div>
      </div>

      {/* History timeline ledger */}
      <div id="timeline-col" className="lg:col-span-7 space-y-6">
        <div className="rounded-2xl border border-white/5 bg-[#0a0a0a] p-6 lg:p-8 space-y-6">
          <div className="border-b border-white/5 pb-3 flex items-center justify-between">
            <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest">
              PROFESSIONAL MILESTONES
            </span>
            <div className="text-2xs text-zinc-400 flex items-center gap-1.5 font-sans">
              <Calendar className="h-3.5 w-3.5 text-zinc-500" /> Active Student Ledger
            </div>
          </div>

          <div className="space-y-6 relative pl-3.5">
            {/* Elegant vertical progress divider */}
            <div className="absolute left-[3px] top-1.5 bottom-1.5 w-[1px] bg-white/5 z-0" />

            {milestones.map((ms, idx) => (
              <div key={idx} className="relative group/time">
                {/* Indicator bead */}
                <span className="absolute -left-[14.5px] top-1.5 h-2 w-2 rounded-full bg-[#030303] border border-indigo-500 z-10 transition group-hover/time:bg-[#030303] group-hover/time:border-indigo-400 group-hover/time:scale-110" />

                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                  <span className="text-2xs font-mono text-indigo-400 font-semibold leading-none">
                    {ms.year} • {ms.tag}
                  </span>
                  <span className="text-[10px] text-zinc-500 font-sans">OmidReza Milestone</span>
                </div>

                <h4 className="text-xs font-bold text-white mt-1 font-sans">
                  {ms.title}
                </h4>
                <p className="text-2xs text-zinc-400 font-sans">
                  {ms.subtitle}
                </p>
                <p className="text-2xs text-zinc-500 mt-1.5 font-sans leading-relaxed">
                  {ms.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
