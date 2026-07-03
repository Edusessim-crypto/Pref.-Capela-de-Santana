import type { Metadata } from "next";
import { Download } from "lucide-react";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import { getDocumentosOrcamentarios } from "@/services";
import type { DocumentoOrcamentario, TipoDocumentoOrcamentario } from "@/types";
import { formatarDataLonga } from "../formatters";

export const metadata: Metadata = {
  title: "Prestação de Contas",
  description: "Documentos orçamentários e fiscais: PPA, LDO, LOA, RREO e RGF.",
};

const ORDEM_TIPOS: TipoDocumentoOrcamentario[] = ["PPA", "LDO", "LOA", "RREO", "RGF"];

const TIPO_INFO: Record<TipoDocumentoOrcamentario, { titulo: string; explicacao: string }> = {
  PPA: {
    titulo: "PPA — Plano Plurianual",
    explicacao: "Planejamento de médio prazo da administração, geralmente com vigência de 4 anos.",
  },
  LDO: {
    titulo: "LDO — Lei de Diretrizes Orçamentárias",
    explicacao:
      "Define metas e prioridades da administração para o exercício seguinte e orienta a elaboração da LOA.",
  },
  LOA: {
    titulo: "LOA — Lei Orçamentária Anual",
    explicacao: "Estima receitas e fixa despesas do município para o exercício financeiro.",
  },
  RREO: {
    titulo: "RREO — Relatório Resumido de Execução Orçamentária",
    explicacao: "Demonstra bimestralmente o desempenho da arrecadação e da execução das despesas.",
  },
  RGF: {
    titulo: "RGF — Relatório de Gestão Fiscal",
    explicacao: "Demonstra o cumprimento dos limites de despesas com pessoal, dívida e outros indicadores fiscais.",
  },
};

function agruparPorTipo(documentos: DocumentoOrcamentario[]) {
  const grupos = new Map<TipoDocumentoOrcamentario, DocumentoOrcamentario[]>();
  for (const documento of documentos) {
    const lista = grupos.get(documento.tipo) ?? [];
    lista.push(documento);
    grupos.set(documento.tipo, lista);
  }
  for (const lista of grupos.values()) {
    lista.sort((a, b) => b.ano - a.ano);
  }
  return grupos;
}

export default async function PrestacaoContasPage() {
  const documentos = await getDocumentosOrcamentarios();
  const grupos = agruparPorTipo(documentos);

  return (
    <div className="flex flex-col gap-6">
      <Breadcrumbs
        items={[
          { label: "Início", href: "/" },
          { label: "Transparência", href: "/transparencia" },
          { label: "Prestação de Contas" },
        ]}
      />
      <div>
        <h1 className="text-2xl font-semibold text-neutral-900">Prestação de Contas</h1>
        <p className="mt-2 max-w-3xl text-sm text-neutral-700 sm:text-base">
          Documentos de planejamento e execução orçamentária e fiscal do município.
          Dados e arquivos ilustrativos para fins de demonstração.
        </p>
      </div>

      <div className="flex flex-col gap-10">
        {ORDEM_TIPOS.map((tipo) => {
          const lista = grupos.get(tipo);
          if (!lista || lista.length === 0) return null;
          const info = TIPO_INFO[tipo];
          return (
            <section key={tipo} aria-labelledby={`secao-${tipo}`} className="flex flex-col gap-4">
              <div>
                <h2 id={`secao-${tipo}`} className="text-lg font-semibold text-neutral-900">
                  {info.titulo}
                </h2>
                <p className="mt-1 text-sm text-neutral-600">{info.explicacao}</p>
              </div>
              <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {lista.map((documento) => (
                  <li
                    key={documento.id}
                    className="flex flex-col gap-2 rounded-xl border border-neutral-200 bg-neutral-0 p-4 shadow-soft"
                  >
                    <div className="flex items-baseline justify-between gap-2">
                      <span className="font-semibold text-neutral-900">{documento.titulo}</span>
                      <span className="text-sm text-neutral-500">{documento.ano}</span>
                    </div>
                    {documento.periodo ? (
                      <span className="text-xs font-medium uppercase tracking-wide text-neutral-500">
                        {documento.periodo}
                      </span>
                    ) : null}
                    <p className="text-sm text-neutral-700">{documento.descricao}</p>
                    <p className="text-xs text-neutral-500">
                      Publicado em {formatarDataLonga(documento.publicadoEm)}
                    </p>
                    <a
                      href={documento.arquivoUrl}
                      className="mt-2 inline-flex h-11 w-fit items-center gap-2 rounded-lg bg-primary-600 px-4 text-sm font-medium text-white transition-colors hover:bg-primary-700"
                    >
                      <Download className="h-4 w-4" aria-hidden="true" />
                      Baixar documento
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </div>
  );
}
