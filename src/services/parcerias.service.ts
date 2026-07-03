import type { Parceria } from "@/types";
import data from "@/data/parcerias.json";

// tipo and situacao in the JSON are inferred as generic `string`, not their respective unions, so a cast is required.
const parcerias = data as unknown as Parceria[];

export async function getParcerias(): Promise<Parceria[]> {
  return parcerias;
}
