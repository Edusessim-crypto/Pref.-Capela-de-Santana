export interface Secretaria {
  id: string;
  nome: string;
  sigla: string;
  responsavel: string;
  cargoResponsavel: string;
  telefone: string;
  email: string;
  descricao: string;
  competencias: string[];
  endereco?: string;
  horarioAtendimento?: string;
}
