export interface Noticia {
  id: string;
  slug: string;
  titulo: string;
  resumo: string;
  conteudoHtml: string;
  categoria: string;
  autor: string;
  imagemCapa: string;
  imagemAlt: string;
  publicadoEm: string;
  atualizadoEm?: string;
}
