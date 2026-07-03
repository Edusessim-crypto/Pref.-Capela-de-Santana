export interface Receita {
  id: string;
  ano: number;
  mes: number;
  categoria: string;
  fonte: string;
  orgao: string;
  valorPrevisto: number;
  valorArrecadado: number;
}

export type EstagioDespesa = "empenhado" | "liquidado" | "pago";

export interface Despesa {
  id: string;
  ano: number;
  mes: number;
  orgao: string;
  funcao: string;
  subfuncao: string;
  credor: string;
  numeroEmpenho: string;
  estagio: EstagioDespesa;
  valorEmpenhado: number;
  valorLiquidado: number;
  valorPago: number;
  dataEmpenho: string;
}

export interface Servidor {
  id: string;
  nome: string;
  cargo: string;
  lotacao: string;
  vinculo: "Efetivo" | "Comissionado" | "Contratado" | "Eletivo";
  admissao: string;
  remuneracaoBase: number;
  gratificacoes: number;
  remuneracaoTotal: number;
  mesReferencia: string;
}

export interface BemPatrimonial {
  id: string;
  descricao: string;
  categoria: string;
  numeroTombamento: string;
  localizacao: string;
  valorAquisicao: number;
  dataAquisicao: string;
  estadoConservacao: "Novo" | "Bom" | "Regular" | "Ruim";
}

export type ModalidadeLicitacao =
  | "Pregão Eletrônico"
  | "Concorrência"
  | "Tomada de Preços"
  | "Dispensa"
  | "Inexigibilidade"
  | "Convite";

export type SituacaoLicitacao = "Publicado" | "Em andamento" | "Homologado" | "Revogado" | "Deserto";

export interface Licitacao {
  id: string;
  numero: string;
  ano: number;
  modalidade: ModalidadeLicitacao;
  objeto: string;
  orgao: string;
  situacao: SituacaoLicitacao;
  valorEstimado: number;
  dataAbertura: string;
  dataPublicacao: string;
  editalUrl?: string;
}

export interface Contrato {
  id: string;
  numero: string;
  licitacaoId?: string;
  objeto: string;
  contratado: string;
  cnpjContratado: string;
  orgao: string;
  valor: number;
  dataInicio: string;
  dataFim: string;
  situacao: "Vigente" | "Encerrado" | "Rescindido" | "Aditivado";
  aditivos?: {
    numero: string;
    descricao: string;
    valor: number;
    data: string;
  }[];
}

export type StatusObra = "Planejada" | "Em execução" | "Paralisada" | "Concluída";

export interface Obra {
  id: string;
  nome: string;
  descricao: string;
  categoria: string;
  bairro: string;
  endereco: string;
  latitude: number;
  longitude: number;
  status: StatusObra;
  percentualExecucao: number;
  valorContratado: number;
  valorPago: number;
  empresaResponsavel: string;
  dataInicio: string;
  previsaoTermino: string;
}

export interface Parceria {
  id: string;
  numero: string;
  tipo: "Convênio" | "Termo de Fomento" | "Termo de Colaboração" | "Termo de Parceria";
  objeto: string;
  parceiro: string;
  orgaoRepassador?: string;
  valor: number;
  dataInicio: string;
  dataFim: string;
  situacao: "Vigente" | "Encerrado" | "Prestação de contas pendente";
}

export type TipoDocumentoOrcamentario = "PPA" | "LDO" | "LOA" | "RREO" | "RGF";

export interface DocumentoOrcamentario {
  id: string;
  tipo: TipoDocumentoOrcamentario;
  titulo: string;
  ano: number;
  periodo?: string;
  descricao: string;
  arquivoUrl: string;
  publicadoEm: string;
}

export interface ConjuntoDadosAbertos {
  id: string;
  titulo: string;
  descricao: string;
  categoria: string;
  formato: "CSV" | "JSON" | "XLSX";
  ultimaAtualizacao: string;
  tamanhoAproximado: string;
  arquivoUrl: string;
  licenca: string;
}

export interface FaqItem {
  id: string;
  pergunta: string;
  resposta: string;
  categoria: string;
}
