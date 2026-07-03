import type { Metadata } from "next";
import { CalendarDays, Clock, MapPin } from "lucide-react";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import Badge from "@/components/shared/Badge";
import { getEventos } from "@/services/eventos.service";

export const metadata: Metadata = {
  title: "Agenda de Eventos",
  description:
    "Confira a agenda de eventos, audiências públicas e atividades culturais de Capela de Santana.",
};

function formatarData(iso: string): string {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(iso));
}

export default async function AgendaPage() {
  const eventos = await getEventos();

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: "Início", href: "/" }, { label: "Agenda de Eventos" }]} />

      <h1 className="mt-4 font-serif text-3xl font-bold text-neutral-900 sm:text-4xl">
        Agenda de Eventos
      </h1>
      <p className="mt-3 max-w-2xl text-neutral-600">
        Feiras, audiências públicas, campanhas de saúde e atividades culturais do
        município.
      </p>

      {eventos.length === 0 ? (
        <p className="mt-10 text-neutral-600">Nenhum evento cadastrado no momento.</p>
      ) : (
        <ol className="mt-10 space-y-6">
          {eventos.map((evento) => {
            const mesmoDiaFinal =
              evento.dataFim &&
              new Date(evento.dataFim).toDateString() === new Date(evento.dataInicio).toDateString();

            return (
              <li
                key={evento.id}
                className="rounded-xl border border-neutral-200 bg-neutral-0 p-6 shadow-soft"
              >
                <article>
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge tone="primary">{evento.categoria}</Badge>
                    {evento.gratuito && <Badge tone="success">Gratuito</Badge>}
                  </div>

                  <h2 className="mt-3 font-serif text-xl font-semibold text-neutral-900">
                    {evento.titulo}
                  </h2>
                  <p className="mt-2 text-neutral-700">{evento.descricao}</p>

                  <dl className="mt-4 flex flex-col gap-2 text-sm text-neutral-600">
                    <div className="flex items-center gap-2">
                      <CalendarDays className="h-4 w-4 shrink-0 text-primary-600" aria-hidden="true" />
                      <dt className="sr-only">Data</dt>
                      <dd>
                        <time dateTime={evento.dataInicio}>{formatarData(evento.dataInicio)}</time>
                        {evento.dataFim && !mesmoDiaFinal && (
                          <>
                            {" "}
                            até <time dateTime={evento.dataFim}>{formatarData(evento.dataFim)}</time>
                          </>
                        )}
                      </dd>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 shrink-0 text-primary-600" aria-hidden="true" />
                      <dt className="sr-only">Horário</dt>
                      <dd>{evento.horario}</dd>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 shrink-0 text-primary-600" aria-hidden="true" />
                      <dt className="sr-only">Local</dt>
                      <dd>{evento.local}</dd>
                    </div>
                  </dl>
                </article>
              </li>
            );
          })}
        </ol>
      )}
    </div>
  );
}
