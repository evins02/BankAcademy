import { Bell, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BankingLabLogo } from "@/components/shared/BankingLabLogo";

interface HeaderProps {
  title: string;
  subtitle?: string;
}

export function Header({ title, subtitle }: HeaderProps) {
  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-border bg-surface px-6">
      <div className="flex items-center gap-4">
        <BankingLabLogo size="sm" />
        <div>
          <h1 className="text-lg font-semibold text-text-primary">{title}</h1>
          {subtitle && (
            <p className="text-xs text-text-secondary">{subtitle}</p>
          )}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" aria-label="Suche">
          <Search size={18} />
        </Button>
        <Button variant="ghost" size="icon" aria-label="Benachrichtigungen">
          <Bell size={18} />
        </Button>
      </div>
    </header>
  );
}
