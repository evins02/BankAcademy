import Image from "next/image";
import { cn } from "@/lib/utils";

const SIZE_MAP = {
  sm: 32,
  md: 40,
  lg: 64,
} as const;

interface BankingLabLogoProps {
  size?: keyof typeof SIZE_MAP;
  className?: string;
}

export function BankingLabLogo({ size = "md", className }: BankingLabLogoProps) {
  const px = SIZE_MAP[size];

  return (
    <>
      {/* Shown in light mode */}
      <Image
        src="/logo-light.png"
        alt="Banking Lab"
        width={px}
        height={px}
        quality={100}
        priority
        style={{ objectFit: "contain" }}
        className={cn("dark:hidden", className)}
      />
      {/* Shown in dark mode */}
      <Image
        src="/logo-dark.png"
        alt="Banking Lab"
        width={px}
        height={px}
        quality={100}
        priority
        style={{ objectFit: "contain" }}
        className={cn("hidden dark:block", className)}
      />
    </>
  );
}
