import type { Metadata } from "next";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import {
  getDespesas,
  getAnosDisponiveisDespesas,
  getOrgaosDisponiveisDespesas,
} from "@/services";
import DespesasFilterView from "./DespesasFilterView";

export const metadata: Metadata = {
  title: "Despesas",
  description: "Execução orçamentária das despesas municipais: empenho, liquidação e pagamento.",
};

export default async function DespesasPage() {
  const [despesas, anos, orgaos] = await Promise.all([
    getDespesas(),
    getAnosDisponiveisDespesas(),
    getOrgaosDisponiveisDespesas(),
  ]);

  return (
    <div className="flex flex-col gap-6">
      <Breadcrumbs
        items={[
          { label: "Início", href: "/" },
          { label: "Transparência", href: "/transparencia" },
          { label: "Despesas" },
        ]}
      />
      <div>
        <h1 className="text-2xl font-semibold text-neutral-900">Despesas</h1>
        <p className="mt-2 max-w-3xl text-sm text-neutral-700 sm:text-base">
          Acompanhe os estágios da execução da despesa pública — empenho, liquidação e
          pagamento — por órgão, função e credor. Dados ilustrativos para fins de
          demonstração.
        </p>
      </div>
      <DespesasFilterView despesas={despesas} anos={anos} orgaos={orgaos} />
    </div>
  );
}
