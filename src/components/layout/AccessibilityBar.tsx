"use client";

import { useEffect, useState } from "react";
import { AArrowDown, AArrowUp, Accessibility, Contrast } from "lucide-react";

type FontScale = "base" | "lg" | "xl";

const FONT_SCALE_STORAGE_KEY = "capela-santana:font-scale";
const CONTRAST_STORAGE_KEY = "capela-santana:contraste-alto";

const FONT_SCALE_ORDER: FontScale[] = ["base", "lg", "xl"];

export default function AccessibilityBar() {
  const [fontScale, setFontScale] = useState<FontScale>("base");
  const [highContrast, setHighContrast] = useState(false);

  useEffect(() => {
    const storedScale = window.localStorage.getItem(FONT_SCALE_STORAGE_KEY);
    if (storedScale === "base" || storedScale === "lg" || storedScale === "xl") {
      setFontScale(storedScale);
      document.documentElement.setAttribute("data-font-scale", storedScale);
    }

    const storedContrast = window.localStorage.getItem(CONTRAST_STORAGE_KEY);
    if (storedContrast === "true") {
      setHighContrast(true);
      document.documentElement.setAttribute("data-contrast", "high");
    }
  }, []);

  function applyFontScale(next: FontScale) {
    setFontScale(next);
    document.documentElement.setAttribute("data-font-scale", next);
    window.localStorage.setItem(FONT_SCALE_STORAGE_KEY, next);
  }

  function increaseFontScale() {
    const currentIndex = FONT_SCALE_ORDER.indexOf(fontScale);
    const nextIndex = Math.min(currentIndex + 1, FONT_SCALE_ORDER.length - 1);
    applyFontScale(FONT_SCALE_ORDER[nextIndex]);
  }

  function decreaseFontScale() {
    const currentIndex = FONT_SCALE_ORDER.indexOf(fontScale);
    const nextIndex = Math.max(currentIndex - 1, 0);
    applyFontScale(FONT_SCALE_ORDER[nextIndex]);
  }

  function toggleHighContrast() {
    const next = !highContrast;
    setHighContrast(next);
    if (next) {
      document.documentElement.setAttribute("data-contrast", "high");
    } else {
      document.documentElement.removeAttribute("data-contrast");
    }
    window.localStorage.setItem(CONTRAST_STORAGE_KEY, String(next));
  }

  return (
    <div className="w-full bg-primary-950 text-neutral-100">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-end gap-1 px-4 py-1 sm:px-6 lg:px-8">
        <span className="mr-auto hidden text-xs text-neutral-300 sm:inline">
          Recursos de acessibilidade
        </span>
        <button
          type="button"
          onClick={decreaseFontScale}
          disabled={fontScale === "base"}
          aria-label="Diminuir tamanho da fonte"
          className="flex h-9 w-9 items-center justify-center rounded text-neutral-100 hover:bg-primary-800 disabled:opacity-40 focus-visible:outline-3"
        >
          <AArrowDown className="h-4 w-4" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={increaseFontScale}
          disabled={fontScale === "xl"}
          aria-label="Aumentar tamanho da fonte"
          className="flex h-9 w-9 items-center justify-center rounded text-neutral-100 hover:bg-primary-800 disabled:opacity-40 focus-visible:outline-3"
        >
          <AArrowUp className="h-4 w-4" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={toggleHighContrast}
          aria-label="Alternar alto contraste"
          aria-pressed={highContrast}
          className="flex h-9 w-9 items-center justify-center rounded text-neutral-100 hover:bg-primary-800 focus-visible:outline-3"
        >
          <Contrast className="h-4 w-4" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() =>
            window.alert(
              "VLibras está desabilitado neste ambiente de demonstração. Em produção, este botão ativaria o tradutor de Libras oficial do Governo Federal."
            )
          }
          aria-label="Ativar Vídeo Libras (VLibras) — indisponível neste ambiente de demonstração"
          aria-pressed="false"
          className="flex h-9 w-9 items-center justify-center rounded text-neutral-100 hover:bg-primary-800 focus-visible:outline-3"
        >
          <Accessibility className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>

      {/*
        Integração oficial do VLibras (Governo Federal) — desabilitada por padrão neste
        ambiente de demonstração, pois pode carregar script de terceiro bloqueado pelo
        sandbox. Para habilitar em produção, descomentar o bloco abaixo e o import de
        `Script` de "next/script" no topo do arquivo.

        import Script from "next/script";

        <div vw className="enabled">
          <div vw-access-button className="active" />
          <div vw-plugin-wrapper>
            <div className="vw-plugin-top-wrapper" />
          </div>
        </div>

        <Script
          src="https://vlibras.gov.br/app/vlibras-plugin.js"
          strategy="afterInteractive"
          onLoad={() => {
            new window.VLibras.Widget("https://vlibras.gov.br/app");
          }}
        />
      */}
    </div>
  );
}
