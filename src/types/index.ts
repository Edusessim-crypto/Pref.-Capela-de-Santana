export * from "./noticia";
export * from "./secretaria";
export * from "./servico";
export * from "./evento";
export * from "./transparencia";
export * from "./esic";

export interface FiltroAnoOrgao {
  ano?: number;
  orgao?: string;
}

export interface PaginacaoResult<T> {
  itens: T[];
  total: number;
  pagina: number;
  totalPaginas: number;
}
