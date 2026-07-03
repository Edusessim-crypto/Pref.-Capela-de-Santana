import type { Servico } from "@/types";
import data from "@/data/servicos.json";

const servicos = data as Servico[];

export async function getServicos(): Promise<Servico[]> {
  return servicos;
}

export async function getServicoBySlug(slug: string): Promise<Servico | undefined> {
  return servicos.find((servico) => servico.slug === slug);
}

export async function getServicosPorCategoria(): Promise<Record<string, Servico[]>> {
  return servicos.reduce<Record<string, Servico[]>>((agrupados, servico) => {
    const grupo = agrupados[servico.categoria] ?? [];
    grupo.push(servico);
    agrupados[servico.categoria] = grupo;
    return agrupados;
  }, {});
}
