import Link from "next/link";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { MUNICIPIO, IS_DEMO_ENV } from "@/lib/constants";

const LINKS_INSTITUCIONAL = [
  { label: "O Município", href: "/municipio" },
  { label: "Governo e Secretarias", href: "/governo" },
  { label: "Serviços ao Cidadão", href: "/servicos" },
  { label: "Notícias", href: "/noticias" },
  { label: "Agenda de Eventos", href: "/agenda" },
  { label: "Contato", href: "/contato" },
];

const LINKS_TRANSPARENCIA = [
  { label: "Portal da Transparência", href: "/transparencia" },
  { label: "Receitas e Despesas", href: "/transparencia/receitas-despesas" },
  { label: "Licitações e Contratos", href: "/transparencia/licitacoes" },
  { label: "Servidores e Salários", href: "/transparencia/servidores" },
  { label: "Lei de Acesso à Informação", href: "/transparencia/lai" },
];

const currentYear = new Date().getFullYear();

export default function Footer() {
  return (
    <footer id="rodape" className="border-t border-neutral-200 bg-primary-950 text-neutral-100">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h2 className="text-base font-semibold text-neutral-0">
              {MUNICIPIO.nomeCompleto}
            </h2>
            <ul className="mt-4 space-y-3 text-sm text-neutral-300">
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                <span>
                  {MUNICIPIO.endereco.logradouro}, {MUNICIPIO.endereco.bairro}
                  <br />
                  {MUNICIPIO.endereco.cidade} - {MUNICIPIO.endereco.uf}, CEP{" "}
                  {MUNICIPIO.endereco.cep}
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0" aria-hidden="true" />
                <a href={`tel:${MUNICIPIO.telefone.replace(/\D/g, "")}`} className="hover:underline">
                  {MUNICIPIO.telefone}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
                <a href={`mailto:${MUNICIPIO.email}`} className="hover:underline">
                  {MUNICIPIO.email}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                <span>{MUNICIPIO.horarioAtendimento}</span>
              </li>
            </ul>
          </div>

          <nav aria-label="Links institucionais">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-neutral-0">
              Institucional
            </h2>
            <ul className="mt-4 space-y-2 text-sm text-neutral-300">
              {LINKS_INSTITUCIONAL.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-neutral-0 hover:underline">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Links de transparência">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-neutral-0">
              Transparência
            </h2>
            <ul className="mt-4 space-y-2 text-sm text-neutral-300">
              {LINKS_TRANSPARENCIA.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-neutral-0 hover:underline">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-neutral-0">
              Acessibilidade
            </h2>
            <p className="mt-4 text-sm text-neutral-300">
              Este site segue as diretrizes do eMAG e as normas de acessibilidade
              WCAG 2.1 nível AA, com recursos de alto contraste, ajuste de fonte e
              navegação por teclado.
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-primary-800 pt-6 text-sm text-neutral-400 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {currentYear} Prefeitura Municipal de Capela de Santana. Todos os
            direitos reservados.
          </p>
          {IS_DEMO_ENV && (
            <p className="rounded-full bg-primary-900 px-3 py-1 text-xs text-neutral-300">
              Ambiente de demonstração — dados ilustrativos
            </p>
          )}
        </div>
      </div>
    </footer>
  );
}
