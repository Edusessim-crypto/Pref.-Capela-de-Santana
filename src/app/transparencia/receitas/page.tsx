import type { Metadata } from "next";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import { getReceitas, getAnosDisponiveisReceitas } from "@/services";
import ReceitasFilterView from "./ReceitasFilterView";

export const metadata: Metadata = {
  title: "Receitas",
  description: "Receitas municipais previstas e arrecadadas por categoria, fonte e órgão.",
};

export default async function ReceitasPage() {
  const [receitas, anos] = await Promise.all([getReceitas(), getAnosDisponiveisReceitas()]);

  return (
    <div className="flex flex-col gap-6">
      <Breadcrumbs
        items={[
          { label: "Início", href: "/" },
          { label: "Transparência", href: "/transparencia" },
          { label: "Receitas" },
        ]}
      />
      <div>
        <h1 className="text-2xl font-semibold text-neutral-900">Receitas</h1>
        <p className="mt-2 max-w-3xl text-sm text-neutral-700 sm:text-base">
          Valores previstos e efetivamente arrecadados pelo município, por categoria,
          fonte de recurso e órgão responsável. Dados ilustrativos para fins de
          demonstração.
        </p>
      </div>
      <ReceitasFilterView receitas={receitas} anos={anos} />
    </div>
  );
}
