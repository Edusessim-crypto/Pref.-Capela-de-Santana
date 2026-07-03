const formatadorMoeda = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

const formatadorDataCurta = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
});

const formatadorDataLonga = new Intl.DateTimeFormat("pt-BR", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

export function formatarMoeda(valor: number): string {
  return formatadorMoeda.format(valor);
}

export function formatarDataCurta(iso: string): string {
  return formatadorDataCurta.format(new Date(iso));
}

export function formatarDataLonga(iso: string): string {
  return formatadorDataLonga.format(new Date(iso));
}

export function formatarPercentual(numerador: number, denominador: number): string {
  if (denominador === 0) return "—";
  return `${((numerador / denominador) * 100).toFixed(1)}%`;
}
