import type { Metadata } from "next";
import { MessageSquare } from "lucide-react";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import OuvidoriaForm from "./OuvidoriaForm";

export const metadata: Metadata = {
  title: "Ouvidoria",
  description: "Canal da Ouvidoria para reclamações, sugestões, elogios e denúncias.",
};

export default function OuvidoriaPage() {
  return (
    <div className="flex flex-col gap-6">
      <Breadcrumbs
        items={[
          { label: "Início", href: "/" },
          { label: "Transparência", href: "/transparencia" },
          { label: "Ouvidoria" },
        ]}
      />
      <div>
        <h1 className="flex items-center gap-2 text-2xl font-semibold text-neutral-900">
          <MessageSquare className="h-6 w-6 text-primary-700" aria-hidden="true" />
          Ouvidoria
        </h1>
        <p className="mt-2 max-w-3xl text-sm text-neutral-700 sm:text-base">
          A Ouvidoria é o canal para registrar reclamações, sugestões, elogios,
          denúncias e solicitações relacionadas aos serviços municipais. Você pode se
          identificar ou enviar sua manifestação de forma anônima. Este é um ambiente
          de demonstração: os envios abaixo são simulados e não geram protocolo real.
        </p>
      </div>
      <OuvidoriaForm />
    </div>
  );
}
