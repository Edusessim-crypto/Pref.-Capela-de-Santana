import type { Servidor } from "@/types";
import data from "@/data/servidores.json";

// vinculo in the JSON is inferred as a generic `string`, not the Servidor["vinculo"] union, so a cast is required.
const servidores = data as unknown as Servidor[];

export async function getServidores(): Promise<Servidor[]> {
  return servidores;
}
