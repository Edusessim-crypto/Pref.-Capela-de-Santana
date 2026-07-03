"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { CheckCircle2 } from "lucide-react";

interface FormState {
  nome: string;
  email: string;
  assunto: string;
  mensagem: string;
}

const ESTADO_INICIAL: FormState = {
  nome: "",
  email: "",
  assunto: "",
  mensagem: "",
};

const REGEX_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ContatoForm() {
  const [form, setForm] = useState<FormState>(ESTADO_INICIAL);
  const [erros, setErros] = useState<Partial<Record<keyof FormState, string>>>({});
  const [enviado, setEnviado] = useState(false);

  function handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = event.target;
    setForm((atual) => ({ ...atual, [name]: value }));
  }

  function validar(dados: FormState): Partial<Record<keyof FormState, string>> {
    const novosErros: Partial<Record<keyof FormState, string>> = {};

    if (!dados.nome.trim()) novosErros.nome = "Informe seu nome.";
    if (!dados.email.trim()) {
      novosErros.email = "Informe seu e-mail.";
    } else if (!REGEX_EMAIL.test(dados.email.trim())) {
      novosErros.email = "Informe um e-mail válido.";
    }
    if (!dados.assunto.trim()) novosErros.assunto = "Informe o assunto.";
    if (!dados.mensagem.trim()) novosErros.mensagem = "Escreva sua mensagem.";

    return novosErros;
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const novosErros = validar(form);
    setErros(novosErros);

    if (Object.keys(novosErros).length === 0) {
      // Ambiente de demonstração: não há envio real a um backend/e-mail da
      // Prefeitura. O formulário apenas simula o registro da mensagem.
      setEnviado(true);
      setForm(ESTADO_INICIAL);
    }
  }

  if (enviado) {
    return (
      <div
        role="status"
        className="flex flex-col items-start gap-3 rounded-xl border border-success-500/30 bg-success-500/10 p-6"
      >
        <span className="inline-flex items-center gap-2 font-semibold text-success-700">
          <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
          Mensagem registrada (ambiente de demonstração)
        </span>
        <p className="text-sm text-neutral-700">
          Este é um protótipo e nenhuma mensagem foi enviada de fato à Prefeitura.
          Em um ambiente de produção, este formulário seria integrado a um canal
          oficial de atendimento.
        </p>
        <button
          type="button"
          onClick={() => setEnviado(false)}
          className="mt-1 inline-flex h-11 items-center rounded-lg border border-neutral-300 px-4 text-sm font-medium text-neutral-700 hover:bg-neutral-100"
        >
          Enviar nova mensagem
        </button>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div>
        <label htmlFor="contato-nome" className="block text-sm font-medium text-neutral-800">
          Nome
        </label>
        <input
          id="contato-nome"
          name="nome"
          type="text"
          value={form.nome}
          onChange={handleChange}
          aria-invalid={Boolean(erros.nome)}
          aria-describedby={erros.nome ? "contato-nome-erro" : undefined}
          className="mt-1.5 h-11 w-full rounded-lg border border-neutral-300 bg-neutral-0 px-3 text-sm text-neutral-900 focus-visible:border-primary-500"
        />
        {erros.nome && (
          <p id="contato-nome-erro" className="mt-1 text-sm text-danger-700">
            {erros.nome}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="contato-email" className="block text-sm font-medium text-neutral-800">
          E-mail
        </label>
        <input
          id="contato-email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          aria-invalid={Boolean(erros.email)}
          aria-describedby={erros.email ? "contato-email-erro" : undefined}
          className="mt-1.5 h-11 w-full rounded-lg border border-neutral-300 bg-neutral-0 px-3 text-sm text-neutral-900 focus-visible:border-primary-500"
        />
        {erros.email && (
          <p id="contato-email-erro" className="mt-1 text-sm text-danger-700">
            {erros.email}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="contato-assunto" className="block text-sm font-medium text-neutral-800">
          Assunto
        </label>
        <input
          id="contato-assunto"
          name="assunto"
          type="text"
          value={form.assunto}
          onChange={handleChange}
          aria-invalid={Boolean(erros.assunto)}
          aria-describedby={erros.assunto ? "contato-assunto-erro" : undefined}
          className="mt-1.5 h-11 w-full rounded-lg border border-neutral-300 bg-neutral-0 px-3 text-sm text-neutral-900 focus-visible:border-primary-500"
        />
        {erros.assunto && (
          <p id="contato-assunto-erro" className="mt-1 text-sm text-danger-700">
            {erros.assunto}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="contato-mensagem" className="block text-sm font-medium text-neutral-800">
          Mensagem
        </label>
        <textarea
          id="contato-mensagem"
          name="mensagem"
          rows={5}
          value={form.mensagem}
          onChange={handleChange}
          aria-invalid={Boolean(erros.mensagem)}
          aria-describedby={erros.mensagem ? "contato-mensagem-erro" : undefined}
          className="mt-1.5 w-full rounded-lg border border-neutral-300 bg-neutral-0 px-3 py-2 text-sm text-neutral-900 focus-visible:border-primary-500"
        />
        {erros.mensagem && (
          <p id="contato-mensagem-erro" className="mt-1 text-sm text-danger-700">
            {erros.mensagem}
          </p>
        )}
      </div>

      <button
        type="submit"
        className="inline-flex h-12 w-fit items-center justify-center rounded-lg bg-primary-600 px-6 text-sm font-semibold text-neutral-0 transition-colors hover:bg-primary-700"
      >
        Enviar mensagem
      </button>
    </form>
  );
}
