import type { Metadata } from "next";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import { getBensPatrimoniais } from "@/services";
import TransparencyTable, {
  type TransparencyColumn,
} from "@/components/transparencia/TransparencyTable";
import Badge, { type BadgeTone } from "@/components/shared/Badge";
import type { BemPatrimonial } from "@/types";
import { formatarMoeda, formatarDataCurta } from "../formatters";

export const metadata: Metadata = {
  title: "Patrimônio",
  description: "Bens móveis e imóveis do patrimônio público municipal.",
};

const ESTADO_TONE: Record<BemPatrimonial["estadoConservacao"], BadgeTone> = {
  Novo: "success",
  Bom: "primary",
  Regular: "warning",
  Ruim: "danger",
};

const columns: TransparencyColumn<BemPatrimonial>[] = [
  { key: "descricao", header: "Descrição", accessor: (b) => b.descricao, emphasis: true },
  { key: "categoria", header: "Categoria", accessor: (b) => b.categoria },
  { key: "numeroTombamento", header: "Nº de tombamento", accessor: (b) => b.numeroTombamento },
  { key: "localizacao", header: "Localização", accessor: (b) => b.localizacao },
  {
    key: "valorAquisicao",
    header: "Valor de aquisição",
    accessor: (b) => formatarMoeda(b.valorAquisicao),
    align: "right",
  },
  {
    key: "dataAquisicao",
    header: "Data de aquisição",
    accessor: (b) => formatarDataCurta(b.dataAquisicao),
  },
  {
    key: "estadoConservacao",
    header: "Estado de conservação",
    accessor: (b) => <Badge tone={ESTADO_TONE[b.estadoConservacao]}>{b.estadoConservacao}</Badge>,
  },
];

export default async function PatrimonioPage() {
  const bens = await getBensPatrimoniais();

  return (
    <div className="flex flex-col gap-6">
      <Breadcrumbs
        items={[
          { label: "Início", href: "/" },
          { label: "Transparência", href: "/transparencia" },
          { label: "Patrimônio" },
        ]}
      />
      <div>
        <h1 className="text-2xl font-semibold text-neutral-900">Patrimônio</h1>
        <p className="mt-2 max-w-3xl text-sm text-neutral-700 sm:text-base">
          Relação de bens móveis e imóveis que compõem o patrimônio do município,
          incluindo estado de conservação e valor de aquisição. Dados ilustrativos para
          fins de demonstração.
        </p>
      </div>
      <TransparencyTable
        columns={columns}
        data={bens}
        rowKey={(b) => b.id}
        caption="Bens patrimoniais do município"
      />
    </div>
  );
}
