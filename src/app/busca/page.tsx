import type { Metadata } from "next";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import { getServicos } from "@/services/servicos.service";
import { getNoticias } from "@/services/noticias.service";
import BuscaResultados from "./BuscaResultados";

export const metadata: Metadata = {
  title: "Buscar no site",
  description: "Busque por serviços ao cidadão e notícias da Prefeitura de Capela de Santana.",
};

export default async function BuscaPage() {
  const [servicos, noticias] = await Promise.all([getServicos(), getNoticias()]);

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: "Início", href: "/" }, { label: "Buscar" }]} />
      <h1 className="text-2xl font-semibold text-neutral-900">Buscar no site</h1>
      <BuscaResultados servicos={servicos} noticias={noticias} />
    </div>
  );
}
