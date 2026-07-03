"use client";

import { useMemo, useState } from "react";
import NewsCard from "@/components/shared/NewsCard";
import Pagination from "@/components/shared/Pagination";
import type { Noticia } from "@/types";

const POR_PAGINA = 6;

export interface NoticiasListClientProps {
  noticias: Noticia[];
}

export default function NoticiasListClient({ noticias }: NoticiasListClientProps) {
  const [paginaAtual, setPaginaAtual] = useState(1);
  const totalPaginas = Math.max(1, Math.ceil(noticias.length / POR_PAGINA));

  const itensPagina = useMemo(() => {
    const inicio = (paginaAtual - 1) * POR_PAGINA;
    return noticias.slice(inicio, inicio + POR_PAGINA);
  }, [noticias, paginaAtual]);

  function handleChange(pagina: number) {
    setPaginaAtual(pagina);
  }

  return (
    <div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {itensPagina.map((noticia) => (
          <NewsCard key={noticia.id} noticia={noticia} />
        ))}
      </div>

      {totalPaginas > 1 && (
        <div className="mt-10">
          <Pagination
            paginaAtual={paginaAtual}
            totalPaginas={totalPaginas}
            onChange={handleChange}
          />
        </div>
      )}
    </div>
  );
}
