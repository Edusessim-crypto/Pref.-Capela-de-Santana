"use client";

import { useMemo, useState } from "react";
import type { Despesa, EstagioDespesa } from "@/types";
import FilterBar from "@/components/transparencia/FilterBar";
import TransparencyTable, {
  type TransparencyColumn,
} from "@/components/transparencia/TransparencyTable";
import Badge, { type BadgeTone } from "@/components/shared/Badge";
import { formatarMoeda, formatarDataCurta } from "../formatters";

export interface DespesasFilterViewProps {
  despesas: Despesa[];
  anos: number[];
  orgaos: string[];
}

const ESTAGIO_TONE: Record<EstagioDespesa, BadgeTone> = {
  empenhado: "neutral",
  liquidado: "primary",
  pago: "success",
};

const ESTAGIO_LABEL: Record<EstagioDespesa, string> = {
  empenhado: "Empenhado",
  liquidado: "Liquidado",
  pago: "Pago",
};

const columns: TransparencyColumn<Despesa>[] = [
  { key: "orgao", header: "Órgão", accessor: (d) => d.orgao },
  { key: "funcao", header: "Função", accessor: (d) => d.funcao },
  { key: "credor", header: "Credor", accessor: (d) => d.credor },
  { key: "numeroEmpenho", header: "Empenho", accessor: (d) => d.numeroEmpenho },
  {
    key: "estagio",
    header: "Estágio",
    accessor: (d) => <Badge tone={ESTAGIO_TONE[d.estagio]}>{ESTAGIO_LABEL[d.estagio]}</Badge>,
  },
  {
    key: "valorEmpenhado",
    header: "Empenhado",
    accessor: (d) => formatarMoeda(d.valorEmpenhado),
    align: "right",
  },
  {
    key: "valorLiquidado",
    header: "Liquidado",
    accessor: (d) => formatarMoeda(d.valorLiquidado),
    align: "right",
  },
  {
    key: "valorPago",
    header: "Pago",
    accessor: (d) => formatarMoeda(d.valorPago),
    align: "right",
    emphasis: true,
  },
  {
    key: "dataEmpenho",
    header: "Data do empenho",
    accessor: (d) => formatarDataCurta(d.dataEmpenho),
  },
];

export default function DespesasFilterView({ despesas, anos, orgaos }: DespesasFilterViewProps) {
  const [ano, setAno] = useState<number | undefined>(undefined);
  const [orgao, setOrgao] = useState<string | undefined>(undefined);

  const filtradas = useMemo(
    () =>
      despesas.filter((d) => {
        if (ano !== undefined && d.ano !== ano) return false;
        if (orgao !== undefined && d.orgao !== orgao) return false;
        return true;
      }),
    [despesas, ano, orgao]
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
        rowKey={(d) => d.id}
        caption="Despesas municipais por estágio de execução orçamentária"
      />
    </div>
  );
}
