import type { Noticia, PaginacaoResult } from "@/types";
import data from "@/data/noticias.json";

const noticias = data as Noticia[];

export async function getNoticias(): Promise<Noticia[]> {
  return [...noticias].sort(
    (a, b) => new Date(b.publicadoEm).getTime() - new Date(a.publicadoEm).getTime()
  );
}

export async function getNoticiaBySlug(slug: string): Promise<Noticia | undefined> {
  return noticias.find((noticia) => noticia.slug === slug);
}

export async function getNoticiasPaginadas(
  pagina: number,
  porPagina: number = 6
): Promise<PaginacaoResult<Noticia>> {
  const ordenadas = await getNoticias();
  const total = ordenadas.length;
  const totalPaginas = Math.max(1, Math.ceil(total / porPagina));
  const paginaAtual = Math.min(Math.max(1, pagina), totalPaginas);
  const inicio = (paginaAtual - 1) * porPagina;
  const itens = ordenadas.slice(inicio, inicio + porPagina);

  return {
    itens,
    total,
    pagina: paginaAtual,
    totalPaginas,
  };
}
