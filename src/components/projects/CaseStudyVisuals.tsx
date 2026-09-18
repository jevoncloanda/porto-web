import {
  AlertTriangle,
  ArrowDown,
  ArrowRight,
  Check,
  Database,
  FileCheck2,
  Gauge,
  Layers3,
  LockKeyhole,
  RefreshCw,
} from "lucide-react";
import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

function VisualFrame({
  label,
  title,
  children,
}: {
  label: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <figure className="my-10 overflow-hidden rounded-card border border-border bg-bg-alt">
      <figcaption className="border-b border-border px-5 py-4 sm:px-7">
        <span className="text-label tracking-[0.18em] text-accent uppercase">{label}</span>
        <p className="mt-2 text-sm font-medium text-fg">{title}</p>
      </figcaption>
      <div className="p-4 sm:p-7">{children}</div>
    </figure>
  );
}

function FlowArrow({
  label,
  direction = "responsive",
}: {
  label?: string;
  direction?: "responsive" | "vertical" | "horizontal";
}) {
  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center gap-2 text-subtle",
        direction === "vertical" ? "flex-col py-2" : "py-1 lg:px-1",
      )}
    >
      {label ? (
        <span className="text-[0.625rem] tracking-[0.12em] uppercase">
          {label}
        </span>
      ) : null}

      {direction === "vertical" ? (
        <ArrowDown size={16} aria-hidden />
      ) : direction === "horizontal" ? (
        <ArrowRight size={16} aria-hidden />
      ) : (
        <>
          <ArrowDown className="lg:hidden" size={16} aria-hidden />
          <ArrowRight className="hidden lg:block" size={16} aria-hidden />
        </>
      )}
    </div>
  );
}

function StepCard({
  index,
  title,
  detail,
  tone = "neutral",
}: {
  index: string;
  title: string;
  detail: string;
  tone?: "neutral" | "accent" | "success" | "danger";
}) {
  const tones = {
    neutral: "border-border bg-surface/60",
    accent: "border-accent/50 bg-accent/[0.07]",
    success: "border-emerald-400/40 bg-emerald-400/[0.07]",
    danger: "border-rose-400/40 bg-rose-400/[0.07]",
  };

  return (
    <div className={cn("min-w-0 flex-1 rounded-card border p-4", tones[tone])}>
      <span className="font-mono text-[0.625rem] text-subtle">{index}</span>
      <p className="mt-2 text-sm font-medium text-fg">{title}</p>
      <p className="mt-2 text-xs leading-relaxed text-muted">{detail}</p>
    </div>
  );
}

export function EvidenceCallout({
  value,
  label,
  detail,
}: {
  value: string;
  label: string;
  detail: string;
}) {
  return (
    <aside className="my-8 grid gap-4 border-y border-border py-6 sm:grid-cols-[12rem_1fr] sm:items-center">
      <div>
        <p className="text-h2 font-semibold text-accent">{value}</p>
        <p className="mt-1 text-label tracking-[0.16em] text-subtle uppercase">{label}</p>
      </div>
      <p className="text-sm leading-relaxed text-muted">{detail}</p>
    </aside>
  );
}

