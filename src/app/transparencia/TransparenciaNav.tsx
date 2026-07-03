"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type NavItem = {
  label: string;
  href: string;
};

const NAV_ITEMS: NavItem[] = [
  { label: "Início", href: "/transparencia" },
  { label: "Receitas", href: "/transparencia/receitas" },
  { label: "Despesas", href: "/transparencia/despesas" },
  { label: "Pessoal", href: "/transparencia/pessoal" },
  { label: "Patrimônio", href: "/transparencia/patrimonio" },
  { label: "Licitações", href: "/transparencia/licitacoes" },
  { label: "Contratos", href: "/transparencia/contratos" },
  { label: "Obras Públicas", href: "/transparencia/obras" },
  { label: "Parcerias", href: "/transparencia/parcerias" },
  { label: "Prestação de Contas", href: "/transparencia/prestacao-contas" },
  { label: "Dados Abertos", href: "/transparencia/dados-abertos" },
  { label: "e-SIC", href: "/transparencia/e-sic" },
  { label: "Ouvidoria", href: "/transparencia/ouvidoria" },
  { label: "FAQ", href: "/transparencia/faq" },
];

function isActive(pathname: string, href: string) {
  if (href === "/transparencia") return pathname === "/transparencia";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function TransparenciaNav() {
  const pathname = usePathname();

  return (
    <nav aria-label="Seções do Portal da Transparência" className="border-b border-neutral-200 bg-neutral-0">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ul className="flex flex-nowrap items-center gap-1 overflow-x-auto py-2 [-ms-overflow-style:none] [scrollbar-width:thin]">
          {NAV_ITEMS.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <li key={item.href} className="shrink-0">
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`flex min-h-[44px] items-center whitespace-nowrap rounded-md px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-3 ${
                    active
                      ? "bg-primary-50 text-primary-700"
                      : "text-neutral-700 hover:bg-neutral-100 hover:text-primary-700"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
