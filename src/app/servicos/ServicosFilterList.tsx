"use client";

import { useMemo, useState } from "react";
import ServiceCard from "@/components/shared/ServiceCard";
import SearchBar from "@/components/shared/SearchBar";
import type { Servico } from "@/types";

export interface ServicosFilterListProps {
  servicosPorCategoria: Record<string, Servico[]>;
}

function filtrarServicos(
  servicosPorCategoria: Record<string, Servico[]>,
  termo: string
): Record<string, Servico[]> {
  if (!termo) return servicosPorCategoria;

  const termoNormalizado = termo.toLowerCase();
  const resultado: Record<string, Servico[]> = {};

  for (const [categoria, servicos] of Object.entries(servicosPorCategoria)) {
    const filtrados = servicos.filter(
      (servico) =>
        servico.titulo.toLowerCase().includes(termoNormalizado) ||
        servico.descricao.toLowerCase().includes(termoNormalizado)
    );
    if (filtrados.length > 0) {
      resultado[categoria] = filtrados;
    }
  }

  return resultado;
}

export default function ServicosFilterList({
  servicosPorCategoria,
}: ServicosFilterListProps) {
  const [termo, setTermo] = useState("");

  const categoriasFiltradas = useMemo(
    () => filtrarServicos(servicosPorCategoria, termo),
    [servicosPorCategoria, termo]
  );
  const categorias = Object.keys(categoriasFiltradas);

  return (
    <div>
      <SearchBar
        placeholder="Buscar serviço por nome ou descrição..."
        onSearch={setTermo}
      />

      {categorias.length === 0 ? (
        <p className="mt-10 text-neutral-600">
          Nenhum serviço encontrado para &ldquo;{termo}&rdquo;.
        </p>
      ) : (
        categorias.map((categoria) => (
          <section key={categoria} aria-labelledby={`categoria-${categoria}`} className="mt-10">
            <h2
              id={`categoria-${categoria}`}
              className="font-serif text-xl font-semibold text-neutral-900"
            >
              {categoria}
            </h2>
            <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {categoriasFiltradas[categoria].map((servico) => (
                <ServiceCard key={servico.id} servico={servico} />
              ))}
            </div>
          </section>
        ))
      )}
    </div>
  );
}