export function EmailMigrationPreview() {
  const targets = [
    ["System A", "User identity", "Exact", "1 row", "Valid"],
    ["System B", "Recipient list", "Delimited", "4 rows", "Valid"],
    ["System C", "Notification document", "JSON", "2 rows", "Conflict"],
  ];

  return (
    <VisualFrame
      label="Representative interface · fictional data"
      title="Preview makes scope and blocking conflicts visible before mutation."
    >
      <div className="grid gap-5 xl:grid-cols-[1fr_15rem]">
        <div className="rounded-card border border-border bg-bg p-4 sm:p-5">
          <div className="flex flex-wrap items-start justify-between gap-3 border-b border-border pb-4">
            <div>
              <p className="text-xs text-subtle">Migration preview</p>
              <p className="mt-1 font-mono text-xs text-fg">EM-DEMO-A1B2</p>
            </div>
            <span className="rounded-pill bg-rose-400/10 px-3 py-1 text-[0.625rem] font-medium text-rose-300 uppercase">
              Execution blocked
            </span>
          </div>

          <dl className="mt-4 grid gap-3 text-xs sm:grid-cols-2">
            <div>
              <dt className="text-subtle">Previous identity</dt>
              <dd className="mt-1 font-mono text-fg">alex@example-old.com</dd>
            </div>
            <div>
              <dt className="text-subtle">Derived identity</dt>
              <dd className="mt-1 font-mono text-fg">alex@example-new.com</dd>
            </div>
          </dl>

          <div className="mt-5 space-y-2">
            {targets.map(([system, field, mode, rows, state]) => {
              const blocked = state === "Conflict";
              return (
                <div
                  key={system}
                  className="grid gap-2 rounded-card border border-border bg-surface/40 p-3 text-xs sm:grid-cols-[1fr_auto_auto] sm:items-center"
                >
                  <div>
                    <p className="font-medium text-fg">{system} · {field}</p>
                    <p className="mt-1 text-subtle">{mode} match · {rows}</p>
                  </div>
                  <span className={blocked ? "text-rose-300" : "text-emerald-300"}>
                    {state}
                  </span>
                  {blocked ? <AlertTriangle size={15} aria-hidden className="text-rose-300" /> : <Check size={15} aria-hidden className="text-emerald-300" />}
                </div>
              );
            })}
          </div>
        </div>

        <aside className="flex flex-col justify-between rounded-card border border-accent/30 bg-accent/[0.06] p-4">
          <div>
            <LockKeyhole size={20} aria-hidden className="text-accent" />
            <p className="mt-4 text-sm font-medium text-fg">Conflict gate</p>
            <p className="mt-2 text-xs leading-relaxed text-muted">
              Destination identity already exists in one configured property. Target data remains unchanged.
            </p>
          </div>
          <button type="button" disabled className="mt-6 w-full rounded-card bg-surface px-3 py-2.5 text-xs text-subtle opacity-70">
            Execution unavailable
          </button>
        </aside>
      </div>
    </VisualFrame>
  );
}

export function EmailMigrationLifecycle() {
  return (
    <VisualFrame
      label="Safety lifecycle"
      title="Preview and execution are separate, with scope rechecked inside every target transaction."
    >
      <div className="mx-auto flex max-w-3xl flex-col">
        <StepCard
          index="01"
          title="Validate identity"
          detail="Authenticate operator, validate source domain, derive destination server-side."
        />

        <FlowArrow direction="vertical" />

        <StepCard
          index="02"
          title="Read-only preview"
          detail="Inspect registered targets, keys, counts, formats, failures, and conflicts."
          tone="accent"
        />

        <FlowArrow label="confirm" direction="vertical" />

        <StepCard
          index="03"
          title="Recheck scope"
          detail="Verify operator, registry, readiness, and current affected values."
          tone="accent"
        />

        <FlowArrow label="per target" direction="vertical" />

        <StepCard
          index="04"
          title="Update + verify"
          detail="Guard complete values, mutate in one target transaction, then re-read."
        />

        <FlowArrow direction="vertical" />

        <StepCard
          index="05"
          title="Commit or roll back"
          detail="Record row evidence and calculate success, partial success, or failure."
          tone="success"
        />
      </div>

      <div className="mx-auto mt-5 flex max-w-3xl items-start gap-3 border-l-2 border-rose-400/50 bg-rose-400/[0.05] px-4 py-3 text-xs leading-relaxed text-muted">
        <AlertTriangle
          className="mt-0.5 shrink-0 text-rose-300"
          size={15}
          aria-hidden
        />
        Any conflict, changed scope, guarded-update mismatch, or verification
        failure blocks or rolls back only that target. No global transaction
        is implied.
      </div>
    </VisualFrame>
  );
}

