import type { FiltroAnoOrgao, Licitacao } from "@/types";
import data from "@/data/licitacoes.json";

// modalidade and situacao in the JSON are inferred as generic `string`, not their respective unions, so a cast is required.
const licitacoes = data as unknown as Licitacao[];

export async function getLicitacoes(filtro?: FiltroAnoOrgao): Promise<Licitacao[]> {
  return licitacoes.filter((licitacao) => {
    if (filtro?.ano !== undefined && licitacao.ano !== filtro.ano) return false;
    if (filtro?.orgao !== undefined && licitacao.orgao !== filtro.orgao) return false;
    return true;
  });
}
