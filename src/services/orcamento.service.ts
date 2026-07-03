import type { DocumentoOrcamentario } from "@/types";
import data from "@/data/orcamento.json";

// tipo in the JSON is inferred as a generic `string`, not the TipoDocumentoOrcamentario union, so a cast is required.
const documentosOrcamentarios = data as unknown as DocumentoOrcamentario[];

export async function getDocumentosOrcamentarios(): Promise<DocumentoOrcamentario[]> {
  return documentosOrcamentarios;
}
