import { useState } from "react";
import { Search, ExternalLink, GitFork, Minimize2, Terminal as CodeIcon, Server, Cpu, Award } from "lucide-react";
import { Project } from "../types";

export default function ProjectsShowcase() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filterCategories = [
    { id: "all", label: "All Work" },
    { id: "frontend", label: "Front-End" },
    { id: "backend", label: "Back-End" },
    { id: "ai", label: "AI Integrated" },
    { id: "fullstack", label: "Full-Stack" },
    { id: "experiment", label: "Experiments" },
  ];

  const projects: Project[] = [
    {
      id: "serene-ai",
      title: "Serene AI Dashboard",
      subtitle: "Multi-parameter real-time analytical triggers",
      description: "A premium analytical dashboard integrated with Gemini models to process text stream aggregates and predict workflow congestion schemas.",
      role: "Lead Full-Stack & Interface Designer",
      category: "ai",
      tags: ["React", "TypeScript", "Node.js", "Gemini API", "Recharts", "Tailwind CSS"],
      githubUrl: "https://github.com/itzOmidReza/serene-ai-dashboard",
      liveUrl: "https://portfolio-serene-mock.run.app",
      featured: true,
      challenges: [
        "Processing real-time unstructured logging streams without blocking browser execution queues",
        "Structuring deterministic multi-modal JSON responses using LLM prompt systems",
      ],
      solution: "Implemented Express queue brokers to stream JSON chunks using SSE, alongside rigorous zod schema casting validators in Node.",
      previewCode: `// Gemini API schema definition for telemetry extraction
import { Type } from "@google/genai";

const telemetrySchema = {
  type: Type.OBJECT,
  properties: {
    congestionLevel: { type: Type.NUMBER, description: "Congestion coefficient (0.00-1.00)" },
    reasons: { type: Type.ARRAY, items: { type: Type.STRING } },
    alerts: { type: Type.ARRAY, items: { type: Type.STRING } }
  },
  required: ["congestionLevel", "reasons"]
};

const res = await ai.models.generateContent({
  model: "gemini-3.5-flash",
  contents: streamDataString,
  config: { responseSchema: telemetrySchema, responseMimeType: "application/json" }
});`,
    },
    {
      id: "nest-auth-edge",
      title: "NestJS Auth Edge Service",
      subtitle: "Asymmetric JWT session key validation system",
      description: "A high-performance backend authentication service featuring modular dependency injection and sliding token verification gates.",
      role: "Backend Architect",
      category: "backend",
      tags: ["NestJS", "TypeScript", "PostgreSQL", "Docker", "Redis", "JWT"],
      githubUrl: "https://github.com/itzOmidReza/nestjs-auth-edge",
      featured: true,
      challenges: [
        "Handling massive concurrent session refresh validation polls without thrashing primary Postgres transactional pools",
      ],
      solution: "Engineered sliding multi-tiered redis tokens cache layers to store sessions validation tags, limiting Postgres lookups by up to 94%.",
      previewCode: `// NestJS Guard with sliding Redis cache validation
@Injectable()
export class SlidingAuthGuard implements CanActivate {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private jwtService: JwtService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractToken(request);
    
    // Check sliding cache first to preserve PostgreSQL limits
    const inCache = await this.cacheManager.get(\`session:\${token}\`);
    if (inCache) return true;
    
    return this.validateWithDb(token);
  }
}`,
    },
    {
      id: "nuxt-dynamic-node",
      title: "Nuxt Dynamic Node Canvas",
      subtitle: "SVG interactive visual graph nodes",
      description: "High-performance reactive tree layouts, custom animations, and layout persistence built on Nuxt 3 composables.",
      role: "Frontend Engineer",
      category: "frontend",
      tags: ["Nuxt 3", "Vue 3", "TypeScript", "Tailwind CSS", "Pinia", "SVG animations"],
      githubUrl: "https://github.com/itzOmidReza/nuxt-dynamic-node",
      liveUrl: "https://dynamic-nodes-preview.dev",
      challenges: [
        "Rendering hundreds of interconnected nodes in Vue without introducing layout flicker or re-rendering lags on state shifts.",
      ],
      solution: "Leveraged hardware-accelerated pure CSS animations paired with custom debounced state composables to lock layout updates.",
      previewCode: `<script setup lang="ts">
// Interactive node drag positioning composable in Nuxt 3
import { ref } from 'vue';

const useDragNode = (nodeId: string) => {
  const isDragging = ref(false);
  const position = ref({ x: 0, y: 0 });

  const handleDrag = (event: MouseEvent) => {
    if (!isDragging.value) return;
    position.value = {
      x: event.clientX,
      y: event.clientY
    };
  };

  return { isDragging, position, handleDrag };
};
</script>`,
    },
    {
      id: "judo-result-sync",
      title: "Judo League CRM Tracker",
      subtitle: "Tactical match and belt results visual ledger",
      description: "A secure tournament manager and registration CRM tracking judoka belt ranks, physical logs, and tournament brackets.",
      role: "Solo Developer",
      category: "fullstack",
      tags: ["React 19", "Node.js", "Express", "MongoDB", "Mongoose", "Tailwind CSS"],
      githubUrl: "https://github.com/itzOmidReza/judo-crm-manager",
      challenges: [
        "Dynamically structuring single-elimination tournament trees and syncing belt updates securely under strict database schemas.",
      ],
      solution: "Refactored tree brackets data structures as mapped generic tree nodes in Mongoose, backing instant offline state validations.",
      previewCode: `// Dynamic tournament bracket mapping schema
const MatchNodeSchema = new Schema({
  matchId: String,
  competitorA: { type: ObjectId, ref: 'Athlete' },
  competitorB: { type: ObjectId, ref: 'Athlete' },
  winner: { type: ObjectId, ref: 'Athlete' },
  childMatchId: String, // Single elimination link
  beltRequiredLevel: { type: String, enum: ['KYU_3', 'KYU_2', 'KYU_1', 'DAN_1'] }
});`,
    },
    {
      id: "pandas-ml-matrix",
      title: "Python pandas Data Sandbox",
      subtitle: "Descriptive classification of server health metrics",
      description: "Automated analysis pipelines calculating anomaly indexes of production microservices logs using pandas dataframes.",
      role: "Creator / Data Researcher",
      category: "experiment",
      tags: ["Python", "pandas", "NumPy", "scikit-learn basics", "Jupyter Note"],
      githubUrl: "https://github.com/itzOmidReza/pandas-ml-anomaly",
      challenges: [
        "Filtering and structuring noisy multi-gigabyte log CSV tables within standard memory bounds.",
      ],
      solution: "Leveraged pandas chunksize generators to aggregate statistical features iteratively, calculating anomalies iteratively.",
      previewCode: `# Python logging matrix anomaly classifier
import pandas as pd
from sklearn.ensemble import IsolationForest

def classify_server_anomalies(file_path: str):
    # Stream in chunks to conserve memory bounds
    chunk_list = []
    for chunk in pd.read_csv(file_path, chunksize=50000):
        cleaned = chunk.dropna(subset=['cpu_usage', 'memory_load'])
        chunk_list.append(cleaned)
        
    df = pd.concat(chunk_list)
    clf = IsolationForest(contamination=0.01, random_state=42)
    df['anomaly_index'] = clf.fit_predict(df[['cpu_usage', 'memory_load']])
    return df[df['anomaly_index'] == -1]`,
    },
  ];

  const filtered = projects.filter((p) => {
    const matchesCategory = selectedCategory === "all" || p.category === selectedCategory;
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div id="projects-showcase-container" className="space-y-8">
      {/* Filtering and search row */}
      <div id="filter-search-row" className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-5">
        <div id="filter-tabs-container" className="flex overflow-x-auto gap-1 py-1 scrollbar-none shrink-0">
          {filterCategories.map((cat) => (
            <button
              key={cat.id}
              id={`project-filter-btn-${cat.id}`}
              className={`text-2xs font-medium font-sans px-3.5 py-1.5 rounded-lg border transition-all shrink-0 cursor-pointer ${
                selectedCategory === cat.id
                  ? "bg-white/5 border-white/10 text-indigo-400 font-semibold"
                  : "bg-transparent border-transparent text-zinc-400 hover:text-white hover:bg-white/2"
              }`}
              onClick={() => {
                setSelectedCategory(cat.id);
                setSelectedProject(null);
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Searching */}
        <div id="search-input-wrapper" className="relative w-full md:max-w-xs shrink-0">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-500" />
          <input
            type="text"
            className="w-full bg-[#0d0d0d] text-xs text-white placeholder-zinc-550 pl-9 pr-4 py-2 rounded-lg border border-white/5 focus:outline-none focus:ring-1 focus:ring-indigo-500/50 font-sans"
            placeholder="Search stack or titles... (e.g. 'Nuxt')"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Grid view of projects */}
      <div id="projects-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((proj) => {
          return (
            <div
              key={proj.id}
              id={`project-card-${proj.id}`}
              className="rounded-2xl border border-white/5 hover:border-white/10 bg-[#0a0a0a] p-5 flex flex-col justify-between transition-all duration-300 relative group cursor-pointer hover:shadow-2xl hover:shadow-indigo-500/5"
              onClick={() => setSelectedProject(proj)}
            >
              {proj.featured && (
                <span className="absolute right-4 top-4 text-[9px] font-mono text-indigo-400 uppercase flex items-center gap-1 bg-[#0d0d0d] px-1.5 py-0.5 border border-white/5 rounded">
                  ★ FEATURED
                </span>
              )}

              <div>
                <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-wide">
                  {proj.category} WORK
                </span>
                <p className="text-sm font-semibold text-white mt-1 font-sans tracking-wide leading-tight group-hover:text-indigo-400 transition">
                  {proj.title}
                </p>
                <p className="text-2xs text-zinc-400 mt-1 font-sans font-medium">
                  {proj.subtitle}
                </p>
                <p className="text-2xs text-zinc-500 mt-2.5 font-sans leading-relaxed line-clamp-3">
                  {proj.description}
                </p>
              </div>

              <div className="mt-5 space-y-4">
                {/* Tech badges */}
                <div className="flex flex-wrap gap-1.5">
                  {proj.tags.slice(0, 4).map((tg) => (
                    <span
                      key={tg}
                      className="text-[9px] font-mono text-zinc-400 bg-[#0d0d0d] px-2 py-0.5 rounded border border-white/5"
                    >
                      {tg}
                    </span>
                  ))}
                  {proj.tags.length > 4 && (
                    <span className="text-[9px] font-mono text-zinc-500">
                      +{proj.tags.length - 4} more
                    </span>
                  )}
                </div>

                {/* Footer action buttons */}
                <div className="flex items-center justify-between border-t border-white/5 pt-3 text-[11px] font-sans font-medium text-zinc-300">
                  <span className="text-indigo-400 text-2xs group-hover:underline flex items-center gap-1">
                    Examine system details ➔
                  </span>
                  <div className="flex items-center gap-3" onClick={(e) => e.stopPropagation()}>
                    {proj.githubUrl && (
                      <a
                        href={proj.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="hover:text-indigo-400 shrink-0 text-zinc-400 transition"
                        title="GitHub Repo"
                      >
                        <GitFork className="h-4 w-4" />
                      </a>
                    )}
                    {proj.liveUrl && (
                      <a
                        href={proj.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="hover:text-indigo-400 shrink-0 text-zinc-400 transition"
                        title="Live System Demo"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="py-12 text-center text-xs text-zinc-500 font-sans">
          No projects matching research filter criteria.
        </div>
      )}

      {/* Structured Drilldown Overlay Modal */}
      {selectedProject && (
        <div
          id="project-depth-modal-backdrop"
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#030303]/85 p-4 backdrop-blur-md overflow-y-auto"
          onClick={() => setSelectedProject(null)}
        >
          <div
            id="project-depth-modal"
            className="w-full max-w-3xl rounded-2xl border border-white/5 bg-[#0a0a0a] overflow-hidden max-h-[85vh] flex flex-col shadow-[0_0_50px_rgba(99,102,241,0.08)]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-white/5 bg-[#0d0d0d] flex justify-between items-center text-xs">
              <div className="flex items-center gap-2">
                <CodeIcon className="h-4 w-4 text-indigo-400" />
                <span className="font-mono text-zinc-400">PROJECT SYSTEM DRILLDOWN: {selectedProject.id}</span>
              </div>
              <button
                className="text-zinc-500 hover:text-white bg-[#0a0a0a] p-1.5 rounded-md border border-white/5 cursor-pointer transition-colors"
                onClick={() => setSelectedProject(null)}
              >
                <Minimize2 className="h-4 w-4" />
              </button>
            </div>

            {/* Modal Body Scroll stream */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              <div>
                <span className="text-[10px] text-indigo-400 font-mono uppercase tracking-widest bg-[#0d0d0d] px-2.5 py-1 rounded border border-white/5">
                  {selectedProject.category} • {selectedProject.role}
                </span>
                <p className="text-lg font-bold text-white font-sans mt-3">
                  {selectedProject.title}
                </p>
                <p className="text-xs text-zinc-450 font-sans mt-1">
                  {selectedProject.subtitle}
                </p>
              </div>

              {/* Stack summary horizontal */}
              <div className="flex flex-wrap gap-2 py-1.5 border-y border-white/5">
                {selectedProject.tags.map((tg) => (
                  <span
                    key={tg}
                    className="text-2xs font-mono text-zinc-300 bg-[#0d0d0d] border border-white/5 px-2.5 py-0.5 rounded"
                  >
                    {tg}
                  </span>
                ))}
              </div>

              <div className="space-y-4">
                <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                  {selectedProject.description}
                </p>

                {/* Technical challenges details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3">
                  <div className="p-4 rounded-xl border border-white/5 bg-red-950/5 text-zinc-300 space-y-2">
                    <p className="text-2xs font-semibold uppercase tracking-wider text-red-400 font-sans flex items-center gap-1.5">
                      <Server className="h-3.5 w-3.5" /> Technical Dilemmas Faced
                    </p>
                    <ul className="list-disc list-inside text-2xs space-y-1.5 font-sans leading-relaxed">
                      {selectedProject.challenges.map((ch, idx) => (
                        <li key={idx} className="text-zinc-400">
                          {ch}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-4 rounded-xl border border-white/5 bg-indigo-950/5 text-zinc-300 space-y-2">
                    <p className="text-2xs font-semibold uppercase tracking-wider text-indigo-400 font-sans flex items-center gap-1.5">
                      <Cpu className="h-3.5 w-3.5" /> Deployed Optimization Pattern
                    </p>
                    <p className="text-2xs text-zinc-400 font-sans leading-relaxed">
                      {selectedProject.solution}
                    </p>
                  </div>
                </div>

                {/* Source excerpt if provided */}
                {selectedProject.previewCode && (
                  <div className="space-y-1.5 pt-2">
                    <p className="text-2xs text-zinc-500 font-mono">CODE EXCERPT FROM IMPLEMENTATION:</p>
                    <div className="rounded-xl bg-[#0d0d0d] p-4 border border-white/5 text-3xs font-mono leading-relaxed overflow-x-auto select-text text-zinc-300">
                      <pre>{selectedProject.previewCode}</pre>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Modal Footer actions */}
            <div className="px-6 py-4.5 border-t border-white/5 bg-[#0a0a0a] flex items-center justify-between text-xs">
              <span className="text-2xs text-zinc-500 font-mono">OMID-LEDGER REQUISITE SYSLINK</span>
              <div className="flex gap-4">
                {selectedProject.githubUrl && (
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1 text-zinc-300 hover:text-indigo-400 transition cursor-pointer"
                  >
                    <GitFork className="h-3.5 w-3.5" /> Code Repo
                  </a>
                )}
                {selectedProject.liveUrl && (
                  <a
                    href={selectedProject.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1 text-zinc-300 hover:text-indigo-400 transition cursor-pointer"
                  >
                    <ExternalLink className="h-3.5 w-3.5" /> Live Demonstration
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
