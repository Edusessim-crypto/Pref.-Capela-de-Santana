"use client";

import { useId, useState, type FormEvent } from "react";
import type { SolicitacaoESic } from "@/types";
import { formatarDataLonga } from "../formatters";

type FormaResposta = SolicitacaoESic["formaResposta"];

function gerarProtocolo(): string {
  const ano = new Date().getFullYear();
  const sufixo = Math.floor(100000 + Math.random() * 900000);
  return `ESIC-${ano}-${sufixo}`;
}

function calcularPrazoResposta(dataEnvio: Date): string {
  const prazo = new Date(dataEnvio);
  prazo.setDate(prazo.getDate() + 20);
  return prazo.toISOString();
}

export default function ESicForm() {
  const [status, setStatus] = useState<"form" | "confirmado">("form");
  const [solicitacao, setSolicitacao] = useState<SolicitacaoESic | null>(null);

  const nomeId = useId();
  const emailId = useId();
  const cpfCnpjId = useId();
  const assuntoId = useId();
  const descricaoId = useId();
  const formaRespostaId = useId();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const dados = new FormData(event.currentTarget);
    const agora = new Date();

    const nova: SolicitacaoESic = {
      protocolo: gerarProtocolo(),
      nomeSolicitante: String(dados.get("nome") ?? ""),
      email: String(dados.get("email") ?? ""),
      cpfCnpj: String(dados.get("cpfCnpj") ?? "") || undefined,
      assunto: String(dados.get("assunto") ?? ""),
      descricao: String(dados.get("descricao") ?? ""),
      formaResposta: String(dados.get("formaResposta") ?? "E-mail") as FormaResposta,
      status: "Recebido",
      dataEnvio: agora.toISOString(),
      prazoResposta: calcularPrazoResposta(agora),
    };

    setSolicitacao(nova);
    setStatus("confirmado");
  }

  return (
    <div className="flex flex-col gap-6">
      {status === "form" ? (
        <form
          onSubmit={handleSubmit}
          className="flex max-w-2xl flex-col gap-4 rounded-xl border border-neutral-200 bg-neutral-0 p-6 shadow-soft"
        >
          <div className="flex flex-col gap-1">
            <label htmlFor={nomeId} className="text-sm font-medium text-neutral-700">
              Nome completo
            </label>
            <input
              id={nomeId}
              name="nome"
              type="text"
              required
              className="h-11 rounded-lg border border-neutral-300 bg-neutral-0 px-3 text-sm text-neutral-900 focus-visible:border-primary-500"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor={emailId} className="text-sm font-medium text-neutral-700">
              E-mail
            </label>
            <input
              id={emailId}
              name="email"
              type="email"
              required
              className="h-11 rounded-lg border border-neutral-300 bg-neutral-0 px-3 text-sm text-neutral-900 focus-visible:border-primary-500"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor={cpfCnpjId} className="text-sm font-medium text-neutral-700">
              CPF ou CNPJ <span className="font-normal text-neutral-500">(opcional)</span>
            </label>
            <input
              id={cpfCnpjId}
              name="cpfCnpj"
              type="text"
              inputMode="numeric"
              pattern="[0-9./-]*"
              placeholder="000.000.000-00"
              className="h-11 rounded-lg border border-neutral-300 bg-neutral-0 px-3 text-sm text-neutral-900 focus-visible:border-primary-500"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor={assuntoId} className="text-sm font-medium text-neutral-700">
              Assunto
            </label>
            <input
              id={assuntoId}
              name="assunto"
              type="text"
              required
              className="h-11 rounded-lg border border-neutral-300 bg-neutral-0 px-3 text-sm text-neutral-900 focus-visible:border-primary-500"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor={descricaoId} className="text-sm font-medium text-neutral-700">
              Descrição do pedido
            </label>
            <textarea
              id={descricaoId}
              name="descricao"
              required
              rows={5}
              className="rounded-lg border border-neutral-300 bg-neutral-0 px-3 py-2 text-sm text-neutral-900 focus-visible:border-primary-500"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor={formaRespostaId} className="text-sm font-medium text-neutral-700">
              Forma de resposta preferida
            </label>
            <select
              id={formaRespostaId}
              name="formaResposta"
              defaultValue="E-mail"
              className="h-11 rounded-lg border border-neutral-300 bg-neutral-0 px-3 text-sm text-neutral-900 focus-visible:border-primary-500"
            >
              <option value="E-mail">E-mail</option>
              <option value="Correspondência">Correspondência</option>
              <option value="Presencial">Presencial</option>
            </select>
          </div>

          <button
            type="submit"
            className="mt-2 flex h-11 w-fit items-center justify-center rounded-lg bg-primary-600 px-6 text-sm font-medium text-white transition-colors hover:bg-primary-700"
          >
            Enviar solicitação
          </button>
        </form>
      ) : (
        solicitacao && (
          <div
            role="status"
            className="flex max-w-2xl flex-col gap-3 rounded-xl border border-success-500/30 bg-success-500/5 p-6 shadow-soft"
          >
            <h2 className="text-lg font-semibold text-neutral-900">Solicitação recebida</h2>
            <dl className="flex flex-col gap-2 text-sm text-neutral-700">
              <div className="flex flex-wrap gap-1">
                <dt className="font-medium text-neutral-900">Protocolo:</dt>
                <dd>{solicitacao.protocolo}</dd>
              </div>
              <div className="flex flex-wrap gap-1">
                <dt className="font-medium text-neutral-900">Status:</dt>
                <dd>{solicitacao.status}</dd>
              </div>
              <div className="flex flex-wrap gap-1">
                <dt className="font-medium text-neutral-900">Prazo de resposta:</dt>
                <dd>{formatarDataLonga(solicitacao.prazoResposta)}</dd>
              </div>
            </dl>
            <p className="text-sm text-neutral-700">
              Guarde este número de protocolo. Em um ambiente de produção, você poderia
              consultar o andamento do seu pedido a qualquer momento.
            </p>
            <button
              type="button"
              onClick={() => {
                setStatus("form");
                setSolicitacao(null);
              }}
              className="flex h-11 w-fit items-center justify-center rounded-lg border border-neutral-300 px-4 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-100"
            >
              Enviar nova solicitação
            </button>
          </div>
        )
      )}
    </div>
  );
}
