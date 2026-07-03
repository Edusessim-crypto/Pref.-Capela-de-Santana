import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";
import { getServicos } from "@/services/servicos.service";
import { getNoticias } from "@/services/noticias.service";

const STATIC_ROUTES = [
  "",
  "/municipio",
  "/governo",
  "/servicos",
  "/noticias",
  "/agenda",
  "/contato",
  "/transparencia",
  "/transparencia/receitas",
  "/transparencia/despesas",
  "/transparencia/pessoal",
  "/transparencia/patrimonio",
  "/transparencia/licitacoes",
  "/transparencia/contratos",
  "/transparencia/obras",
  "/transparencia/parcerias",
  "/transparencia/prestacao-contas",
  "/transparencia/dados-abertos",
  "/transparencia/e-sic",
  "/transparencia/ouvidoria",
  "/transparencia/faq",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [servicos, noticias] = await Promise.all([getServicos(), getNoticias()]);

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
  }));

  const servicoEntries: MetadataRoute.Sitemap = servicos.map((servico) => ({
    url: `${SITE_URL}/servicos/${servico.slug}`,
    lastModified: new Date(),
  }));

  const noticiaEntries: MetadataRoute.Sitemap = noticias.map((noticia) => ({
    url: `${SITE_URL}/noticias/${noticia.slug}`,
    lastModified: noticia.atualizadoEm ?? noticia.publicadoEm,
  }));

  return [...staticEntries, ...servicoEntries, ...noticiaEntries];
}
