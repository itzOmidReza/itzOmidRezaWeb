import { useState } from "react";
import { Cpu, RotateCcw, ShieldCheck, Box, Layers, Zap } from "lucide-react";
import { WorkflowStep } from "../types";

export default function ArchitecturePipeline() {
  const [activeStep, setActiveStep] = useState<string>("step-1");

  const steps: WorkflowStep[] = [
    {
      id: "step-1",
      title: "MVP Formulation",
      description: "Define boundaries & quickly establish basic workflow flow schemas.",
      details: [
        "Rapid prototyping directly aiming at target constraints",
        "Rigorous feature pruning to deliver high-quality core outcomes",
        "Setup baseline telemetry and container interfaces",
      ],
    },
    {
      id: "step-2",
      title: "Modular Refactoring",
      description: "Extract clean abstraction boundaries, isolate modules, and define explicit types.",
      details: [
        "Decouple state engines and utility helpers",
        "Introduce type-safe interface contracts and global ledgers",
        "Refactor structures into maintainable, low-coupling subfolders",
      ],
    },
    {
      id: "step-3",
      title: "Testing & Validation",
      description: "Enforce rigorous linting and verify stability of core functional paths.",
      details: [
        "Automated linter checks with strict TS typings",
        "Unit and integration mock tests covering critical APIs",
        "Manual edge-case boundary debugging of asynchronous hooks",
      ],
    },
    {
      id: "step-4",
      title: "Scalable CI/CD",
      description: "Automate delivery and container health with Docker and GitHub actions.",
      details: [
        "Docker multi-stage secure builds optimized for memory",
        "GitHub Actions automation pipelines with rollback safety limits",
        "Cloud Run telemetry endpoints with lazy resource boot setups",
      ],
    },
  ];

  return (
    <div id="architecture-pipeline-grid" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Horizontal / Vertical Stepper visualizer */}
      <div id="pipeline-nodes-column" className="lg:col-span-5 space-y-4">
        {steps.map((st, idx) => {
          const isActive = st.id === activeStep;
          return (
            <div key={st.id} className="relative">
              {/* Connector line for list items */}
              {idx < steps.length - 1 && (
                <div className="absolute left-7.5 top-12 bottom-0 w-0.5 bg-gradient-to-b from-white/10 to-white/2 z-0 h-10" />
              )}
              
              <button
                id={`workflow-step-btn-${st.id}`}
                className={`w-full flex items-start gap-4 p-4 rounded-xl text-left border transition-all duration-300 z-10 relative cursor-pointer ${
                  isActive
                    ? "bg-white/5 border-white/10 shadow-[0_0_20px_rgba(99,102,241,0.06)]"
                    : "bg-[#0a0a0a] border-white/5 hover:border-white/10"
                }`}
                onClick={() => setActiveStep(st.id)}
              >
                <div
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg font-mono text-xs font-bold border transition ${
                    isActive
                      ? "border-indigo-500 bg-indigo-500/10 text-indigo-400 font-bold"
                      : "border-white/5 bg-[#0a0a0a] text-zinc-500"
                  }`}
                >
                  0{idx + 1}
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <p className={`text-xs font-semibold font-sans ${isActive ? "text-indigo-400" : "text-zinc-300"}`}>
                      {st.title}
                    </p>
                    {isActive && <Zap className="h-3 w-3 text-indigo-400 fill-indigo-500/10 animate-pulse" />}
                  </div>
                  <p className="text-2xs text-zinc-500 mt-1 font-sans leading-relaxed">
                    {st.description}
                  </p>
                </div>
              </button>
            </div>
          );
        })}
      </div>

      {/* Detailed Node Presentation pane */}
      <div id="pipeline-details-pane" className="lg:col-span-7">
        {(() => {
          const current = steps.find((s) => s.id === activeStep)!;
          return (
            <div className="h-full rounded-2xl border border-white/5 bg-[#0a0a0a] p-6 lg:p-8 flex flex-col justify-between relative overflow-hidden shadow-xl">
              {/* Decorative faint background mesh */}
              <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-indigo-500/5 blur-3xl" />
              <div className="absolute -left-16 -bottom-16 h-40 w-40 rounded-full bg-indigo-550/5 blur-3xl" />

              <div>
                <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-5">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-[#0d0d0d] border border-white/5 flex items-center justify-center text-indigo-400">
                      {activeStep === "step-1" && <Box className="h-4.5 w-4.5" />}
                      {activeStep === "step-2" && <Layers className="h-4.5 w-4.5" />}
                      {activeStep === "step-3" && <ShieldCheck className="h-4.5 w-4.5" />}
                      {activeStep === "step-4" && <RotateCcw className="h-4.5 w-4.5" />}
                    </div>
                    <div>
                      <span className="text-[10px] text-indigo-400 uppercase font-mono tracking-widest leading-none block font-medium">
                        ARCHITECTURE METHODOLOGY
                      </span>
                      <p className="text-sm font-semibold text-white mt-1 font-sans tracking-wide">
                        {current.title}
                      </p>
                    </div>
                  </div>
                  <span className="text-2xs font-mono text-zinc-400 bg-[#0d0d0d] px-2.5 py-1 rounded border border-white/5">
                    STAGE ACTIVE
                  </span>
                </div>

                <div className="space-y-4">
                  <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                    {current.description}
                  </p>

                  <div className="space-y-3.5 mt-2">
                    {current.details.map((detail, dIdx) => (
                      <div key={dIdx} className="flex items-start gap-3">
                        <div className="h-5 w-5 rounded-full bg-[#0d0d0d] border border-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0 text-3xs font-mono select-none mt-0.5">
                          ✓
                        </div>
                        <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                          {detail}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-5 border-t border-white/5 flex items-center justify-between text-2xs text-zinc-500 font-sans">
                <div className="flex items-center gap-2">
                  <Cpu className="h-3 w-3 text-zinc-400" />
                  <span>Dynamic Design Telemetry</span>
                </div>
                <span>Module Ref: workflow_{activeStep.replace("-", "_")}</span>
              </div>
            </div>
          );
        })()}
      </div>
    </div>
  );
}
