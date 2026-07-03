import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ExternalLink } from "lucide-react";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import { getServicoBySlug, getServicos } from "@/services/servicos.service";

interface ServicoDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const servicos = await getServicos();
  return servicos.map((servico) => ({ slug: servico.slug }));
}

export async function generateMetadata({
  params,
}: ServicoDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const servico = await getServicoBySlug(slug);

  if (!servico) {
    return { title: "Serviço não encontrado" };
  }

  return {
    title: servico.titulo,
    description: servico.descricao,
  };
}

export default async function ServicoDetailPage({ params }: ServicoDetailPageProps) {
  const { slug } = await params;
  const servico = await getServicoBySlug(slug);

  if (!servico) {
    notFound();
  }

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumbs
        items={[
          { label: "Início", href: "/" },
          { label: "Serviços ao Cidadão", href: "/servicos" },
          { label: servico.titulo },
        ]}
      />

      <span className="mt-4 inline-flex w-fit items-center rounded-full bg-accent-50 px-2.5 py-1 text-xs font-medium text-accent-700">
        {servico.categoria}
      </span>

      <h1 className="mt-3 font-serif text-3xl font-bold text-neutral-900 sm:text-4xl">
        {servico.titulo}
      </h1>

      <p className="mt-4 text-lg text-neutral-700">{servico.descricao}</p>

      <dl className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-neutral-200 bg-neutral-0 p-4">
          <dt className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
            Órgão responsável
          </dt>
          <dd className="mt-1 text-sm font-medium text-neutral-900">
            {servico.orgaoResponsavel}
          </dd>
        </div>
        {servico.prazoAtendimento && (
          <div className="rounded-xl border border-neutral-200 bg-neutral-0 p-4">
            <dt className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
              Prazo de atendimento
            </dt>
            <dd className="mt-1 text-sm font-medium text-neutral-900">
              {servico.prazoAtendimento}
            </dd>
          </div>
        )}
      </dl>

      <section aria-labelledby="requisitos-heading" className="mt-8">
        <h2 id="requisitos-heading" className="font-serif text-xl font-semibold text-neutral-900">
          Requisitos
        </h2>
        <ul className="mt-3 list-inside list-disc space-y-1.5 text-neutral-700">
          {servico.requisitos.map((requisito) => (
            <li key={requisito}>{requisito}</li>
          ))}
        </ul>
      </section>

      {servico.documentosNecessarios && servico.documentosNecessarios.length > 0 && (
        <section aria-labelledby="documentos-heading" className="mt-8">
          <h2 id="documentos-heading" className="font-serif text-xl font-semibold text-neutral-900">
            Documentos necessários
          </h2>
          <ul className="mt-3 list-inside list-disc space-y-1.5 text-neutral-700">
            {servico.documentosNecessarios.map((documento) => (
              <li key={documento}>{documento}</li>
            ))}
          </ul>
        </section>
      )}

      <section aria-labelledby="como-solicitar-heading" className="mt-8">
        <h2 id="como-solicitar-heading" className="font-serif text-xl font-semibold text-neutral-900">
          Como solicitar
        </h2>
        <p className="mt-3 leading-relaxed text-neutral-700">{servico.comoSolicitar}</p>
      </section>

      {servico.linkExterno && (
        <div className="mt-8">
          <a
            href={servico.linkExterno}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 items-center gap-2 rounded-lg bg-primary-600 px-6 text-sm font-semibold text-neutral-0 transition-colors hover:bg-primary-700"
          >
            Acessar serviço on-line
            <ExternalLink className="h-4 w-4" aria-hidden="true" />
            <span className="sr-only">(abre em nova aba)</span>
          </a>
        </div>
      )}
    </div>
  );
}
