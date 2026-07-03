"use client";

import { Download } from "lucide-react";

export interface FilterBarProps {
  anos?: number[];
  orgaos?: string[];
  selectedAno?: number;
  selectedOrgao?: string;
  onAnoChange?: (ano: number | undefined) => void;
  onOrgaoChange?: (orgao: string | undefined) => void;
  onExport?: () => void;
}

function handleExportPadrao() {
  alert(
    "Exportação ilustrativa — em um ambiente de produção, este botão geraria o arquivo real (CSV/PDF)."
  );
}

export default function FilterBar({
  anos,
  orgaos,
  selectedAno,
  selectedOrgao,
  onAnoChange,
  onOrgaoChange,
  onExport,
}: FilterBarProps) {
  return (
    <div className="flex flex-wrap items-end gap-4">
      {anos ? (
        <div className="flex flex-col gap-1">
          <label htmlFor="filter-bar-ano" className="text-xs font-medium text-neutral-600">
            Ano
          </label>
          <select
            id="filter-bar-ano"
            value={selectedAno ?? ""}
            onChange={(event) =>
              onAnoChange?.(event.target.value === "" ? undefined : Number(event.target.value))
            }
            className="h-11 min-w-[10rem] rounded-lg border border-neutral-300 bg-neutral-0 px-3 text-sm text-neutral-900"
          >
            <option value="">Todos os anos</option>
            {anos.map((ano) => (
              <option key={ano} value={ano}>
                {ano}
              </option>
            ))}
          </select>
        </div>
      ) : null}

      {orgaos ? (
        <div className="flex flex-col gap-1">
          <label htmlFor="filter-bar-orgao" className="text-xs font-medium text-neutral-600">
            Órgão
          </label>
          <select
            id="filter-bar-orgao"
            value={selectedOrgao ?? ""}
            onChange={(event) =>
              onOrgaoChange?.(event.target.value === "" ? undefined : event.target.value)
            }
            className="h-11 min-w-[12rem] rounded-lg border border-neutral-300 bg-neutral-0 px-3 text-sm text-neutral-900"
          >
            <option value="">Todos os órgãos</option>
            {orgaos.map((orgao) => (
              <option key={orgao} value={orgao}>
                {orgao}
              </option>
            ))}
          </select>
        </div>
      ) : null}

      <button
        type="button"
        onClick={onExport ?? handleExportPadrao}
        className="flex h-11 items-center gap-2 rounded-lg bg-primary-600 px-4 text-sm font-medium text-white transition-colors hover:bg-primary-700"
      >
        <Download className="h-4 w-4" aria-hidden="true" />
        Exportar
      </button>
    </div>
  );
}
