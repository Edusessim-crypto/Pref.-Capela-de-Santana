import type { Metadata } from "next";
import { FileQuestion } from "lucide-react";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import ESicForm from "./ESicForm";

export const metadata: Metadata = {
  title: "e-SIC",
  description: "Solicitação eletrônica de informações ao amparo da Lei de Acesso à Informação.",
};

export default function ESicPage() {
  return (
    <div className="flex flex-col gap-6">
      <Breadcrumbs
        items={[
          { label: "Início", href: "/" },
          { label: "Transparência", href: "/transparencia" },
          { label: "e-SIC" },
        ]}
      />
      <div>
        <h1 className="flex items-center gap-2 text-2xl font-semibold text-neutral-900">
          <FileQuestion className="h-6 w-6 text-primary-700" aria-hidden="true" />
          e-SIC — Serviço de Informação ao Cidadão
        </h1>
        <p className="mt-2 max-w-3xl text-sm text-neutral-700 sm:text-base">
          O e-SIC é o canal eletrônico para solicitar, com base na Lei de Acesso à
          Informação (Lei nº 12.527/2011), informações públicas que não estejam
          disponíveis neste portal. O órgão tem prazo de até 20 dias para responder,
          prorrogável por mais 10 dias mediante justificativa. Este é um ambiente de
          demonstração: os envios abaixo são simulados e não geram protocolo real.
        </p>
      </div>
      <ESicForm />
    </div>
  );
}
