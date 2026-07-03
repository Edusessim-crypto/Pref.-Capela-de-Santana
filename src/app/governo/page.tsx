import type { Metadata } from "next";
import { Mail, Phone } from "lucide-react";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import { getSecretarias } from "@/services/secretarias.service";
import type { Secretaria } from "@/types";

export const metadata: Metadata = {
  title: "Governo e Secretarias",
  description:
    "Conheça as secretarias municipais de Capela de Santana, seus responsáveis e competências.",
};

function SecretariaCard({ secretaria }: { secretaria: Secretaria }) {
  return (
    <article className="flex flex-col gap-4 rounded-xl border border-neutral-200 bg-neutral-0 p-6 shadow-soft">
      <header>
        <div className="flex flex-wrap items-center gap-2">
          <h2 className="font-semibold text-neutral-900">{secretaria.nome}</h2>
          <span className="inline-flex items-center rounded-full bg-primary-50 px-2.5 py-1 text-xs font-medium text-primary-700">
            {secretaria.sigla}
          </span>
        </div>
        <p className="mt-1 text-sm text-neutral-600">
          {secretaria.responsavel} — {secretaria.cargoResponsavel}
        </p>
      </header>

      <p className="text-sm text-neutral-700 line-clamp-3">{secretaria.descricao}</p>

      {secretaria.competencias.length > 0 && (
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
            Competências
          </h3>
          <ul className="mt-2 flex flex-wrap gap-2">
            {secretaria.competencias.slice(0, 4).map((competencia) => (
              <li
                key={competencia}
                className="rounded-full bg-neutral-100 px-2.5 py-1 text-xs text-neutral-700"
              >
                {competencia}
              </li>
            ))}
          </ul>
        </div>
      )}

      <dl className="mt-auto flex flex-col gap-2 border-t border-neutral-100 pt-4 text-sm text-neutral-600">
        <div className="flex items-center gap-2">
          <Phone className="h-4 w-4 shrink-0 text-primary-600" aria-hidden="true" />
          <dt className="sr-only">Telefone</dt>
          <dd>
            <a href={`tel:${secretaria.telefone.replace(/\D/g, "")}`} className="hover:underline">
              {secretaria.telefone}
            </a>
          </dd>
        </div>
        <div className="flex items-center gap-2">
          <Mail className="h-4 w-4 shrink-0 text-primary-600" aria-hidden="true" />
          <dt className="sr-only">E-mail</dt>
          <dd>
            <a href={`mailto:${secretaria.email}`} className="break-all hover:underline">
              {secretaria.email}
            </a>
          </dd>
        </div>
      </dl>
    </article>
  );
}

export default async function GovernoPage() {
  const secretarias = await getSecretarias();

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: "Início", href: "/" }, { label: "Governo" }]} />

      <h1 className="mt-4 font-serif text-3xl font-bold text-neutral-900 sm:text-4xl">
        Governo e Secretarias
      </h1>
      <p className="mt-3 max-w-2xl text-neutral-600">
        Conheça as secretarias municipais responsáveis pelas políticas públicas de
        Capela de Santana e seus respectivos canais de contato.
      </p>

      <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {secretarias.map((secretaria) => (
          <SecretariaCard key={secretaria.id} secretaria={secretaria} />
        ))}
      </div>
    </div>
  );
}
