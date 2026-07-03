import type { Metadata } from "next";
import Link from "next/link";
import {
  Coins,
  Receipt,
  Users,
  Building2,
  Gavel,
  FileSignature,
  HardHat,
  Handshake,
  BookOpen,
  FileQuestion,
  MessageSquare,
  Database,
  HelpCircle,
  type LucideIcon,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Portal da Transparência",
  description:
    "Portal da Transparência da Prefeitura Municipal de Capela de Santana: receitas, despesas, pessoal, patrimônio, licitações, contratos, obras, parcerias e dados abertos.",
};

type EixoCard = {
  titulo: string;
  descricao: string;
  href: string;
  Icon: LucideIcon;
};

const EIXOS: EixoCard[] = [
  {
    titulo: "Receitas",
    descricao: "Valores previstos e arrecadados por categoria, fonte e órgão.",
    href: "/transparencia/receitas",
    Icon: Coins,
  },
  {
    titulo: "Despesas",
    descricao: "Execução orçamentária: empenho, liquidação e pagamento.",
    href: "/transparencia/despesas",
    Icon: Receipt,
  },
  {
    titulo: "Pessoal",
    descricao: "Quadro de servidores, cargos, vínculos e remuneração.",
    href: "/transparencia/pessoal",
    Icon: Users,
  },
  {
    titulo: "Patrimônio",
    descricao: "Bens móveis e imóveis do município e seu estado de conservação.",
    href: "/transparencia/patrimonio",
    Icon: Building2,
  },
  {
    titulo: "Licitações",
    descricao: "Processos licitatórios, modalidades e situação.",
    href: "/transparencia/licitacoes",
    Icon: Gavel,
  },
  {
    titulo: "Contratos",
    descricao: "Contratos administrativos firmados com fornecedores e prestadores.",
    href: "/transparencia/contratos",
    Icon: FileSignature,
  },
  {
    titulo: "Obras Públicas",
    descricao: "Andamento físico e financeiro das obras em execução no município.",
    href: "/transparencia/obras",
    Icon: HardHat,
  },
  {
    titulo: "Parcerias e Convênios",
    descricao: "Termos de fomento, colaboração e convênios com entidades parceiras.",
    href: "/transparencia/parcerias",
    Icon: Handshake,
  },
  {
    titulo: "Prestação de Contas",
    descricao: "PPA, LDO, LOA, RREO e RGF — planejamento e execução fiscal.",
    href: "/transparencia/prestacao-contas",
    Icon: BookOpen,
  },
  {
    titulo: "Dados Abertos",
    descricao: "Conjuntos de dados públicos em formatos abertos para reuso.",
    href: "/transparencia/dados-abertos",
    Icon: Database,
  },
  {
    titulo: "e-SIC",
    descricao: "Solicitação eletrônica de informações ao amparo da LAI.",
    href: "/transparencia/e-sic",
    Icon: FileQuestion,
  },
  {
    titulo: "Ouvidoria",
    descricao: "Canal para reclamações, sugestões, elogios e denúncias.",
    href: "/transparencia/ouvidoria",
    Icon: MessageSquare,
  },
  {
    titulo: "Perguntas Frequentes",
    descricao: "Dúvidas comuns sobre a Lei de Acesso à Informação.",
    href: "/transparencia/faq",
    Icon: HelpCircle,
  },
];

export default function TransparenciaHomePage() {
  return (
    <div className="flex flex-col gap-8">
      <h1 className="sr-only">Portal da Transparência</h1>
      <div className="max-w-3xl">
        <h2 className="text-lg font-semibold text-neutral-900">
          Compromisso com o acesso à informação
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-neutral-700 sm:text-base">
          A Lei de Acesso à Informação (Lei nº 12.527/2011) assegura a todo cidadão o
          direito de acesso a informações públicas, sem necessidade de justificativa.
          Este portal reúne, de forma organizada, os principais dados da gestão
          municipal — receitas, despesas, pessoal, patrimônio, licitações, contratos,
          obras e parcerias — além dos canais e-SIC e Ouvidoria para solicitações
          diretas. Utilize os cartões abaixo para navegar por cada eixo temático.
        </p>
      </div>

      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {EIXOS.map(({ titulo, descricao, href, Icon }) => (
          <li key={href}>
            <Link
              href={href}
              className="group flex h-full flex-col gap-3 rounded-xl border border-neutral-200 bg-neutral-0 p-5 shadow-soft transition-shadow hover:shadow-soft-lg focus-visible:outline-3"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary-50 text-primary-700 group-hover:bg-primary-100">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="text-base font-semibold text-neutral-900">{titulo}</span>
              <span className="text-sm leading-relaxed text-neutral-600">{descricao}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
