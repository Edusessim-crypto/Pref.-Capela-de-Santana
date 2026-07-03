import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CloudSun, LandPlot, ScrollText, Sparkles } from "lucide-react";
import ServiceCard from "@/components/shared/ServiceCard";
import NewsCard from "@/components/shared/NewsCard";
import BrasaoPlaceholder from "@/components/shared/BrasaoPlaceholder";
import { getServicos } from "@/services/servicos.service";
import { getNoticias } from "@/services/noticias.service";

export const metadata: Metadata = {
  description:
    "Portal institucional da Prefeitura Municipal de Capela de Santana - RS: serviços ao cidadão, notícias, agenda de eventos e Portal da Transparência.",
};

export default async function Home() {
  const [servicos, noticias] = await Promise.all([getServicos(), getNoticias()]);
  const servicosDestaque = servicos.slice(0, 8);
  const noticiasDestaque = noticias.slice(0, 3);

  return (
    <div className="flex flex-col">
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-800 via-primary-700 to-primary-950 text-neutral-0">
        <Image
          src="/images/institucional/hero-municipio.svg"
          alt=""
          aria-hidden="true"
          fill
          priority
          className="object-cover opacity-60"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-primary-950/80 via-primary-900/40 to-transparent"
        />
        <div className="relative mx-auto flex max-w-7xl flex-col gap-10 px-4 py-14 sm:px-6 sm:py-20 lg:flex-row lg:items-center lg:px-8 lg:py-24">
          <div className="flex flex-1 flex-col gap-6">
            <BrasaoPlaceholder size={56} className="drop-shadow" />
            <h1 className="font-serif text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
              Prefeitura Municipal de Capela de Santana
            </h1>
            <p className="max-w-xl text-base text-primary-50 sm:text-lg">
              Serviços públicos, informações institucionais e transparência ao alcance
              de todos os cidadãos, com atendimento humano e digital.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/servicos"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-accent-500 px-6 text-sm font-semibold text-primary-950 transition-colors hover:bg-accent-400"
              >
                Ver serviços ao cidadão
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href="/transparencia"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-neutral-0/40 px-6 text-sm font-semibold text-neutral-0 transition-colors hover:bg-neutral-0/10"
              >
                Portal da Transparência
              </Link>
            </div>
          </div>

          <div className="flex-1">
            <div className="rounded-2xl border border-neutral-0/20 bg-neutral-0/10 p-6 backdrop-blur-sm sm:p-8">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-500 px-3 py-1 text-xs font-semibold text-primary-950">
                <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                Campanha ilustrativa
              </span>
              <h2 className="mt-4 font-serif text-2xl font-semibold">
                Feira do Produtor Rural — Edição de Inverno
              </h2>
              <p className="mt-2 text-sm text-primary-50">
                Produtos coloniais, hortaliças e artesanato local na Praça Central.
                Confira a agenda completa de eventos do município.
              </p>
              <Link
                href="/agenda"
                className="mt-5 inline-flex h-11 items-center gap-2 text-sm font-semibold text-accent-300 hover:text-accent-200 hover:underline"
              >
                Ver agenda de eventos
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="servicos-heading" className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 id="servicos-heading" className="font-serif text-2xl font-bold text-neutral-900 sm:text-3xl">
              Serviços para o cidadão
            </h2>
            <p className="mt-2 max-w-2xl text-neutral-600">
              Solicite, consulte e acompanhe os principais serviços públicos oferecidos
              pela Prefeitura.
            </p>
          </div>
          <Link
            href="/servicos"
            className="inline-flex h-11 w-fit items-center gap-1.5 text-sm font-semibold text-primary-700 hover:text-primary-800 hover:underline"
          >
            Ver todos os serviços
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {servicosDestaque.map((servico) => (
            <ServiceCard key={servico.id} servico={servico} />
          ))}
        </div>
      </section>

      <section aria-labelledby="noticias-heading" className="bg-neutral-100">
        <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 id="noticias-heading" className="font-serif text-2xl font-bold text-neutral-900 sm:text-3xl">
                Últimas notícias
              </h2>
              <p className="mt-2 max-w-2xl text-neutral-600">
                Fique por dentro das ações e novidades da administração municipal.
              </p>
            </div>
            <Link
              href="/noticias"
              className="inline-flex h-11 w-fit items-center gap-1.5 text-sm font-semibold text-primary-700 hover:text-primary-800 hover:underline"
            >
              Ver todas as notícias
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {noticiasDestaque.map((noticia) => (
              <NewsCard key={noticia.id} noticia={noticia} />
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="mais-cidade-heading" className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <h2 id="mais-cidade-heading" className="font-serif text-2xl font-bold text-neutral-900 sm:text-3xl">
          Mais cidade
        </h2>

        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-3">
          <Link
            href="/transparencia"
            className="group flex flex-col gap-3 rounded-xl border border-neutral-200 bg-neutral-0 p-6 shadow-soft transition-shadow hover:shadow-soft-lg"
          >
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-primary-50 text-primary-600">
              <ScrollText className="h-6 w-6" aria-hidden="true" />
            </span>
            <h3 className="font-semibold text-neutral-900">Portal da Transparência</h3>
            <p className="text-sm text-neutral-600">
              Receitas, despesas, licitações, contratos e dados abertos do município.
            </p>
          </Link>

          <Link
            href="/agenda"
            className="group flex flex-col gap-3 rounded-xl border border-neutral-200 bg-neutral-0 p-6 shadow-soft transition-shadow hover:shadow-soft-lg"
          >
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-primary-50 text-primary-600">
              <LandPlot className="h-6 w-6" aria-hidden="true" />
            </span>
            <h3 className="font-semibold text-neutral-900">Agenda de Eventos</h3>
            <p className="text-sm text-neutral-600">
              Feiras, audiências públicas, campanhas de saúde e eventos culturais.
            </p>
          </Link>

          <div className="flex flex-col gap-3 rounded-xl border border-neutral-200 bg-neutral-0 p-6 shadow-soft">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-primary-50 text-primary-600">
              <CloudSun className="h-6 w-6" aria-hidden="true" />
            </span>
            <h3 className="font-semibold text-neutral-900">Tempo em Capela de Santana</h3>
            <p className="text-sm text-neutral-600">
              Parcialmente nublado, 22°C (dado ilustrativo de demonstração).
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
