"use client";

// Página consumidora deve importar este componente via next/dynamic com ssr:false,
// pois o Leaflet acessa `window`/`document` e não é compatível com renderização estática.

import { useEffect, useMemo } from "react";
import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import type { Obra, StatusObra } from "@/types";
import { MUNICIPIO } from "@/lib/constants";
import Badge, { type BadgeTone } from "@/components/shared/Badge";

// Os ícones padrão do Leaflet referenciam URLs de imagem que quebram sob bundlers.
// Aponta-se para o CDN por simplicidade; um deploy totalmente offline exigiria
// hospedar as três imagens (marker-icon-2x.png, marker-icon.png, marker-shadow.png) localmente.
type IconDefaultWithPrivate = typeof L.Icon.Default & {
  prototype: { _getIconUrl?: unknown };
};

function configurarIconePadrao() {
  delete (L.Icon.Default as IconDefaultWithPrivate).prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  });
}

const STATUS_TONE: Record<StatusObra, BadgeTone> = {
  Planejada: "neutral",
  "Em execução": "primary",
  Paralisada: "warning",
  Concluída: "success",
};

const formatarMoeda = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

export interface ObrasMapProps {
  obras: Obra[];
}

export default function ObrasMap({ obras }: ObrasMapProps) {
  useEffect(() => {
    configurarIconePadrao();
  }, []);

  const centro = useMemo((): [number, number] => {
    if (obras.length === 0) {
      return [MUNICIPIO.coordenadas.lat, MUNICIPIO.coordenadas.lng];
    }
    const somaLat = obras.reduce((total, obra) => total + obra.latitude, 0);
    const somaLng = obras.reduce((total, obra) => total + obra.longitude, 0);
    return [somaLat / obras.length, somaLng / obras.length];
  }, [obras]);

  return (
    <div className="h-[420px] w-full overflow-hidden rounded-xl md:h-[520px]">
      <MapContainer center={centro} zoom={13} scrollWheelZoom={false} className="h-full w-full">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contribuidores'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {obras.map((obra) => (
          <Marker key={obra.id} position={[obra.latitude, obra.longitude]}>
            <Popup>
              <div className="flex flex-col gap-1.5">
                <p className="font-semibold text-neutral-900">{obra.nome}</p>
                <Badge tone={STATUS_TONE[obra.status]}>{obra.status}</Badge>
                <p className="text-sm text-neutral-700">
                  {obra.percentualExecucao}% concluído
                </p>
                <p className="text-sm text-neutral-700">
                  {formatarMoeda.format(obra.valorContratado)}
                </p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
