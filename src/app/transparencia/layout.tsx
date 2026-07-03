import type { ReactNode } from "react";
import { ShieldCheck } from "lucide-react";
import { IS_DEMO_ENV } from "@/lib/constants";
import TransparenciaNav from "./TransparenciaNav";

export default function TransparenciaLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col">
      <section className="border-b border-primary-800 bg-primary-900 text-neutral-0">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-7 w-7 text-accent-500" aria-hidden="true" />
            <p className="text-2xl font-semibold sm:text-3xl">Portal da Transparência</p>
          </div>
          <p className="max-w-3xl text-sm text-primary-100 sm:text-base">
            Acesso às informações públicas de receitas, despesas, pessoal, patrimônio,
            licitações, contratos, obras e demais dados da administração municipal, em
            conformidade com a Lei de Acesso à Informação (Lei nº 12.527/2011).
          </p>
          {IS_DEMO_ENV ? (
            <p className="inline-flex w-fit items-center gap-2 rounded-full bg-accent-500/15 px-3 py-1.5 text-xs font-medium text-accent-500 sm:text-sm">
              Ambiente de demonstração — todos os dados exibidos são ilustrativos
            </p>
          ) : null}
        </div>
      </section>

      <TransparenciaNav />

      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">{children}</div>
    </div>
  );
}
