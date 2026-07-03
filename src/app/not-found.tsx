import type { Metadata } from "next";
import Link from "next/link";
import { Home, Search } from "lucide-react";

export const metadata: Metadata = {
  title: "Página não encontrada",
};

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center gap-6 px-4 py-24 text-center sm:px-6 lg:px-8">
      <p className="text-sm font-semibold uppercase tracking-wide text-primary-600">
        Erro 404
      </p>
      <h1 className="font-serif text-3xl font-bold text-neutral-900 sm:text-4xl">
        Página não encontrada
      </h1>
      <p className="text-neutral-700">
        O endereço acessado não existe ou foi movido. Verifique o link ou utilize os
        atalhos abaixo para continuar navegando.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className="flex h-11 items-center gap-2 rounded-lg bg-primary-600 px-5 text-sm font-medium text-white transition-colors hover:bg-primary-700"
        >
          <Home className="h-4 w-4" aria-hidden="true" />
          Página inicial
        </Link>
        <Link
          href="/servicos"
          className="flex h-11 items-center gap-2 rounded-lg border border-neutral-300 px-5 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-100"
        >
          <Search className="h-4 w-4" aria-hidden="true" />
          Ver serviços ao cidadão
        </Link>
      </div>
    </div>
  );
}
