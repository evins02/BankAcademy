import type { Metadata } from "next";
import Link from "next/link";
import { LearningShell, SeoCta } from "@/components/seo/LearningShell";
import { CustomerConversationQuiz } from "@/components/seo/CustomerConversationQuiz";

export const metadata: Metadata = {
  title: "Kundengespräch Bank üben: kostenloser Praxisfall | BankAcademy",
  description:
    "Kundengespräche im Banking praxisnah üben. Löse einen kostenlosen Mini-Fall und trainiere, wie du Bankwissen im Gespräch anwendest.",
  alternates: { canonical: "/kundengespraech" },
};

export default function KundengespraechPage() {
  return (
    <LearningShell>
      <section className="mx-auto max-w-5xl px-5 pb-10 pt-20 text-center sm:pt-28">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#00D4B8]">Kostenlos ausprobieren</p>
        <h1 className="mx-auto mt-4 max-w-4xl text-4xl font-extrabold tracking-tight sm:text-6xl">Kundengespräche in der Bank üben</h1>
        <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-300">
          Gute Kundengespräche entstehen nicht nur durch Fachwissen. Entscheidend ist, im richtigen Moment die richtigen Informationen zu erfragen und das weitere Vorgehen abzuleiten.
        </p>
      </section>

      <section className="mx-auto max-w-3xl px-5 pb-20">
        <CustomerConversationQuiz />
        <p className="mt-5 text-center text-sm text-slate-500">
          Der Fall dient dem Training und stellt keine Anlageberatung dar.
        </p>
      </section>

      <section className="mx-auto max-w-4xl px-5 pb-20">
        <h2 className="text-3xl font-bold tracking-tight">Was du mit Praxisfällen trainierst</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          {["Bedürfnisse erkennen", "Gespräche strukturieren", "Bankwissen anwenden"].map((title) => (
            <div key={title} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
              <h3 className="font-bold">{title}</h3>
            </div>
          ))}
        </div>
        <p className="mt-7 leading-8 text-slate-300">
          Möchtest du zuerst weitere Themen sehen? Auf der Übersicht findest du zusätzliche <Link href="/praxisfaelle" className="font-bold text-[#00D4B8] hover:underline">Praxisfälle für die Banklehre</Link>.
        </p>
      </section>
      <SeoCta />
    </LearningShell>
  );
}
