import { ChevronLeft, ChevronRight } from "lucide-react";

export interface PaginationProps {
  paginaAtual: number;
  totalPaginas: number;
  onChange: (pagina: number) => void;
}

export default function Pagination({ paginaAtual, totalPaginas, onChange }: PaginationProps) {
  const isPrimeira = paginaAtual <= 1;
  const isUltima = paginaAtual >= totalPaginas;

  return (
    <nav aria-label="Paginação" className="flex items-center justify-center gap-3">
      <button
        type="button"
        aria-label="Página anterior"
        aria-disabled={isPrimeira}
        disabled={isPrimeira}
        onClick={() => onChange(paginaAtual - 1)}
        className="flex h-11 w-11 items-center justify-center rounded-lg border border-neutral-300 text-neutral-700 transition-colors hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent"
      >
        <ChevronLeft className="h-5 w-5" aria-hidden="true" />
      </button>

      <span className="text-sm font-medium text-neutral-700" aria-live="polite">
        Página {paginaAtual} de {totalPaginas}
      </span>

      <button
        type="button"
        aria-label="Próxima página"
        aria-disabled={isUltima}
        disabled={isUltima}
        onClick={() => onChange(paginaAtual + 1)}
        className="flex h-11 w-11 items-center justify-center rounded-lg border border-neutral-300 text-neutral-700 transition-colors hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent"
      >
        <ChevronRight className="h-5 w-5" aria-hidden="true" />
      </button>
    </nav>
  );
}
