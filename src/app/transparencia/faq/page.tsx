import type { Metadata } from "next";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import { getFaqLai } from "@/services";
import type { FaqItem } from "@/types";

export const metadata: Metadata = {
  title: "Perguntas Frequentes",
  description: "Perguntas frequentes sobre a Lei de Acesso à Informação (LAI).",
};

function agruparPorCategoria(itens: FaqItem[]) {
  const grupos = new Map<string, FaqItem[]>();
  for (const item of itens) {
    const lista = grupos.get(item.categoria) ?? [];
    lista.push(item);
    grupos.set(item.categoria, lista);
  }
  return grupos;
}

function slugificar(texto: string): string {
  return texto
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default async function FaqPage() {
  const itens = await getFaqLai();
  const grupos = agruparPorCategoria(itens);

  return (
    <div className="flex flex-col gap-6">
      <Breadcrumbs
        items={[
          { label: "Início", href: "/" },
          { label: "Transparência", href: "/transparencia" },
          { label: "Perguntas Frequentes" },
        ]}
      />
      <div>
        <h1 className="text-2xl font-semibold text-neutral-900">
          Perguntas Frequentes sobre a LAI
        </h1>
        <p className="mt-2 max-w-3xl text-sm text-neutral-700 sm:text-base">
          Dúvidas comuns sobre a Lei de Acesso à Informação (Lei nº 12.527/2011) e o
          funcionamento do Portal da Transparência.
        </p>
      </div>

      <div className="flex flex-col gap-8">
        {Array.from(grupos.entries()).map(([categoria, lista]) => (
          <section
            key={categoria}
            aria-labelledby={`categoria-${slugificar(categoria)}`}
            className="flex flex-col gap-3"
          >
            <h2 id={`categoria-${slugificar(categoria)}`} className="text-lg font-semibold text-neutral-900">
              {categoria}
            </h2>
            <div className="flex flex-col gap-2">
              {lista.map((item) => (
                <details
                  key={item.id}
                  className="group rounded-xl border border-neutral-200 bg-neutral-0 px-4 py-3 open:shadow-soft"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-3 py-1 text-sm font-medium text-neutral-900 marker:content-none focus-visible:outline-3">
                    {item.pergunta}
                    <span
                      aria-hidden="true"
                      className="shrink-0 text-lg text-neutral-500 transition-transform group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-700">{item.resposta}</p>
                </details>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
