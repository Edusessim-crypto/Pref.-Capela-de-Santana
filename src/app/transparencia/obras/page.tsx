import type { Metadata } from "next";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import { getObras } from "@/services";
import TransparencyTable, {
  type TransparencyColumn,
} from "@/components/transparencia/TransparencyTable";
import Badge, { type BadgeTone } from "@/components/shared/Badge";
import type { Obra, StatusObra } from "@/types";
import { formatarMoeda, formatarDataCurta } from "../formatters";
import ObrasMapSection from "./ObrasMapSection";

export const metadata: Metadata = {
  title: "Obras Públicas",
  description: "Andamento físico e financeiro das obras públicas municipais.",
};

const STATUS_TONE: Record<StatusObra, BadgeTone> = {
  Planejada: "neutral",
  "Em execução": "primary",
  Paralisada: "warning",
  Concluída: "success",
};

const columns: TransparencyColumn<Obra>[] = [
  { key: "nome", header: "Obra", accessor: (o) => o.nome, emphasis: true },
  { key: "bairro", header: "Bairro", accessor: (o) => o.bairro },
  { key: "status", header: "Status", accessor: (o) => <Badge tone={STATUS_TONE[o.status]}>{o.status}</Badge> },
  { key: "percentualExecucao", header: "% executado", accessor: (o) => `${o.percentualExecucao}%`, align: "right" },
  {
    key: "valorContratado",
    header: "Valor contratado",
    accessor: (o) => formatarMoeda(o.valorContratado),
    align: "right",
  },
  {
    key: "valorPago",
    header: "Valor pago",
    accessor: (o) => formatarMoeda(o.valorPago),
    align: "right",
  },
  {
    key: "previsaoTermino",
    header: "Previsão de término",
    accessor: (o) => formatarDataCurta(o.previsaoTermino),
  },
];

export default async function ObrasPage() {
  const obras = await getObras();

  return (
    <div className="flex flex-col gap-6">
      <Breadcrumbs
        items={[
          { label: "Início", href: "/" },
          { label: "Transparência", href: "/transparencia" },
          { label: "Obras Públicas" },
        ]}
      />
      <div>
        <h1 className="text-2xl font-semibold text-neutral-900">Obras Públicas</h1>
        <p className="mt-2 max-w-3xl text-sm text-neutral-700 sm:text-base">
          Localização geográfica e andamento físico-financeiro das obras públicas
          municipais. Dados ilustrativos para fins de demonstração.
        </p>
      </div>

      <ObrasMapSection obras={obras} />

      <TransparencyTable
        columns={columns}
        data={obras}
        rowKey={(o) => o.id}
        caption="Relação de obras públicas do município"
      />
    </div>
  );
}
