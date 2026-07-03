import type { Despesa, FiltroAnoOrgao } from "@/types";
import data from "@/data/despesas.json";

// estagio in the JSON is inferred as a generic `string`, not the `EstagioDespesa` union, so a cast is required.
const despesas = data as unknown as Despesa[];

export async function getDespesas(filtro?: FiltroAnoOrgao): Promise<Despesa[]> {
  return despesas.filter((despesa) => {
    if (filtro?.ano !== undefined && despesa.ano !== filtro.ano) return false;
    if (filtro?.orgao !== undefined && despesa.orgao !== filtro.orgao) return false;
    return true;
  });
}

export async function getAnosDisponiveisDespesas(): Promise<number[]> {
  const anos = new Set(despesas.map((despesa) => despesa.ano));
  return [...anos].sort((a, b) => b - a);
}

export async function getOrgaosDisponiveisDespesas(): Promise<string[]> {
  const orgaos = new Set(despesas.map((despesa) => despesa.orgao));
  return [...orgaos].sort((a, b) => a.localeCompare(b, "pt-BR"));
}
