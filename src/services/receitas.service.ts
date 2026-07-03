import type { FiltroAnoOrgao, Receita } from "@/types";
import data from "@/data/receitas.json";

const receitas = data as Receita[];

export async function getReceitas(filtro?: FiltroAnoOrgao): Promise<Receita[]> {
  return receitas.filter((receita) => {
    if (filtro?.ano !== undefined && receita.ano !== filtro.ano) return false;
    if (filtro?.orgao !== undefined && receita.orgao !== filtro.orgao) return false;
    return true;
  });
}

export async function getAnosDisponiveisReceitas(): Promise<number[]> {
  const anos = new Set(receitas.map((receita) => receita.ano));
  return [...anos].sort((a, b) => b - a);
}