export function NotificationProcessingFlow() {
  return (
    <VisualFrame
      label="Architecture + delivery lifecycle"
      title="API acceptance stays distinct from provider delivery and final operational state."
    >
      <div className="flex flex-col lg:flex-row lg:items-stretch">
        <StepCard index="01" title="Internal applications" detail="Submit validated Email or Telegram requests through one REST boundary." />
        <FlowArrow label="request" />
        <StepCard index="02" title="Accept + persist" detail="Normalize input, reject invalid work, create durable queued state and trace ID." tone="accent" />
        <FlowArrow label="202" />
        <StepCard index="03" title="Redis-backed queues" detail="Channel queues decouple caller latency from provider work." />
        <FlowArrow />
        <StepCard index="04" title="Bounded workers" detail="Apply concurrency, rate limits, retries, and exponential backoff." />
        <FlowArrow />
        <StepCard index="05" title="Delivery state" detail="Workers and reconciliation update sent, success, failed, or validation states." tone="success" />
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        {[
          [Database, "Persistent record", "Queue job IDs connect async work to searchable history."],
          [RefreshCw, "Recoverable failures", "Eligible work can be retried; stale or removed jobs become visible."],
          [Gauge, "Operations", "Authenticated dashboard exposes trends, logs, queues, and failure states."],
        ].map(([Icon, title, detail]) => {
          const VisualIcon = Icon as typeof Database;
          return (
            <div key={String(title)} className="rounded-card border border-border bg-surface/40 p-4">
              <VisualIcon size={17} aria-hidden className="text-accent" />
              <p className="mt-3 text-xs font-medium text-fg">{String(title)}</p>
              <p className="mt-2 text-xs leading-relaxed text-muted">{String(detail)}</p>
            </div>
          );
        })}
      </div>
    </VisualFrame>
  );
}

function SourceNode({ children, accent }: { children: ReactNode; accent?: boolean }) {
  return (
    <div className={cn("rounded-card border p-3 text-center text-xs font-medium text-fg", accent ? "border-accent/50 bg-accent/[0.07]" : "border-border bg-surface/50")}>
      {children}
    </div>
  );
}

export function PortalWorkflowMap() {
  return (
    <VisualFrame
      label="Team-built platform · confirmed contribution scope"
      title="Source workflows retain domain ownership while feeding shared follow-up and analytical views."
    >
      <div className="rounded-card border border-border p-4 sm:p-5">
        <p className="text-[0.625rem] tracking-[0.14em] text-subtle uppercase">Operational workflows</p>
        <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
          <SourceNode>Incident + investigation</SourceNode>
          <SourceNode>Inspection findings</SourceNode>
          <SourceNode>Hazard follow-up</SourceNode>
          <SourceNode>HSE governance</SourceNode>
          <SourceNode>Standalone action</SourceNode>
        </div>

        <div className="my-4 flex justify-center text-accent"><ArrowDown size={18} aria-hidden /></div>

        <div className="grid gap-3 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-card border border-accent/50 bg-accent/[0.06] p-4">
            <div className="flex items-center gap-2">
              <Layers3 size={18} aria-hidden className="text-accent" />
              <p className="text-sm font-medium text-fg">Action Management</p>
            </div>
            <p className="mt-2 text-xs leading-relaxed text-muted">
              Normalizes source, reference, action, PIC, due date, status, evidence, and history. Updates write back to source-owned records.
            </p>
            <p className="mt-3 text-[0.625rem] text-subtle">Incident · Inspection · Hazard · Standalone only</p>
          </div>
          <div className="rounded-card border border-border bg-surface/40 p-4">
            <div className="flex items-center gap-2">
              <Gauge size={18} aria-hidden className="text-accent" />
              <p className="text-sm font-medium text-fg">HSE Performance / Insights</p>
            </div>
            <p className="mt-2 text-xs leading-relaxed text-muted">
              Live query aggregation turns contributed operational records into counts, distributions, statuses, and overdue work.
            </p>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-[0.625rem] text-subtle">
          <span className="inline-flex items-center gap-2"><span className="h-0.5 w-5 bg-accent" /> creates or exposes follow-up work</span>
          <span className="inline-flex items-center gap-2"><span className="w-5 border-t border-dashed border-muted" /> supplies analytical data</span>
        </div>
      </div>
    </VisualFrame>
  );
}

