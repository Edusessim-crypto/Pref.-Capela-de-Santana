"use client";

import dynamic from "next/dynamic";
import type { Obra } from "@/types";

// next/dynamic com ssr:false só é permitido a partir de um Client Component no App Router;
// por isso o carregamento dinâmico do mapa (Leaflet) é isolado aqui, e a página de obras
// (Server Component) apenas passa os dados já carregados para este wrapper.
const ObrasMap = dynamic(() => import("@/components/transparencia/ObrasMap"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[420px] w-full items-center justify-center rounded-xl border border-neutral-200 bg-neutral-50 text-sm text-neutral-500 md:h-[520px]">
      Carregando mapa...
    </div>
  ),
});

export interface ObrasMapSectionProps {
  obras: Obra[];
}

export default function ObrasMapSection({ obras }: ObrasMapSectionProps) {
  return <ObrasMap obras={obras} />;
}
