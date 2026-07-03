"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Search, ShieldCheck } from "lucide-react";
import Drawer from "@/components/layout/Drawer";
import BrasaoPlaceholder from "@/components/shared/BrasaoPlaceholder";
import { MUNICIPIO } from "@/lib/constants";

type NavItem = {
  label: string;
  href: string;
  destaque?: boolean;
};

const NAV_ITEMS: NavItem[] = [
  { label: "Início", href: "/" },
  { label: "O Município", href: "/municipio" },
  { label: "Governo", href: "/governo" },
  { label: "Serviços ao Cidadão", href: "/servicos" },
  { label: "Notícias", href: "/noticias" },
  { label: "Agenda", href: "/agenda" },
  { label: "Contato", href: "/contato" },
  { label: "Portal da Transparência", href: "/transparencia", destaque: true },
];

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-30 border-b border-neutral-200 bg-neutral-0 shadow-soft">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2 rounded-md py-1 focus-visible:outline-3"
        >
          <BrasaoPlaceholder size={36} className="shrink-0" />
          <span className="text-sm font-semibold leading-tight whitespace-nowrap text-primary-900 sm:text-base">
            Prefeitura de
            <br className="sm:hidden" /> {MUNICIPIO.nome}
          </span>
        </Link>

        <nav
          id="menu-principal"
          aria-label="Menu principal"
          className="hidden min-w-0 xl:block"
        >
          <ul className="flex items-center gap-0.5">
            {NAV_ITEMS.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href} className="shrink-0">
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`flex items-center gap-1.5 whitespace-nowrap rounded-md px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-3 ${
                      item.destaque
                        ? "bg-accent-500 text-primary-950 hover:bg-accent-600"
                        : active
                        ? "bg-primary-50 text-primary-700"
                        : "text-neutral-700 hover:bg-neutral-100 hover:text-primary-700"
                    }`}
                  >
                    {item.destaque && <ShieldCheck className="h-4 w-4 shrink-0" aria-hidden="true" />}
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-1 sm:gap-2">
          <Link
            href="/busca"
            aria-label="Buscar no site"
            className="flex h-11 w-11 items-center justify-center rounded-full text-neutral-700 hover:bg-neutral-100 focus-visible:outline-3"
          >
            <Search className="h-5 w-5" aria-hidden="true" />
          </Link>
          <button
            type="button"
            onClick={() => setIsMenuOpen(true)}
            aria-label="Abrir menu principal"
            aria-haspopup="dialog"
            className="flex h-11 w-11 items-center justify-center rounded-full text-neutral-700 hover:bg-neutral-100 focus-visible:outline-3 xl:hidden"
          >
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
      </div>

      <Drawer
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        title="Menu principal"
      >
        <nav aria-label="Menu principal móvel">
          <ul className="flex flex-col divide-y divide-neutral-100">
            {NAV_ITEMS.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex min-h-[44px] items-center gap-2 px-4 py-3 text-base font-medium ${
                      item.destaque
                        ? "text-accent-700"
                        : active
                        ? "text-primary-700"
                        : "text-neutral-800 hover:bg-neutral-50"
                    }`}
                  >
                    {item.destaque && <ShieldCheck className="h-4 w-4" aria-hidden="true" />}
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </Drawer>
    </header>
  );
}
