import Link from "next/link";
import type { ReactNode } from "react";

const nav = [
  { href: "/banklehre", label: "Banklehre" },
  { href: "/praxisfaelle", label: "Praxisfälle" },
  { href: "/kundengespraech", label: "Kundengespräch" },
];

export function LearningShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#071426] text-slate-50">
      <header className="border-b border-white/10 bg-[#0A1628]/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-5 py-4">
          <Link href="/" className="text-xl font-extrabold tracking-tight">
            Bank<span className="text-[#00D4B8]">Academy</span>
          </Link>
          <nav className="hidden items-center gap-1 sm:flex" aria-label="Lernbereich">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg px-3 py-2 text-sm text-slate-300 transition hover:bg-white/5 hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <Link
            href="/sign-up"
            className="rounded-lg bg-[#00D4B8] px-4 py-2 text-sm font-bold text-[#071426] transition hover:opacity-90"
          >
            Kostenlos starten
          </Link>
        </div>
      </header>

      <main id="main-content">{children}</main>

      <footer className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-10 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <p>BankAcademy – Bankwissen in der Praxis anwenden.</p>
          <div className="flex flex-wrap gap-4">
            <Link href="/banklehre" className="hover:text-white">Banklehre</Link>
            <Link href="/praxisfaelle" className="hover:text-white">Praxisfälle</Link>
            <Link href="/kontakt" className="hover:text-white">Kontakt</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

export function SeoCta() {
  return (
    <section className="mx-auto max-w-4xl px-5 pb-20">
      <div className="rounded-3xl border border-[#00D4B8]/25 bg-[#00D4B8]/10 p-7 text-center sm:p-10">
        <p className="mb-2 text-sm font-bold uppercase tracking-[0.18em] text-[#00D4B8]">Weitertrainieren</p>
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Bereit für weitere Situationen aus dem Bankalltag?</h2>
        <p className="mx-auto mt-3 max-w-2xl text-slate-300">
          Trainiere praxisnahe Fälle und Kundengespräche selbstständig mit BankAcademy.
        </p>
        <Link
          href="/sign-up"
          className="mt-6 inline-flex rounded-xl bg-[#00D4B8] px-6 py-3 font-bold text-[#071426] transition hover:opacity-90"
        >
          BankAcademy kostenlos starten
        </Link>
      </div>
    </section>
  );
}
