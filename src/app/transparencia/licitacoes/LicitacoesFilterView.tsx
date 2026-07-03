"use client";

import { useMemo, useState } from "react";
import type { Licitacao, SituacaoLicitacao } from "@/types";
import FilterBar from "@/components/transparencia/FilterBar";
import TransparencyTable, {
  type TransparencyColumn,
} from "@/components/transparencia/TransparencyTable";
import Badge, { type BadgeTone } from "@/components/shared/Badge";
import { formatarMoeda, formatarDataCurta } from "../formatters";

export interface LicitacoesFilterViewProps {
  licitacoes: Licitacao[];
  anos: number[];
}

const SITUACAO_TONE: Record<SituacaoLicitacao, BadgeTone> = {
  Publicado: "primary",
  "Em andamento": "accent",
  Homologado: "success",
  Revogado: "danger",
  Deserto: "neutral",
};

const columns: TransparencyColumn<Licitacao>[] = [
  { key: "numero", header: "Número", accessor: (l) => l.numero, emphasis: true },
  { key: "modalidade", header: "Modalidade", accessor: (l) => l.modalidade },
  { key: "objeto", header: "Objeto", accessor: (l) => l.objeto },
  { key: "orgao", header: "Órgão", accessor: (l) => l.orgao },
  {
    key: "situacao",
    header: "Situação",
    accessor: (l) => <Badge tone={SITUACAO_TONE[l.situacao]}>{l.situacao}</Badge>,
  },
  {
    key: "valorEstimado",
    header: "Valor estimado",
    accessor: (l) => formatarMoeda(l.valorEstimado),
    align: "right",
  },
  { key: "dataAbertura", header: "Data de abertura", accessor: (l) => formatarDataCurta(l.dataAbertura) },
];

export default function LicitacoesFilterView({ licitacoes, anos }: LicitacoesFilterViewProps) {
  const [ano, setAno] = useState<number | undefined>(undefined);
  const [orgao, setOrgao] = useState<string | undefined>(undefined);

  const orgaos = useMemo(
    () =>
      Array.from(new Set(licitacoes.map((l) => l.orgao))).sort((a, b) => a.localeCompare(b, "pt-BR")),
    [licitacoes]
  );

  const filtradas = useMemo(
    () =>
      licitacoes.filter((l) => {
        if (ano !== undefined && l.ano !== ano) return false;
        if (orgao !== undefined && l.orgao !== orgao) return false;
        return true;
      }),
    [licitacoes, ano, orgao]
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
        rowKey={(l) => l.id}
        caption="Processos licitatórios do município"
      />
    </div>
  );
}
