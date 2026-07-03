import Image from "next/image";

type BrasaoProps = {
  className?: string;
  size?: number;
};

export default function Brasao({ className, size = 40 }: BrasaoProps) {
  return (
    <Image
      src="/brasao/brasao-capela-de-santana.png"
      alt="Brasão do Município de Capela de Santana"
      width={size}
      height={size}
      className={className}
    />
  );
}
