import type { Obra } from "@/types";
import data from "@/data/obras.json";

// status in the JSON is inferred as a generic `string`, not the StatusObra union, so a cast is required.
const obras = data as unknown as Obra[];

export async function getObras(): Promise<Obra[]> {
  return obras;
}
