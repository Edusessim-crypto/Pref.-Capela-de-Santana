import type { Contrato } from "@/types";
import data from "@/data/contratos.json";

// situacao in the JSON is inferred as a generic `string`, not the Contrato["situacao"] union, so a cast is required.
const contratos = data as unknown as Contrato[];

export async function getContratos(): Promise<Contrato[]> {
  return contratos;
}
