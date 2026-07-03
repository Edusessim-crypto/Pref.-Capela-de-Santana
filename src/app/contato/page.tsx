import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import { MUNICIPIO } from "@/lib/constants";
import ContatoForm from "./ContatoForm";

export const metadata: Metadata = {
  title: "Contato",
  description:
    "Fale com a Prefeitura Municipal de Capela de Santana: endereço, telefone, e-mail e formulário de contato.",
};

export default function ContatoPage() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: "Início", href: "/" }, { label: "Contato" }]} />

      <h1 className="mt-4 font-serif text-3xl font-bold text-neutral-900 sm:text-4xl">
        Contato
      </h1>
      <p className="mt-3 max-w-2xl text-neutral-600">
        Entre em contato com a Prefeitura Municipal de Capela de Santana pelos
        canais abaixo ou envie uma mensagem pelo formulário.
      </p>

      <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-2">
        <section aria-labelledby="informacoes-heading">
          <h2 id="informacoes-heading" className="font-serif text-xl font-semibold text-neutral-900">
            Informações institucionais
          </h2>

          <dl className="mt-5 flex flex-col gap-4 rounded-xl border border-neutral-200 bg-neutral-0 p-6 shadow-soft">
            <div className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary-600" aria-hidden="true" />
              <div>
                <dt className="text-sm font-medium text-neutral-500">Endereço</dt>
                <dd className="text-neutral-900">
                  {MUNICIPIO.endereco.logradouro}, {MUNICIPIO.endereco.bairro}
                  <br />
                  {MUNICIPIO.endereco.cidade} - {MUNICIPIO.endereco.uf}, CEP{" "}
                  {MUNICIPIO.endereco.cep}
                </dd>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="mt-0.5 h-5 w-5 shrink-0 text-primary-600" aria-hidden="true" />
              <div>
                <dt className="text-sm font-medium text-neutral-500">Telefone</dt>
                <dd>
                  <a
                    href={`tel:${MUNICIPIO.telefone.replace(/\D/g, "")}`}
                    className="text-neutral-900 hover:underline"
                  >
                    {MUNICIPIO.telefone}
                  </a>
                </dd>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Mail className="mt-0.5 h-5 w-5 shrink-0 text-primary-600" aria-hidden="true" />
              <div>
                <dt className="text-sm font-medium text-neutral-500">E-mail</dt>
                <dd>
                  <a href={`mailto:${MUNICIPIO.email}`} className="break-all text-neutral-900 hover:underline">
                    {MUNICIPIO.email}
                  </a>
                </dd>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="mt-0.5 h-5 w-5 shrink-0 text-primary-600" aria-hidden="true" />
              <div>
                <dt className="text-sm font-medium text-neutral-500">Horário de atendimento</dt>
                <dd className="text-neutral-900">{MUNICIPIO.horarioAtendimento}</dd>
              </div>
            </div>
          </dl>
        </section>

        <section aria-labelledby="formulario-heading">
          <h2 id="formulario-heading" className="font-serif text-xl font-semibold text-neutral-900">
            Envie uma mensagem
          </h2>
          <div className="mt-5 rounded-xl border border-neutral-200 bg-neutral-0 p-6 shadow-soft">
            <ContatoForm />
          </div>
        </section>
      </div>
    </div>
  );
}
