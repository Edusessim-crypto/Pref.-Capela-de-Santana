"use client";

import { useMemo, useState } from "react";
import SearchBar from "@/components/shared/SearchBar";
import ServiceCard from "@/components/shared/ServiceCard";
import NewsCard from "@/components/shared/NewsCard";
import type { Noticia, Servico } from "@/types";

export interface BuscaResultadosProps {
  servicos: Servico[];
  noticias: Noticia[];
}

function normalizar(texto: string): string {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");
}

export default function BuscaResultados({ servicos, noticias }: BuscaResultadosProps) {
  const [query, setQuery] = useState("");

  const { servicosFiltrados, noticiasFiltradas } = useMemo(() => {
    const termo = normalizar(query.trim());

    if (!termo) {
      return { servicosFiltrados: [], noticiasFiltradas: [] };
    }

    return {
      servicosFiltrados: servicos.filter(
        (servico) =>
          normalizar(servico.titulo).includes(termo) ||
          normalizar(servico.descricao).includes(termo) ||
          normalizar(servico.categoria).includes(termo)
      ),
      noticiasFiltradas: noticias.filter(
        (noticia) =>
          normalizar(noticia.titulo).includes(termo) ||
          normalizar(noticia.resumo).includes(termo) ||
          normalizar(noticia.categoria).includes(termo)
      ),
    };
  }, [query, servicos, noticias]);

  const semResultados =
    query.trim().length > 0 &&
    servicosFiltrados.length === 0 &&
    noticiasFiltradas.length === 0;

  return (
    <div className="flex flex-col gap-8">
      <SearchBar
        placeholder="Buscar serviços, notícias..."
        onSearch={setQuery}
      />

      {query.trim().length === 0 && (
        <p className="text-sm text-neutral-500">
          Digite um termo para buscar entre serviços ao cidadão e notícias.
        </p>
      )}

      {semResultados && (
        <p className="text-sm text-neutral-500">
          Nenhum resultado encontrado para &ldquo;{query}&rdquo;.
        </p>
      )}

      {servicosFiltrados.length > 0 && (
        <section aria-labelledby="resultados-servicos-heading" className="flex flex-col gap-4">
          <h2 id="resultados-servicos-heading" className="text-lg font-semibold text-neutral-900">
            Serviços ({servicosFiltrados.length})
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {servicosFiltrados.map((servico) => (
              <ServiceCard key={servico.id} servico={servico} />
            ))}
          </div>
        </section>
      )}

      {noticiasFiltradas.length > 0 && (
        <section aria-labelledby="resultados-noticias-heading" className="flex flex-col gap-4">
          <h2 id="resultados-noticias-heading" className="text-lg font-semibold text-neutral-900">
            Notícias ({noticiasFiltradas.length})
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {noticiasFiltradas.map((noticia) => (
              <NewsCard key={noticia.id} noticia={noticia} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
