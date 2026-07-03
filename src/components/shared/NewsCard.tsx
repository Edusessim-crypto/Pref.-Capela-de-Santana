import Link from "next/link";
import Image from "next/image";
import type { Noticia } from "@/types";

function formatarData(iso: string): string {
  const data = new Date(iso);
  return new Intl.DateTimeFormat("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(data);
}

export interface NewsCardProps {
  noticia: Noticia;
}

export default function NewsCard({ noticia }: NewsCardProps) {
  return (
    <Link
      href={`/noticias/${noticia.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-neutral-200 bg-neutral-0 shadow-soft transition-shadow hover:shadow-soft-lg focus-visible:shadow-soft-lg"
    >
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-neutral-100">
        <Image
          src={noticia.imagemCapa}
          alt={noticia.imagemAlt}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col gap-2 p-5">
        <span className="inline-flex w-fit items-center rounded-full bg-primary-50 px-2.5 py-1 text-xs font-medium text-primary-700">
          {noticia.categoria}
        </span>

        <h3 className="font-serif text-lg font-semibold leading-snug text-neutral-900">
          {noticia.titulo}
        </h3>

        <p className="line-clamp-3 text-sm text-neutral-600">{noticia.resumo}</p>

        <time dateTime={noticia.publicadoEm} className="mt-auto pt-2 text-xs text-neutral-500">
          {formatarData(noticia.publicadoEm)}
        </time>
      </div>
    </Link>
  );
}
