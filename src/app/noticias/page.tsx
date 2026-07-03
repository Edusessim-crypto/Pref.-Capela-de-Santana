import type { Metadata } from "next";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import { getNoticias } from "@/services/noticias.service";
import NoticiasListClient from "./NoticiasListClient";

export const metadata: Metadata = {
  title: "Notícias",
  description:
    "Acompanhe as últimas notícias e ações da Prefeitura Municipal de Capela de Santana.",
};

export default async function NoticiasPage() {
  const noticias = await getNoticias();

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: "Início", href: "/" }, { label: "Notícias" }]} />

      <h1 className="mt-4 font-serif text-3xl font-bold text-neutral-900 sm:text-4xl">
        Notícias
      </h1>
      <p className="mt-3 max-w-2xl text-neutral-600">
        Fique por dentro das ações, campanhas e novidades da administração
        municipal.
      </p>

      <div className="mt-8">
        <NoticiasListClient noticias={noticias} />
      </div>
    </div>
  );
}
