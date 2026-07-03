import type { Metadata } from "next";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import { getServicosPorCategoria } from "@/services/servicos.service";
import ServicosFilterList from "./ServicosFilterList";

export const metadata: Metadata = {
  title: "Serviços ao Cidadão",
  description:
    "Consulte os serviços públicos oferecidos pela Prefeitura de Capela de Santana, organizados por categoria.",
};

export default async function ServicosPage() {
  const servicosPorCategoria = await getServicosPorCategoria();

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: "Início", href: "/" }, { label: "Serviços ao Cidadão" }]} />

      <h1 className="mt-4 font-serif text-3xl font-bold text-neutral-900 sm:text-4xl">
        Serviços ao Cidadão
      </h1>
      <p className="mt-3 max-w-2xl text-neutral-600">
        Encontre informações sobre como solicitar, consultar e acompanhar os
        serviços públicos municipais.
      </p>

      <div className="mt-8">
        <ServicosFilterList servicosPorCategoria={servicosPorCategoria} />
      </div>
    </div>
  );
}
