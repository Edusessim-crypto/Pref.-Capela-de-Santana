export interface SolicitacaoESic {
  protocolo: string;
  nomeSolicitante: string;
  email: string;
  cpfCnpj?: string;
  assunto: string;
  descricao: string;
  formaResposta: "E-mail" | "Correspondência" | "Presencial";
  status: "Recebido" | "Em análise" | "Respondido" | "Indeferido";
  dataEnvio: string;
  prazoResposta: string;
}

export interface ManifestacaoOuvidoria {
  protocolo: string;
  tipo: "Reclamação" | "Sugestão" | "Elogio" | "Denúncia" | "Solicitação";
  nomeSolicitante: string;
  email: string;
  telefone?: string;
  identificado: boolean;
  orgaoRelacionado: string;
  descricao: string;
  status: "Recebido" | "Em análise" | "Respondido";
  dataEnvio: string;
}
