import type { ConjuntoDadosAbertos } from "@/types";
import data from "@/data/dados-abertos.json";

// formato in the JSON is inferred as a generic `string`, not the ConjuntoDadosAbertos["formato"] union, so a cast is required.
const conjuntosDados = data as unknown as ConjuntoDadosAbertos[];

export async function getConjuntosDados(): Promise<ConjuntoDadosAbertos[]> {
  return conjuntosDados;
}
