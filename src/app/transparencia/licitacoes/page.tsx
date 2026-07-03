import type { Metadata } from "next";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import { getLicitacoes } from "@/services";
import LicitacoesFilterView from "./LicitacoesFilterView";

export const metadata: Metadata = {
  title: "Licitações",
  description: "Processos licitatórios do município: modalidade, objeto e situação.",
};

export default async function LicitacoesPage() {
  const licitacoes = await getLicitacoes();
  const anos = Array.from(new Set(licitacoes.map((l) => l.ano))).sort((a, b) => b - a);

  return (
    <div className="flex flex-col gap-6">
      <Breadcrumbs
        items={[
          { label: "Início", href: "/" },
          { label: "Transparência", href: "/transparencia" },
          { label: "Licitações" },
        ]}
      />
      <div>
        <h1 className="text-2xl font-semibold text-neutral-900">Licitações</h1>
        <p className="mt-2 max-w-3xl text-sm text-neutral-700 sm:text-base">
          Processos licitatórios conduzidos pelo município, com modalidade, objeto,
          órgão responsável e situação atual. Consulte também os{" "}
          <a href="/transparencia/contratos" className="text-primary-700 underline hover:text-primary-800">
            contratos administrativos
          </a>{" "}
          decorrentes destes processos. Dados ilustrativos para fins de demonstração.
        </p>
      </div>
      <LicitacoesFilterView licitacoes={licitacoes} anos={anos} />
    </div>
  );
}
