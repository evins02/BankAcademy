import Image from "next/image";

const SIZE_MAP = {
  sm: 28,
  md: 40,
  lg: 56,
} as const;

interface BankingLabLogoProps {
  size?: keyof typeof SIZE_MAP;
  className?: string;
}

export function BankingLabLogo({ size = "md", className }: BankingLabLogoProps) {
  const height = SIZE_MAP[size];

  return (
    <Image
      src="/BankingLab Logo.png"
      alt="Banking Lab"
      height={height}
      width={0}
      style={{ height, width: "auto" }}
      priority
      className={className}
    />
  );
}
