import type { Metadata } from "next";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import { getContratos } from "@/services";
import TransparencyTable, {
  type TransparencyColumn,
} from "@/components/transparencia/TransparencyTable";
import Badge, { type BadgeTone } from "@/components/shared/Badge";
import type { Contrato } from "@/types";
import { formatarMoeda, formatarDataCurta } from "../formatters";

export const metadata: Metadata = {
  title: "Contratos",
  description: "Contratos administrativos firmados pelo município com fornecedores e prestadores.",
};

const SITUACAO_TONE: Record<Contrato["situacao"], BadgeTone> = {
  Vigente: "success",
  Encerrado: "neutral",
  Rescindido: "danger",
  Aditivado: "primary",
};

const columns: TransparencyColumn<Contrato>[] = [
  { key: "numero", header: "Número", accessor: (c) => c.numero, emphasis: true },
  { key: "objeto", header: "Objeto", accessor: (c) => c.objeto },
  { key: "contratado", header: "Contratado", accessor: (c) => c.contratado },
  { key: "cnpjContratado", header: "CNPJ", accessor: (c) => c.cnpjContratado },
  { key: "orgao", header: "Órgão", accessor: (c) => c.orgao },
  {
    key: "valor",
    header: "Valor",
    accessor: (c) => formatarMoeda(c.valor),
    align: "right",
  },
  {
    key: "vigencia",
    header: "Vigência",
    accessor: (c) => `${formatarDataCurta(c.dataInicio)} a ${formatarDataCurta(c.dataFim)}`,
  },
  {
    key: "situacao",
    header: "Situação",
    accessor: (c) => (
      <div className="flex flex-col gap-1">
        <Badge tone={SITUACAO_TONE[c.situacao]}>{c.situacao}</Badge>
        {c.aditivos && c.aditivos.length > 0 ? (
          <span className="text-xs text-neutral-500">
            +{c.aditivos.length} aditivo{c.aditivos.length > 1 ? "s" : ""}
          </span>
        ) : null}
      </div>
    ),
  },
];

export default async function ContratosPage() {
  const contratos = await getContratos();

  return (
    <div className="flex flex-col gap-6">
      <Breadcrumbs
        items={[
          { label: "Início", href: "/" },
          { label: "Transparência", href: "/transparencia" },
          { label: "Contratos" },
        ]}
      />
      <div>
        <h1 className="text-2xl font-semibold text-neutral-900">Contratos</h1>
        <p className="mt-2 max-w-3xl text-sm text-neutral-700 sm:text-base">
          Contratos administrativos vigentes ou encerrados, com objeto, contratado,
          valor e vigência. Consulte também as{" "}
          <a href="/transparencia/licitacoes" className="text-primary-700 underline hover:text-primary-800">
            licitações
          </a>{" "}
          que originaram estes contratos. Dados ilustrativos para fins de demonstração.
        </p>
      </div>
      <TransparencyTable
        columns={columns}
        data={contratos}
        rowKey={(c) => c.id}
        caption="Contratos administrativos do município"
      />
    </div>
  );
}
