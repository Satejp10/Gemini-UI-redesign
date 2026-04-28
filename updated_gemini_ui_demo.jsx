import React, { useState } from "react";

const MODES = [
  { id: "chat", label: "Chat", icon: "💬", accent: "from-blue-500 to-cyan-400" },
  { id: "research", label: "Research", icon: "🔎", accent: "from-violet-500 to-fuchsia-400" },
  { id: "create", label: "Create", icon: "✨", accent: "from-amber-400 to-pink-400" },
];

const NAV_ITEMS = [
  { id: "home", label: "Home", icon: "⌂" },
  ...MODES,
];

const CONTEXT_ITEMS = [
  { id: "chat", label: "This chat", icon: "💬", state: "On", detail: "Current conversation" },
  { id: "drive", label: "Drive", icon: "▣", state: "On", detail: "Gemini UI reports" },
  { id: "web", label: "Web", icon: "◎", state: "On", detail: "Recent public sources" },
  { id: "gmail", label: "Gmail", icon: "✉", state: "Off", detail: "Not used" },
];

const ARTIFACTS = [
  { title: "Gemini UI teardown", type: "Report", meta: "12 sections" },
  { title: "Workspace prototype", type: "Canvas", meta: "React demo" },
  { title: "Redesign pitch", type: "Slides", meta: "9-slide outline" },
];

const RESEARCH_STEPS = [
  "Map user complaints",
  "Cluster UX failures",
  "Compare competitors",
  "Draft redesign thesis",
];