export function PortalIncidentLifecycle() {
  const stages = [
    ["01", "Incident Submitted", "Report saved; linked investigation exists."],
    ["02", "Investigation Submitted", "Root cause, action plan, and team are complete."],
    ["03", "Investigation Approved", "Every classification-based approval is complete."],
    ["04", "Incident Closed", "Explicit close action after investigation approval."],
  ];

  return (
    <VisualFrame
      label="Verified state model"
      title="Notification and follow-up actions branch from the lifecycle; neither is misrepresented as a closure gate."
    >
      <div className="grid gap-3 lg:grid-cols-4">
        {stages.map(([index, title, detail]) => (
          <div key={index} className="relative rounded-card border border-border bg-surface/45 p-4">
            <span className="font-mono text-[0.625rem] text-accent">{index}</span>
            <p className="mt-2 text-sm font-medium text-fg">{title}</p>
            <p className="mt-2 text-xs leading-relaxed text-muted">{detail}</p>
          </div>
        ))}
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div className="rounded-card border border-border border-dashed p-4">
          <p className="text-xs font-medium text-fg">Parallel: incident notification</p>
          <p className="mt-2 text-xs leading-relaxed text-muted">Authorized send or explicit “do not send.” Notification state remains independent of investigation status.</p>
        </div>
        <div className="rounded-card border border-border border-dashed p-4">
          <p className="text-xs font-medium text-fg">Parallel: Action Management</p>
          <p className="mt-2 text-xs leading-relaxed text-muted">Corrective or preventive actions carry PIC, due date, and Open / Closed state. Closing them does not automatically close the incident.</p>
        </div>
      </div>
    </VisualFrame>
  );
}

export function PortalActionManagement() {
  const rows = [
    ["Incident", "INC-DEMO-014", "Install a temporary walkway barrier", "Safety Coordinator", "Open"],
    ["Inspection", "INS-DEMO-027", "Replace a damaged aisle marker", "Area Supervisor", "Overdue*"],
    ["Hazard", "HZD-DEMO-009", "Add lighting near the sample station", "Facilities Lead", "Open"],
    ["Action", "ACT-DEMO-005", "Update the induction checklist", "Training Coordinator", "Closed"],
  ];

  return (
    <VisualFrame
      label="Representative interface · fictional data"
      title="One operational view aggregates four source-owned record types without copying them into a second workflow."
    >
      <div className="grid gap-2 sm:grid-cols-4">
        {['Incident action plan', 'Inspection finding', 'Hazard follow-up', 'Standalone action'].map((item) => (
          <SourceNode key={item}>{item}</SourceNode>
        ))}
      </div>
      <div className="my-4 flex justify-center text-accent"><ArrowDown size={18} aria-hidden /></div>
      <div className="overflow-hidden rounded-card border border-border bg-bg">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-4 py-3">
          <div className="flex items-center gap-2">
            <FileCheck2 size={16} aria-hidden className="text-accent" />
            <p className="text-sm font-medium text-fg">Action Management</p>
          </div>
          <span className="text-[0.625rem] tracking-[0.12em] text-subtle uppercase">Fictional records</span>
        </div>
        <div className="divide-y divide-border">
          {rows.map(([source, reference, action, pic, status]) => (
            <div key={reference} className="grid gap-2 px-4 py-4 text-xs sm:grid-cols-[6rem_1fr_auto] sm:items-center">
              <div>
                <p className="font-medium text-fg">{source}</p>
                <p className="mt-1 font-mono text-[0.625rem] text-subtle">{reference}</p>
              </div>
              <div>
                <p className="text-fg">{action}</p>
                <p className="mt-1 text-subtle">PIC: {pic}</p>
              </div>
              <span className={cn("w-fit rounded-pill px-2.5 py-1 text-[0.625rem]", status === "Closed" ? "bg-emerald-400/10 text-emerald-300" : status.startsWith("Overdue") ? "bg-rose-400/10 text-rose-300" : "bg-accent/10 text-accent")}>
                {status}
              </span>
            </div>
          ))}
        </div>
      </div>
      <p className="mt-3 text-[0.625rem] leading-relaxed text-subtle">* Overdue is derived for display from an open item whose due date has passed; it is not a stored workflow status.</p>
    </VisualFrame>
  );
}
