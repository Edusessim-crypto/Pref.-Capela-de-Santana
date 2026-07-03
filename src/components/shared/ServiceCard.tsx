import Link from "next/link";
import {
  Badge as BadgeIcon,
  Bus,
  Building2,
  CalendarCheck,
  CircleHelp,
  FileCheck,
  FileText,
  FolderOpen,
  GraduationCap,
  HeartHandshake,
  HeartPulse,
  Home,
  Inbox,
  Leaf,
  Megaphone,
  Receipt,
  Scale,
  Scissors,
  Stamp,
  Store,
  Syringe,
  Tractor,
  Trash2,
  Truck,
  Users,
  type LucideIcon,
} from "lucide-react";
import type { Servico } from "@/types";

const ICON_MAP: Record<string, LucideIcon> = {
  "file-text": FileText,
  home: Home,
  leaf: Leaf,
  "heart-pulse": HeartPulse,
  "graduation-cap": GraduationCap,
  truck: Truck,
  "building-2": Building2,
  scale: Scale,
  users: Users,
  tractor: Tractor,
  "trash-2": Trash2,
  syringe: Syringe,
  stamp: Stamp,
  "folder-open": FolderOpen,
  "calendar-check": CalendarCheck,
  receipt: Receipt,
  badge: BadgeIcon,
  bus: Bus,
  "file-check": FileCheck,
  "heart-handshake": HeartHandshake,
  inbox: Inbox,
  megaphone: Megaphone,
  scissors: Scissors,
  store: Store,
};

function resolveIcon(icone: string): LucideIcon {
  return ICON_MAP[icone] ?? CircleHelp;
}

export interface ServiceCardProps {
  servico: Servico;
}

export default function ServiceCard({ servico }: ServiceCardProps) {
  const Icon = resolveIcon(servico.icone);

  return (
    <Link
      href={`/servicos/${servico.slug}`}
      className="group flex min-h-[11rem] flex-col gap-3 rounded-xl border border-neutral-200 bg-neutral-0 p-5 shadow-soft transition-shadow hover:shadow-soft-lg focus-visible:shadow-soft-lg"
    >
      <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-primary-50 text-primary-600 transition-colors group-hover:bg-primary-100">
        <Icon className="h-6 w-6" aria-hidden="true" />
      </span>

      <h3 className="font-sans text-base font-semibold text-neutral-900">
        {servico.titulo}
      </h3>

      <p className="line-clamp-3 text-sm text-neutral-600">{servico.descricao}</p>

      {servico.categoria ? (
        <span className="mt-auto inline-flex w-fit items-center rounded-full bg-accent-50 px-2.5 py-1 text-xs font-medium text-accent-700">
          {servico.categoria}
        </span>
      ) : null}
    </Link>
  );
}
