import { cn } from "@/lib/utils";

const SIZE_MAP = {
  sm: 32,
  md: 44,
  lg: 56,
} as const;

interface BankingLabLogoProps {
  size?: keyof typeof SIZE_MAP;
  className?: string;
}

// The logo file is a square containing the icon mark (top ~62%) + "BankAcademy"
// text (bottom ~38%). We crop to show only the icon mark by rendering the image
// slightly larger than the container and clipping via overflow:hidden.
export function BankingLabLogo({ size = "md", className }: BankingLabLogoProps) {
  const display = SIZE_MAP[size];
  const inner = Math.round(display / 0.62);
  const leftOffset = Math.round((inner - display) / 2);

  return (
    <div
      style={{ width: display, height: display, overflow: "hidden", flexShrink: 0 }}
      className={cn(className)}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/logo-light.webp"
        alt="BankAcademy"
        width={inner}
        height={inner}
        style={{ display: "block", marginLeft: -leftOffset }}
      />
    </div>
  );
}
