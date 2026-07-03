"use client";

import { MessageCircle } from "lucide-react";
import { WHATSAPP_NUMERO, WHATSAPP_MENSAGEM_PADRAO } from "@/lib/constants";

export default function WhatsAppButton() {
  const href = `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(
    WHATSAPP_MENSAGEM_PADRAO
  )}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-success-500 text-white shadow-soft-lg transition-transform hover:scale-105 hover:bg-success-700 focus-visible:outline-3 focus-visible:outline-offset-2"
    >
      <MessageCircle className="h-7 w-7" aria-hidden="true" />
    </a>
  );
}
