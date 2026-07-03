import type { Metadata } from "next";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import { getParcerias } from "@/services";
import TransparencyTable, {
  type TransparencyColumn,
} from "@/components/transparencia/TransparencyTable";
import Badge, { type BadgeTone } from "@/components/shared/Badge";
import type { Parceria } from "@/types";
import { formatarMoeda, formatarDataCurta } from "../formatters";

export const metadata: Metadata = {
  title: "Parcerias e Convênios",
  description: "Convênios, termos de fomento e de colaboração firmados pelo município.",
};

const SITUACAO_TONE: Record<Parceria["situacao"], BadgeTone> = {
  Vigente: "success",
  Encerrado: "neutral",
  "Prestação de contas pendente": "warning",
};

const columns: TransparencyColumn<Parceria>[] = [
  { key: "numero", header: "Número", accessor: (p) => p.numero, emphasis: true },
  { key: "tipo", header: "Tipo", accessor: (p) => p.tipo },
  { key: "objeto", header: "Objeto", accessor: (p) => p.objeto },
  { key: "parceiro", header: "Parceiro", accessor: (p) => p.parceiro },
  {
    key: "valor",
    header: "Valor",
    accessor: (p) => formatarMoeda(p.valor),
    align: "right",
  },
  {
    key: "vigencia",
    header: "Vigência",
    accessor: (p) => `${formatarDataCurta(p.dataInicio)} a ${formatarDataCurta(p.dataFim)}`,
  },
  {
    key: "situacao",
    header: "Situação",
    accessor: (p) => <Badge tone={SITUACAO_TONE[p.situacao]}>{p.situacao}</Badge>,
  },
];

export default async function ParceriasPage() {
  const parcerias = await getParcerias();

  return (
    <div className="flex flex-col gap-6">
      <Breadcrumbs
        items={[
          { label: "Início", href: "/" },
          { label: "Transparência", href: "/transparencia" },
          { label: "Parcerias" },
        ]}
      />
      <div>
        <h1 className="text-2xl font-semibold text-neutral-900">Parcerias e Convênios</h1>
        <p className="mt-2 max-w-3xl text-sm text-neutral-700 sm:text-base">
          Convênios, termos de fomento, de colaboração e de parceria firmados entre o
          município e entidades parceiras. Dados ilustrativos para fins de
          demonstração.
        </p>
      </div>
      <TransparencyTable
        columns={columns}
        data={parcerias}
        rowKey={(p) => p.id}
        caption="Parcerias e convênios do município"
      />
    </div>
  );
}
