"use client";

import { useMemo, useState } from "react";
import type { Servidor } from "@/types";
import SearchBar from "@/components/shared/SearchBar";
import TransparencyTable, {
  type TransparencyColumn,
} from "@/components/transparencia/TransparencyTable";
import Badge from "@/components/shared/Badge";
import { formatarMoeda, formatarDataCurta } from "../formatters";

export interface PessoalSearchViewProps {
  servidores: Servidor[];
}

const columns: TransparencyColumn<Servidor>[] = [
  { key: "nome", header: "Nome", accessor: (s) => s.nome, emphasis: true },
  { key: "cargo", header: "Cargo", accessor: (s) => s.cargo },
  { key: "lotacao", header: "Lotação", accessor: (s) => s.lotacao },
  { key: "vinculo", header: "Vínculo", accessor: (s) => <Badge tone="primary">{s.vinculo}</Badge> },
  { key: "admissao", header: "Admissão", accessor: (s) => formatarDataCurta(s.admissao) },
  {
    key: "remuneracaoBase",
    header: "Remuneração base",
    accessor: (s) => formatarMoeda(s.remuneracaoBase),
    align: "right",
  },
  {
    key: "gratificacoes",
    header: "Gratificações",
    accessor: (s) => formatarMoeda(s.gratificacoes),
    align: "right",
  },
  {
    key: "remuneracaoTotal",
    header: "Remuneração total",
    accessor: (s) => formatarMoeda(s.remuneracaoTotal),
    align: "right",
    emphasis: true,
  },
];

export default function PessoalSearchView({ servidores }: PessoalSearchViewProps) {
  const [busca, setBusca] = useState("");

  const filtrados = useMemo(() => {
    const termo = busca.trim().toLowerCase();
    if (!termo) return servidores;
    return servidores.filter(
      (s) => s.nome.toLowerCase().includes(termo) || s.cargo.toLowerCase().includes(termo)
    );
  }, [servidores, busca]);

  return (
    <div className="flex flex-col gap-4">
      <SearchBar placeholder="Buscar por nome ou cargo..." onSearch={setBusca} />
      <TransparencyTable
        columns={columns}
        data={filtrados}
        rowKey={(s) => s.id}
        caption="Quadro de servidores e remuneração"
        emptyMessage="Nenhum servidor encontrado para a busca informada."
      />
    </div>
  );
}
