import Image from "next/image";

// Logo is a 1254×1254 square PNG
const SIZE_MAP = {
  sm: 32,
  md: 48,
  lg: 64,
} as const;

interface BankingLabLogoProps {
  size?: keyof typeof SIZE_MAP;
  className?: string;
}

export function BankingLabLogo({ size = "md", className }: BankingLabLogoProps) {
  const px = SIZE_MAP[size];

  return (
    <Image
      src="/BankingLab Logo.png"
      alt="Banking Lab"
      width={px}
      height={px}
      quality={95}
      priority
      style={{ objectFit: "contain" }}
      className={className}
    />
  );
}
