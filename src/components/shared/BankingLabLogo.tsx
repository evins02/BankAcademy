import Image from "next/image";
import { cn } from "@/lib/utils";

const SIZE_MAP = {
  sm: { width: 105, height: 30 },
  md: { width: 140, height: 40 },
  lg: { width: 175, height: 50 },
} as const;

interface BankingLabLogoProps {
  size?: keyof typeof SIZE_MAP;
  className?: string;
}

export function BankingLabLogo({ size = "md", className }: BankingLabLogoProps) {
  const { width, height } = SIZE_MAP[size];

  return (
    <>
      {/* Shown in light mode */}
      <Image
        src="/logo-light.webp"
        alt="BankAcademy"
        width={width}
        height={height}
        quality={100}
        priority
        style={{ objectFit: "contain" }}
        className={cn("dark:hidden", className)}
      />
      {/* Shown in dark mode */}
      <Image
        src="/logo-dark.webp"
        alt="BankAcademy"
        width={width}
        height={height}
        quality={100}
        priority
        style={{ objectFit: "contain" }}
        className={cn("hidden dark:block", className)}
      />
    </>
  );
}
