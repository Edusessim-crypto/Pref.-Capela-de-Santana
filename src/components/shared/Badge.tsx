import type { ReactNode } from "react";

export type BadgeTone = "primary" | "accent" | "success" | "warning" | "danger" | "neutral";

const TONE_CLASSES: Record<BadgeTone, string> = {
  primary: "bg-primary-500/10 text-primary-700",
  accent: "bg-accent-500/10 text-accent-700",
  success: "bg-success-500/10 text-success-700",
  warning: "bg-warning-500/10 text-warning-700",
  danger: "bg-danger-500/10 text-danger-700",
  neutral: "bg-neutral-200 text-neutral-700",
};

export interface BadgeProps {
  children: ReactNode;
  tone?: BadgeTone;
}

export default function Badge({ children, tone = "neutral" }: BadgeProps) {
  return (
    <span
      className={`inline-flex w-fit items-center rounded-full px-2.5 py-1 text-xs font-medium ${TONE_CLASSES[tone]}`}
    >
      {children}
    </span>
  );
}