function cx(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Card({ children, className = "" }) {
  return <div className={cx("rounded-3xl border border-white/10 bg-white/[0.055]", className)}>{children}</div>;
}

function Pill({ children, active = false }) {
  return (
    <span className={cx("inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs", active ? "border-blue-400/40 bg-blue-500/15 text-blue-200" : "border-white/10 bg-white/[0.04] text-white/55")}>
      {children}
    </span>
  );
}

function Sidebar({ active, setActive }) {
  return (
    <aside className="hidden h-screen w-60 shrink-0 border-r border-white/10 bg-zinc-950 p-4 text-white lg:block">
      <div className="mb-8 flex items-center gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-blue-500 via-violet-500 to-pink-400">✦</div>
        <div>
          <div className="text-sm font-bold">Gemini</div>
          <div className="text-xs text-white/40">Workspace demo</div>
        </div>
      </div>

      <button type="button" className="mb-5 w-full rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-zinc-950">New chat</button>

      <nav className="space-y-1">
        {NAV_ITEMS.map((item) => (
          <button
            type="button"
            key={item.id}
            onClick={() => setActive(item.id)}
            className={cx(
              "flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-sm transition",
              active === item.id ? "bg-white text-zinc-950" : "text-white/60 hover:bg-white/10 hover:text-white"
            )}
          >
            <span className="w-5 text-center">{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>

      <Card className="mt-8 p-4">
        <div className="text-xs font-semibold text-white/80">Design rule</div>
        <p className="mt-2 text-xs leading-5 text-white/45">Show only the next useful action. Hide everything else until needed.</p>
      </Card>
    </aside>
  );
}

function MobileNav({ active, setActive }) {
  return (
    <div className="sticky top-0 z-30 border-b border-white/10 bg-zinc-950/95 p-3 text-white backdrop-blur lg:hidden">
      <div className="mb-3 flex items-center justify-between">
        <div className="font-semibold">Gemini Workspace</div>
        <Pill>Pro</Pill>
      </div>
      <div className="flex gap-2 overflow-x-auto">
        {NAV_ITEMS.map((item) => (
          <button
            type="button"
            key={item.id}
            onClick={() => setActive(item.id)}
            className={cx("shrink-0 rounded-full border px-3 py-2 text-xs", active === item.id ? "border-white bg-white text-zinc-950" : "border-white/10 bg-white/[0.04] text-white/60")}
          >
            {item.icon} {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function Header({ active, setActive, onContext }) {
  const mode = MODES.find((item) => item.id === active);
  return (
    <div className="mb-6 flex flex-col gap-4 border-b border-white/10 pb-5 md:flex-row md:items-center md:justify-between">
      <div>
        <div className="mb-2 flex flex-wrap gap-2">
          <Pill active>Context: Chat · Drive · Web</Pill>
          <button type="button" onClick={onContext} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-white/60 hover:bg-white/10">Manage</button>
        </div>
        <h1 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">{mode ? mode.label : "Home"}</h1>
      </div>
      <div className="flex rounded-2xl border border-white/10 bg-white/[0.04] p-1">
        {MODES.map((item) => (
          <button
            type="button"
            key={item.id}
            onClick={() => setActive(item.id)}
            className={cx("rounded-xl px-3 py-2 text-xs font-medium transition", active === item.id ? "bg-white text-zinc-950" : "text-white/55 hover:text-white")}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function CommandBar() {
  return (
    <div className="sticky bottom-4 z-20 mx-auto mt-8 max-w-3xl rounded-3xl border border-white/10 bg-zinc-950/95 p-2 shadow-2xl shadow-black/40">
      <div className="flex gap-2">
        <div className="flex-1 rounded-2xl bg-white/[0.06] px-4 py-3 text-sm text-white/45">Ask Gemini anything...</div>
        <button type="button" className="rounded-2xl border border-white/10 bg-white/[0.06] px-3 py-3 text-xs text-white/70">Pro</button>
        <button type="button" className="rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-zinc-950">Send</button>
      </div>
    </div>
  );
}

function HomeScreen({ setActive }) {
  return (
    <div className="space-y-6">
      <Card className="overflow-hidden p-6 md:p-8">
        <div className="max-w-2xl">
          <Pill active>Updated direction</Pill>
          <h2 className="mt-5 text-4xl font-semibold tracking-tight text-white md:text-5xl">Less cockpit. More calm workspace.</h2>
          <p className="mt-4 text-base leading-7 text-white/55">The UI now keeps only four things visible: task mode, active context, main work area, and next action.</p>
        </div>
        <div className="mt-8 grid gap-3 md:grid-cols-3">
          {MODES.map((mode) => (
            <button type="button" key={mode.id} onClick={() => setActive(mode.id)} className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 text-left transition hover:bg-white/[0.08]">
              <div className={cx("mb-5 grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br text-lg text-white", mode.accent)}>{mode.icon}</div>
              <div className="font-semibold text-white">{mode.label}</div>
              <div className="mt-2 text-sm text-white/45">{mode.id === "chat" ? "Ask and draft" : mode.id === "research" ? "Plan, source, cite" : "Build an artifact"}</div>
            </button>
          ))}
        </div>
      </Card>

      <div className="grid gap-4 md:grid-cols-3">
        {ARTIFACTS.map((artifact) => (
          <Card key={artifact.title} className="p-5">
            <div className="text-xs uppercase tracking-wide text-white/35">{artifact.type}</div>
            <div className="mt-2 font-semibold text-white">{artifact.title}</div>
            <div className="mt-1 text-sm text-white/45">{artifact.meta}</div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function ChatScreen({ onContext }) {
  return (
    <div className="mx-auto max-w-3xl space-y-4">
      <Card className="p-5">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-blue-500 to-violet-500">✦</div>
            <div>
              <div className="text-sm font-semibold text-white">Gemini</div>
              <div className="text-xs text-white/40">Used: chat, Drive, web</div>
            </div>
          </div>
          <button type="button" onClick={onContext} className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/55">View context</button>
        </div>
        <p className="text-sm leading-7 text-white/70">Gemini should feel like a focused workspace. The interface should reveal context and outputs only when they help the current task.</p>
      </Card>

      <Card className="p-5">
        <div className="mb-3 text-sm font-semibold text-white">Saved outputs</div>
        <div className="space-y-2">
          {ARTIFACTS.slice(0, 2).map((artifact) => (
            <div key={artifact.title} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.035] p-3">
              <div>
                <div className="text-sm text-white/80">{artifact.title}</div>
                <div className="text-xs text-white/35">{artifact.type}</div>
              </div>
              <button type="button" className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-zinc-950">Open</button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function ResearchScreen() {
  return (
    <div className="mx-auto max-w-4xl space-y-4">
      <Card className="p-5">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <div className="text-sm font-semibold text-white">Research plan</div>
            <div className="text-xs text-white/40">Editable before running</div>
          </div>
          <button type="button" className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-zinc-950">Run</button>
        </div>
        <div className="grid gap-2 md:grid-cols-2">
          {RESEARCH_STEPS.map((step, index) => (
            <div key={step} className="rounded-2xl border border-white/10 bg-white/[0.035] p-4">
              <div className="text-xs text-white/35">Step {index + 1}</div>
              <div className="mt-1 text-sm text-white/80">{step}</div>
            </div>
          ))}
        </div>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="p-5">
          <div className="text-sm font-semibold text-white">Sources</div>
          <div className="mt-4 space-y-2">
            {["Uploaded report A", "Uploaded report B", "Workspace notes"].map((source) => (
              <div key={source} className="rounded-2xl border border-white/10 bg-white/[0.035] p-3 text-sm text-white/70">{source}</div>
            ))}
          </div>
        </Card>
        <Card className="p-5">
          <div className="text-sm font-semibold text-white">Output</div>
          <p className="mt-4 text-sm leading-7 text-white/55">A clean report with source-backed claims, not a wall of generated text.</p>
          <button type="button" className="mt-5 rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-2 text-sm text-white/70">Open report</button>
        </Card>
      </div>
    </div>
  );
}

function CreateScreen() {
  return (
    <div className="mx-auto grid max-w-5xl gap-4 lg:grid-cols-[260px_minmax(0,1fr)]">
      <Card className="p-5">
        <div className="text-sm font-semibold text-white">Artifact</div>
        <div className="mt-4 space-y-2">
          {["Prototype", "Report", "Slides"].map((item, index) => (
            <button type="button" key={item} className={cx("w-full rounded-2xl border p-3 text-left text-sm", index === 0 ? "border-amber-400/40 bg-amber-500/15 text-white" : "border-white/10 bg-white/[0.035] text-white/55")}>{item}</button>
          ))}
        </div>
      </Card>

      <Card className="p-5 md:p-7">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <div className="text-xl font-semibold text-white">Canvas preview</div>
            <div className="mt-1 text-sm text-white/40">Single editable surface</div>
          </div>
          <button type="button" className="rounded-2xl bg-white px-4 py-2 text-sm font-semibold text-zinc-950">Export</button>
        </div>
        <div className="rounded-3xl border border-white/10 bg-zinc-950/70 p-6">
          <div className="max-w-xl">
            <div className="mb-5 inline-flex rounded-full bg-white/[0.06] px-3 py-1 text-xs text-white/50">Gemini redesign</div>
            <h2 className="text-3xl font-semibold tracking-tight text-white">Context-visible, artifact-first AI.</h2>
            <p className="mt-4 text-sm leading-7 text-white/55">A quieter UI with fewer panels, fewer badges, and a clearer path from prompt to useful output.</p>
          </div>
        </div>
      </Card>
    </div>
  );
}

function ContextDrawer({ open, onClose }) {
  if (!open) return null;

  return (
    <>
      <button type="button" aria-label="Close context manager" className="fixed inset-0 z-50 cursor-default bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <aside className="fixed right-0 top-0 z-50 h-screen w-full max-w-sm border-l border-white/10 bg-zinc-950 p-5 text-white shadow-2xl">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">Context</h2>
            <p className="mt-1 text-sm text-white/45">Only active sources are shown by default.</p>
          </div>
          <button type="button" onClick={onClose} className="rounded-xl p-2 text-white/50 hover:bg-white/10">✕</button>
        </div>
        <div className="space-y-2">
          {CONTEXT_ITEMS.map((item) => (
            <div key={item.id} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.04] p-3">
              <div className="flex items-center gap-3">
                <span>{item.icon}</span>
                <div>
                  <div className="text-sm font-medium text-white/80">{item.label}</div>
                  <div className="text-xs text-white/35">{item.detail}</div>
                </div>
              </div>
              <span className={cx("rounded-full px-2 py-1 text-xs", item.state === "On" ? "bg-emerald-500/15 text-emerald-300" : "bg-white/[0.06] text-white/35")}>{item.state}</span>
            </div>
          ))}
        </div>
      </aside>
    </>
  );
}

function MainContent({ active, setActive, onContext }) {
  let content = <HomeScreen setActive={setActive} />;
  if (active === "chat") content = <ChatScreen onContext={onContext} />;
  if (active === "research") content = <ResearchScreen />;
  if (active === "create") content = <CreateScreen />;

  return (
    <main className="min-h-screen flex-1 overflow-y-auto bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.16),transparent_28%),radial-gradient(circle_at_top_right,rgba(217,70,239,0.12),transparent_26%),#09090b] p-4 text-white md:p-8">
      <div className="mx-auto max-w-6xl">
        <Header active={active} setActive={setActive} onContext={onContext} />
        {content}
        <CommandBar />
      </div>
    </main>
  );
}

export function runSmokeTests() {
  const navIds = new Set(NAV_ITEMS.map((item) => item.id));
  return {
    hasHome: navIds.has("home"),
    allModesInNav: MODES.every((mode) => navIds.has(mode.id)),
    noDuplicateNavIds: navIds.size === NAV_ITEMS.length,
    contextHasActiveItems: CONTEXT_ITEMS.some((item) => item.state === "On"),
    reducedNavigationCount: NAV_ITEMS.length <= 4,
    reducedContextCount: CONTEXT_ITEMS.length <= 4,
  };
}

export default function UpdatedGeminiUIDemo() {
  const [active, setActive] = useState("home");
  const [contextOpen, setContextOpen] = useState(false);

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <MobileNav active={active} setActive={setActive} />
      <div className="flex min-h-screen">
        <Sidebar active={active} setActive={setActive} />
        <MainContent active={active} setActive={setActive} onContext={() => setContextOpen(true)} />
      </div>
      <ContextDrawer open={contextOpen} onClose={() => setContextOpen(false)} />
    </div>
  );
}
