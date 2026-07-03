"use client";

import { useMemo, useState } from "react";
import type { Receita } from "@/types";
import FilterBar from "@/components/transparencia/FilterBar";
import TransparencyTable, {
  type TransparencyColumn,
} from "@/components/transparencia/TransparencyTable";
import { formatarMoeda, formatarPercentual } from "../formatters";

export interface ReceitasFilterViewProps {
  receitas: Receita[];
  anos: number[];
}

const columns: TransparencyColumn<Receita>[] = [
  { key: "categoria", header: "Categoria", accessor: (r) => r.categoria },
  { key: "fonte", header: "Fonte", accessor: (r) => r.fonte },
  { key: "orgao", header: "Órgão", accessor: (r) => r.orgao },
  {
    key: "valorPrevisto",
    header: "Valor previsto",
    accessor: (r) => formatarMoeda(r.valorPrevisto),
    align: "right",
  },
  {
    key: "valorArrecadado",
    header: "Valor arrecadado",
    accessor: (r) => formatarMoeda(r.valorArrecadado),
    align: "right",
    emphasis: true,
  },
  {
    key: "percentual",
    header: "% arrecadado",
    accessor: (r) => formatarPercentual(r.valorArrecadado, r.valorPrevisto),
    align: "right",
  },
];

export default function ReceitasFilterView({ receitas, anos }: ReceitasFilterViewProps) {
  const [ano, setAno] = useState<number | undefined>(undefined);
  const [orgao, setOrgao] = useState<string | undefined>(undefined);

  const orgaos = useMemo(
    () => Array.from(new Set(receitas.map((r) => r.orgao))).sort((a, b) => a.localeCompare(b, "pt-BR")),
    [receitas]
  );

  const filtradas = useMemo(
    () =>
      receitas.filter((r) => {
        if (ano !== undefined && r.ano !== ano) return false;
        if (orgao !== undefined && r.orgao !== orgao) return false;
        return true;
      }),
    [receitas, ano, orgao]
  );

  return (
    <div className="flex flex-col gap-4">
      <FilterBar
        anos={anos}
        orgaos={orgaos}
        selectedAno={ano}
        selectedOrgao={orgao}
        onAnoChange={setAno}
        onOrgaoChange={setOrgao}
      />
      <TransparencyTable
        columns={columns}
        data={filtradas}
        rowKey={(r) => r.id}
        caption="Receitas municipais por categoria, fonte e órgão"
      />
    </div>
  );
}
