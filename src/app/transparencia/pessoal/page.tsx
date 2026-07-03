import type { Metadata } from "next";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import { getServidores } from "@/services";
import PessoalSearchView from "./PessoalSearchView";

export const metadata: Metadata = {
  title: "Pessoal",
  description: "Quadro de servidores públicos municipais, cargos, vínculos e remuneração.",
};

export default async function PessoalPage() {
  const servidores = await getServidores();

  return (
    <div className="flex flex-col gap-6">
      <Breadcrumbs
        items={[
          { label: "Início", href: "/" },
          { label: "Transparência", href: "/transparencia" },
          { label: "Pessoal" },
        ]}
      />
      <div>
        <h1 className="text-2xl font-semibold text-neutral-900">Pessoal</h1>
        <p className="mt-2 max-w-3xl text-sm text-neutral-700 sm:text-base">
          A divulgação da remuneração de servidores públicos é prevista pela Lei de
          Acesso à Informação e pelo entendimento do STF (Tema 483 / ARE 652777). Os
          dados abaixo são ilustrativos, para fins de demonstração.
        </p>
      </div>
      <PessoalSearchView servidores={servidores} />
    </div>
  );
}
