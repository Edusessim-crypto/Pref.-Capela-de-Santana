import type { Secretaria } from "@/types";
import data from "@/data/secretarias.json";

const secretarias = data as Secretaria[];

export async function getSecretarias(): Promise<Secretaria[]> {
  return secretarias;
}

export async function getSecretariaById(id: string): Promise<Secretaria | undefined> {
  return secretarias.find((secretaria) => secretaria.id === id);
}
