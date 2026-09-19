import type { Metadata } from "next";
import Link from "next/link";
import { LearningShell, SeoCta } from "@/components/seo/LearningShell";

export const metadata: Metadata = {
  title: "Banklehre Schweiz: Bankwissen praxisnah trainieren | BankAcademy",
  description:
    "Bankwissen aus der Banklehre in realistischen Situationen anwenden. Entdecke Praxisfälle und Kundengespräche für Lernende im Schweizer Banking.",
  alternates: { canonical: "/banklehre" },
};

const topics = [
  ["Kundengespräche", "Gespräche strukturieren, Bedürfnisse erkennen und Wissen in Kundensituationen anwenden.", "/kundengespraech"],
  ["Praxisfälle", "Typische Situationen aus Zahlen & Sparen, Anlegen, Finanzieren und dem Firmenkundengeschäft trainieren.", "/praxisfaelle"],
  ["Selbstständig üben", "Bankfachwissen nicht nur lesen, sondern Entscheidungen treffen und direkt Rückmeldung erhalten.", "/praxisfaelle"],
];

export default function BanklehrePage() {
  return (
    <LearningShell>
      <section className="mx-auto max-w-6xl px-5 pb-16 pt-20 sm:pt-28">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#00D4B8]">Banklehre Schweiz</p>
        <h1 className="mt-4 max-w-4xl text-4xl font-extrabold tracking-tight sm:text-6xl">
          Bankwissen lernen ist das eine. Es im Alltag anwenden das andere.
        </h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
          In der Banklehre baust du Fachwissen auf. Im Arbeitsalltag musst du daraus die richtigen Fragen, Entscheidungen und nächsten Schritte ableiten. BankAcademy hilft dir, genau diese Verbindung zwischen Theorie und Praxis zu trainieren.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/praxisfaelle" className="rounded-xl bg-[#00D4B8] px-5 py-3 font-bold text-[#071426]">Praxisfälle entdecken</Link>
          <Link href="/kundengespraech" className="rounded-xl border border-white/15 px-5 py-3 font-bold text-white">Kundengespräch ausprobieren</Link>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-4 px-5 pb-20 md:grid-cols-3">
        {topics.map(([title, text, href]) => (
          <Link key={title} href={href} className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 transition hover:-translate-y-1 hover:border-[#00D4B8]/30">
            <h2 className="text-xl font-bold">{title}</h2>
            <p className="mt-3 leading-7 text-slate-400">{text}</p>
            <span className="mt-5 inline-block text-sm font-bold text-[#00D4B8]">Mehr erfahren →</span>
          </Link>
        ))}
      </section>

      <section className="mx-auto max-w-4xl px-5 pb-20">
        <h2 className="text-3xl font-bold tracking-tight">Warum Praxis in der Banklehre entscheidend ist</h2>
        <div className="mt-5 space-y-4 leading-8 text-slate-300">
          <p>
            Fachbegriffe und Prozesse zu kennen ist eine wichtige Grundlage. In einem Kundengespräch reicht Wissen allein jedoch nicht: Du musst Informationen einordnen, gezielt nachfragen und dein Vorgehen verständlich erklären.
          </p>
          <p>
            Deshalb setzt BankAcademy auf realistische Übungssituationen. Du trainierst nicht für eine einzelne Musterantwort, sondern dafür, dein Bankwissen in unterschiedlichen Situationen anzuwenden.
          </p>
        </div>
      </section>
      <SeoCta />
    </LearningShell>
  );
}
