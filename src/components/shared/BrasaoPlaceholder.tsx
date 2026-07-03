// PLACEHOLDER: substituir pelo brasão oficial do município em /public/brasao/ antes de produção
type BrasaoPlaceholderProps = {
  className?: string;
  size?: number;
};

export default function BrasaoPlaceholder({
  className,
  size = 40,
}: BrasaoPlaceholderProps) {
  return (
    <svg
      viewBox="0 0 64 72"
      width={size}
      height={(size * 72) / 64}
      className={className}
      role="img"
      aria-label="Brasão do Município de Capela de Santana"
    >
      <path
        d="M32 2 L60 12 V34 C60 52 48 64 32 70 C16 64 4 52 4 34 V12 Z"
        fill="var(--color-primary-600)"
        stroke="var(--color-primary-900)"
        strokeWidth="2"
      />
      <path
        d="M32 8 L54 16 V34 C54 48 44 58 32 63 C20 58 10 48 10 34 V16 Z"
        fill="var(--color-primary-50)"
        stroke="var(--color-accent-500)"
        strokeWidth="1.5"
      />
      <path
        d="M32 20 L36 30 H28 Z M32 20 L26 34 L32 30 L38 34 Z"
        fill="var(--color-accent-500)"
      />
      <path
        d="M22 44 C25 38 28 38 32 42 C36 38 39 38 42 44 C39 48 36 46 32 50 C28 46 25 48 22 44 Z"
        fill="var(--color-primary-700)"
      />
      <line
        x1="16"
        y1="52"
        x2="48"
        y2="52"
        stroke="var(--color-primary-700)"
        strokeWidth="1.5"
      />
    </svg>
  );
}
