import type { Metadata } from "next";
import Image from "next/image";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import Brasao from "@/components/shared/Brasao";
import { MUNICIPIO } from "@/lib/constants";

export const metadata: Metadata = {
  title: "O Município",
  description:
    "História, dados gerais, símbolos e localização do Município de Capela de Santana - RS.",
};

const DADOS_GERAIS = [
  { label: "População estimada", valor: "~13.000 habitantes (dado ilustrativo)" },
  { label: "Área territorial", valor: "~230 km² (dado ilustrativo)" },
  { label: "Ano de fundação", valor: "1982 (dado ilustrativo)" },
  { label: "Gentílico", valor: "capela-santanense" },
  { label: "Fuso horário", valor: "Horário de Brasília (UTC-3)" },
];

export default function MunicipioPage() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumbs
        items={[{ label: "Início", href: "/" }, { label: "O Município" }]}
      />

      <h1 className="mt-4 font-serif text-3xl font-bold text-neutral-900 sm:text-4xl">
        O Município
      </h1>

      <div className="relative mt-8 aspect-[16/9] w-full overflow-hidden rounded-2xl shadow-soft-lg sm:aspect-[21/9]">
        <Image
          src="/images/institucional/paisagem-municipio.svg"
          alt="Paisagem rural ilustrativa da região de Capela de Santana, com colinas e plantações"
          fill
          priority
          className="object-cover"
        />
      </div>

      <section aria-labelledby="historia-heading" className="mt-10">
        <h2 id="historia-heading" className="font-serif text-2xl font-semibold text-neutral-900">
          História
        </h2>
        <div className="mt-4 space-y-4 text-neutral-700 [&_p]:leading-relaxed">
          <p>
            Como diversos municípios da região do Vale do Caí e das Encostas da Serra
            Gaúcha, Capela de Santana teve sua ocupação marcada pela chegada de
            imigrantes de origem alemã e italiana ao longo do século XIX, atraídos
            pela fertilidade do solo e pela proximidade com os principais rios da
            região. Pequenas propriedades rurais dedicadas à agricultura familiar
            deram origem aos primeiros núcleos populacionais que, com o tempo, se
            transformaram em vilas e distritos.
          </p>
          <p>
            A vocação agrícola do município se manteve como marca registrada de sua
            economia, com destaque para a produção de hortaliças, fumo, leite e
            derivados coloniais, que ainda hoje abastecem feiras livres e mercados da
            região metropolitana. A arquitetura remanescente de algumas propriedades
            rurais e a manutenção de tradições, festas e culinária de origem europeia
            reforçam esse traço cultural.
          </p>
          <p>
            Com o processo de emancipação político-administrativa, o município
            consolidou sua estrutura de governo próprio, investindo progressivamente
            em infraestrutura urbana, educação, saúde e serviços públicos, mantendo
            ao mesmo tempo o perfil predominantemente rural que caracteriza boa parte
            de seu território.
          </p>
          <p className="text-sm text-neutral-500">
            Observação: os dados históricos acima são ilustrativos, elaborados para
            fins de demonstração deste portal, e não representam registro histórico
            oficial do município.
          </p>
        </div>
      </section>

      <section aria-labelledby="dados-gerais-heading" className="mt-12">
        <h2 id="dados-gerais-heading" className="font-serif text-2xl font-semibold text-neutral-900">
          Dados gerais
        </h2>
        <dl className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {DADOS_GERAIS.map((item) => (
            <div
              key={item.label}
              className="rounded-xl border border-neutral-200 bg-neutral-0 p-5 shadow-soft"
            >
              <dt className="text-sm font-medium text-neutral-500">{item.label}</dt>
              <dd className="mt-1 text-lg font-semibold text-neutral-900">{item.valor}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section aria-labelledby="simbolos-heading" className="mt-12">
        <h2 id="simbolos-heading" className="font-serif text-2xl font-semibold text-neutral-900">
          Símbolos do município
        </h2>
        <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div className="flex flex-col items-start gap-4 rounded-xl border border-neutral-200 bg-neutral-0 p-6 shadow-soft">
            <Brasao size={72} />
            <div>
              <h3 className="font-semibold text-neutral-900">Brasão do Município</h3>
              <p className="mt-1 text-sm text-neutral-600">
                Representação heráldica ilustrativa utilizada nesta demonstração, com
                elementos que remetem à vocação agrícola e à fé cristã presentes na
                identidade local.
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-4 rounded-xl border border-neutral-200 bg-neutral-0 p-6 shadow-soft">
            <div className="flex h-16 w-24 items-center justify-center rounded border border-neutral-300 bg-gradient-to-b from-primary-600 via-neutral-0 to-accent-500 text-[10px] font-medium text-neutral-500">
              Bandeira
            </div>
            <div>
              <h3 className="font-semibold text-neutral-900">Bandeira do Município</h3>
              <p className="mt-1 text-sm text-neutral-600">
                Composta pelas cores institucionais do município — azul, branco e
                dourado — com o brasão municipal centralizado (descrição ilustrativa
                de demonstração).
              </p>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="localizacao-heading" className="mt-12">
        <h2 id="localizacao-heading" className="font-serif text-2xl font-semibold text-neutral-900">
          Localização
        </h2>
        <div className="mt-4 rounded-xl border border-neutral-200 bg-neutral-0 p-6 shadow-soft">
          <p className="text-neutral-700">
            Capela de Santana está localizada na região do Vale do Caí, no estado do
            Rio Grande do Sul, com sede administrativa em:
          </p>
          <p className="mt-2 font-medium text-neutral-900">
            {MUNICIPIO.endereco.logradouro}, {MUNICIPIO.endereco.bairro} —{" "}
            {MUNICIPIO.endereco.cidade}/{MUNICIPIO.endereco.uf}, CEP{" "}
            {MUNICIPIO.endereco.cep}
          </p>
          <p className="mt-2 text-sm text-neutral-500">
            Coordenadas de referência: {MUNICIPIO.coordenadas.lat.toFixed(4)},{" "}
            {MUNICIPIO.coordenadas.lng.toFixed(4)}
          </p>
        </div>
      </section>
    </div>
  );
}
