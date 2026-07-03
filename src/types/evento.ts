export interface Evento {
  id: string;
  titulo: string;
  descricao: string;
  local: string;
  dataInicio: string;
  dataFim?: string;
  horario: string;
  categoria: string;
  imagem?: string;
  gratuito: boolean;
}
