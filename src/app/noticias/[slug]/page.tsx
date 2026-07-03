import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import { getNoticiaBySlug, getNoticias } from "@/services/noticias.service";

interface NoticiaDetailPageProps {
  params: Promise<{ slug: string }>;
}

function formatarData(iso: string): string {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(iso));
}

export async function generateStaticParams() {
  const noticias = await getNoticias();
  return noticias.map((noticia) => ({ slug: noticia.slug }));
}

export async function generateMetadata({
  params,
}: NoticiaDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const noticia = await getNoticiaBySlug(slug);

  if (!noticia) {
    return { title: "Notícia não encontrada" };
  }

  return {
    title: noticia.titulo,
    description: noticia.resumo,
  };
}

export default async function NoticiaDetailPage({ params }: NoticiaDetailPageProps) {
  const { slug } = await params;
  const noticia = await getNoticiaBySlug(slug);

  if (!noticia) {
    notFound();
  }

  return (
    <article className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumbs
        items={[
          { label: "Início", href: "/" },
          { label: "Notícias", href: "/noticias" },
          { label: noticia.titulo },
        ]}
      />

      <span className="mt-4 inline-flex w-fit items-center rounded-full bg-primary-50 px-2.5 py-1 text-xs font-medium text-primary-700">
        {noticia.categoria}
      </span>

      <h1 className="mt-3 font-serif text-3xl font-bold leading-tight text-neutral-900 sm:text-4xl">
        {noticia.titulo}
      </h1>

      <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-neutral-500">
        <span>Por {noticia.autor}</span>
        <span aria-hidden="true">&middot;</span>
        <time dateTime={noticia.publicadoEm}>Publicado em {formatarData(noticia.publicadoEm)}</time>
        {noticia.atualizadoEm && (
          <>
            <span aria-hidden="true">&middot;</span>
            <time dateTime={noticia.atualizadoEm}>
              Atualizado em {formatarData(noticia.atualizadoEm)}
            </time>
          </>
        )}
      </div>

      <div className="relative mt-6 aspect-[16/9] w-full overflow-hidden rounded-xl bg-neutral-100">
        <Image
          src={noticia.imagemCapa}
          alt={noticia.imagemAlt}
          fill
          sizes="(min-width: 768px) 768px, 100vw"
          className="object-cover"
          priority
        />
      </div>

      {/*
        conteudoHtml é conteúdo estático de dados mock mantidos localmente pelo
        próprio projeto (não é entrada de usuário), por isso a renderização
        direta abaixo é segura neste contexto de demonstração.
      */}
      <div
        className="mt-8 text-neutral-800 [&_h2]:mt-6 [&_h2]:font-serif [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-neutral-900 [&_li]:ml-5 [&_li]:list-disc [&_p]:mb-4 [&_p]:leading-relaxed"
        dangerouslySetInnerHTML={{ __html: noticia.conteudoHtml }}
      />
    </article>
  );
}
