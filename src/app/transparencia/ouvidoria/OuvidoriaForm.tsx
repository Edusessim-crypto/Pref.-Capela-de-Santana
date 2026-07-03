"use client";

import { useId, useState, type FormEvent } from "react";
import type { ManifestacaoOuvidoria } from "@/types";

type TipoManifestacao = ManifestacaoOuvidoria["tipo"];

function gerarProtocolo(): string {
  const ano = new Date().getFullYear();
  const sufixo = Math.floor(100000 + Math.random() * 900000);
  return `OUV-${ano}-${sufixo}`;
}

export default function OuvidoriaForm() {
  const [status, setStatus] = useState<"form" | "confirmado">("form");
  const [manifestacao, setManifestacao] = useState<ManifestacaoOuvidoria | null>(null);
  const [identificado, setIdentificado] = useState(true);

  const tipoId = useId();
  const identificadoId = useId();
  const nomeId = useId();
  const emailId = useId();
  const telefoneId = useId();
  const orgaoId = useId();
  const descricaoId = useId();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const dados = new FormData(event.currentTarget);
    const agora = new Date();

    const nova: ManifestacaoOuvidoria = {
      protocolo: gerarProtocolo(),
      tipo: String(dados.get("tipo") ?? "Sugestão") as TipoManifestacao,
      nomeSolicitante: identificado ? String(dados.get("nome") ?? "") : "Não identificado",
      email: identificado ? String(dados.get("email") ?? "") : "",
      telefone: identificado ? String(dados.get("telefone") ?? "") || undefined : undefined,
      identificado,
      orgaoRelacionado: String(dados.get("orgaoRelacionado") ?? ""),
      descricao: String(dados.get("descricao") ?? ""),
      status: "Recebido",
      dataEnvio: agora.toISOString(),
    };

    setManifestacao(nova);
    setStatus("confirmado");
  }

  if (status === "confirmado" && manifestacao) {
    return (
      <div
        role="status"
        className="flex max-w-2xl flex-col gap-3 rounded-xl border border-success-500/30 bg-success-500/5 p-6 shadow-soft"
      >
        <h2 className="text-lg font-semibold text-neutral-900">Manifestação recebida</h2>
        <dl className="flex flex-col gap-2 text-sm text-neutral-700">
          <div className="flex flex-wrap gap-1">
            <dt className="font-medium text-neutral-900">Protocolo:</dt>
            <dd>{manifestacao.protocolo}</dd>
          </div>
          <div className="flex flex-wrap gap-1">
            <dt className="font-medium text-neutral-900">Tipo:</dt>
            <dd>{manifestacao.tipo}</dd>
          </div>
          <div className="flex flex-wrap gap-1">
            <dt className="font-medium text-neutral-900">Status:</dt>
            <dd>{manifestacao.status}</dd>
          </div>
        </dl>
        <p className="text-sm text-neutral-700">
          Guarde este número de protocolo. Em um ambiente de produção, você poderia
          consultar o andamento da sua manifestação a qualquer momento.
        </p>
        <button
          type="button"
          onClick={() => {
            setStatus("form");
            setManifestacao(null);
          }}
          className="flex h-11 w-fit items-center justify-center rounded-lg border border-neutral-300 px-4 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-100"
        >
          Enviar nova manifestação
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex max-w-2xl flex-col gap-4 rounded-xl border border-neutral-200 bg-neutral-0 p-6 shadow-soft"
    >
      <div className="flex flex-col gap-1">
        <label htmlFor={tipoId} className="text-sm font-medium text-neutral-700">
          Tipo de manifestação
        </label>
        <select
          id={tipoId}
          name="tipo"
          defaultValue="Sugestão"
          className="h-11 rounded-lg border border-neutral-300 bg-neutral-0 px-3 text-sm text-neutral-900 focus-visible:border-primary-500"
        >
          <option value="Reclamação">Reclamação</option>
          <option value="Sugestão">Sugestão</option>
          <option value="Elogio">Elogio</option>
          <option value="Denúncia">Denúncia</option>
          <option value="Solicitação">Solicitação</option>
        </select>
      </div>

      <fieldset className="flex flex-col gap-2">
        <legend className="text-sm font-medium text-neutral-700">Deseja se identificar?</legend>
        <div className="flex gap-4">
          <label htmlFor={`${identificadoId}-sim`} className="flex min-h-[44px] items-center gap-2 text-sm text-neutral-700">
            <input
              id={`${identificadoId}-sim`}
              type="radio"
              name="identificado"
              checked={identificado}
              onChange={() => setIdentificado(true)}
              className="h-4 w-4"
            />
            Sim, quero me identificar
          </label>
          <label htmlFor={`${identificadoId}-nao`} className="flex min-h-[44px] items-center gap-2 text-sm text-neutral-700">
            <input
              id={`${identificadoId}-nao`}
              type="radio"
              name="identificado"
              checked={!identificado}
              onChange={() => setIdentificado(false)}
              className="h-4 w-4"
            />
            Não, prefiro manifestação anônima
          </label>
        </div>
      </fieldset>

      {identificado ? (
        <>
          <div className="flex flex-col gap-1">
            <label htmlFor={nomeId} className="text-sm font-medium text-neutral-700">
              Nome completo
            </label>
            <input
              id={nomeId}
              name="nome"
              type="text"
              required={identificado}
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
              required={identificado}
              className="h-11 rounded-lg border border-neutral-300 bg-neutral-0 px-3 text-sm text-neutral-900 focus-visible:border-primary-500"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor={telefoneId} className="text-sm font-medium text-neutral-700">
              Telefone <span className="font-normal text-neutral-500">(opcional)</span>
            </label>
            <input
              id={telefoneId}
              name="telefone"
              type="tel"
              className="h-11 rounded-lg border border-neutral-300 bg-neutral-0 px-3 text-sm text-neutral-900 focus-visible:border-primary-500"
            />
          </div>
        </>
      ) : null}

      <div className="flex flex-col gap-1">
        <label htmlFor={orgaoId} className="text-sm font-medium text-neutral-700">
          Órgão relacionado
        </label>
        <input
          id={orgaoId}
          name="orgaoRelacionado"
          type="text"
          required
          placeholder="Ex.: Secretaria de Saúde"
          className="h-11 rounded-lg border border-neutral-300 bg-neutral-0 px-3 text-sm text-neutral-900 focus-visible:border-primary-500"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor={descricaoId} className="text-sm font-medium text-neutral-700">
          Descrição
        </label>
        <textarea
          id={descricaoId}
          name="descricao"
          required
          rows={5}
          className="rounded-lg border border-neutral-300 bg-neutral-0 px-3 py-2 text-sm text-neutral-900 focus-visible:border-primary-500"
        />
      </div>

      <button
        type="submit"
        className="mt-2 flex h-11 w-fit items-center justify-center rounded-lg bg-primary-600 px-6 text-sm font-medium text-white transition-colors hover:bg-primary-700"
      >
        Enviar manifestação
      </button>
    </form>
  );
}
