import type { BemPatrimonial } from "@/types";
import data from "@/data/patrimonio.json";

// estadoConservacao in the JSON is inferred as a generic `string`, not the BemPatrimonial union, so a cast is required.
const bensPatrimoniais = data as unknown as BemPatrimonial[];

export async function getBensPatrimoniais(): Promise<BemPatrimonial[]> {
  return bensPatrimoniais;
}
