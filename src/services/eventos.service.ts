import type { Evento } from "@/types";
import data from "@/data/eventos.json";

const eventos = data as Evento[];

export async function getEventos(): Promise<Evento[]> {
  return [...eventos].sort(
    (a, b) => new Date(a.dataInicio).getTime() - new Date(b.dataInicio).getTime()
  );
}
