import type { Metadata } from "next";
import { Download } from "lucide-react";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import { getConjuntosDados } from "@/services";
import TransparencyTable, {
  type TransparencyColumn,
} from "@/components/transparencia/TransparencyTable";
import Badge from "@/components/shared/Badge";
import type { ConjuntoDadosAbertos } from "@/types";
import { formatarDataCurta } from "../formatters";

export const metadata: Metadata = {
  title: "Dados Abertos",
  description: "Conjuntos de dados públicos do município em formatos abertos para reuso.",
};

const columns: TransparencyColumn<ConjuntoDadosAbertos>[] = [
  {
    key: "titulo",
    header: "Conjunto de dados",
    accessor: (c) => (
      <div className="flex flex-col gap-0.5">
        <span className="font-semibold text-neutral-900">{c.titulo}</span>
        <span className="text-xs font-normal text-neutral-600">{c.descricao}</span>
      </div>
    ),
    emphasis: true,
  },
  { key: "categoria", header: "Categoria", accessor: (c) => c.categoria },
  { key: "formato", header: "Formato", accessor: (c) => <Badge tone="primary">{c.formato}</Badge> },
  {
    key: "ultimaAtualizacao",
    header: "Última atualização",
    accessor: (c) => formatarDataCurta(c.ultimaAtualizacao),
  },
  { key: "tamanhoAproximado", header: "Tamanho", accessor: (c) => c.tamanhoAproximado },
  { key: "licenca", header: "Licença", accessor: (c) => c.licenca },
  {
    key: "download",
    header: "Download",
    accessor: (c) => (
      <a
        href={c.arquivoUrl}
        className="inline-flex h-11 items-center gap-2 rounded-lg bg-primary-600 px-4 text-sm font-medium text-white transition-colors hover:bg-primary-700"
      >
        <Download className="h-4 w-4" aria-hidden="true" />
        Baixar
      </a>
    ),
  },
];

export default async function DadosAbertosPage() {
  const conjuntos = await getConjuntosDados();

  return (
    <div className="flex flex-col gap-6">
      <Breadcrumbs
        items={[
          { label: "Início", href: "/" },
          { label: "Transparência", href: "/transparencia" },
          { label: "Dados Abertos" },
        ]}
      />
      <div>
        <h1 className="text-2xl font-semibold text-neutral-900">Dados Abertos</h1>
        <p className="mt-2 max-w-3xl text-sm text-neutral-700 sm:text-base">
          Conjuntos de dados públicos disponibilizados em formatos abertos e
          estruturados, para livre reuso pela sociedade. Dados e descrições
          ilustrativos para fins de demonstração.
        </p>
      </div>
      <TransparencyTable
        columns={columns}
        data={conjuntos}
        rowKey={(c) => c.id}
        caption="Conjuntos de dados abertos do município"
      />
    </div>
  );
}
