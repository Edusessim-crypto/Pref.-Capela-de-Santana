export interface Servico {
  id: string;
  slug: string;
  titulo: string;
  descricao: string;
  categoria: string;
  icone: string;
  orgaoResponsavel: string;
  requisitos: string[];
  comoSolicitar: string;
  linkExterno?: string;
  documentosNecessarios?: string[];
  prazoAtendimento?: string;
}
