import type { Metadata } from "next";
import Link from "next/link";
import { LearningShell, SeoCta } from "@/components/seo/LearningShell";

export const metadata: Metadata = {
  title: "Praxisfälle für die Banklehre | BankAcademy",
  description:
    "Praxisfälle für Banklernende: Kundensituationen aus Zahlen & Sparen, Anlegen, Finanzieren und Firmenkunden praxisnah trainieren.",
  alternates: { canonical: "/praxisfaelle" },
};

const cases = [
  { title: "Konto & Zahlungsverkehr", text: "Ein Kunde kommt mit einem konkreten Anliegen. Welche Informationen brauchst du und wie gehst du strukturiert vor?", tag: "Zahlen & Sparen" },
  { title: "Anlagekunde", text: "Eine Kundin möchte einen grösseren Betrag investieren. Trainiere, welche Bedürfnisse du zuerst klären solltest.", tag: "Anlegen" },
  { title: "Finanzierungsanfrage", text: "Vom Kundenwunsch zu den relevanten Abklärungen: Übe, Informationen richtig einzuordnen.", tag: "Finanzieren" },
  { title: "Geschäftskonto", text: "Ein Unternehmen möchte eine Bankbeziehung eröffnen. Welche Punkte spielen bei der Vorbereitung eine Rolle?", tag: "Firmenkunden" },
];

export default function PraxisfaellePage() {
  return (
    <LearningShell>
      <section className="mx-auto max-w-6xl px-5 pb-12 pt-20 sm:pt-28">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#00D4B8]">Banking üben</p>
        <h1 className="mt-4 max-w-4xl text-4xl font-extrabold tracking-tight sm:text-6xl">Praxisfälle für die Banklehre</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
          Wende dein Bankfachwissen in typischen Situationen aus dem Bankalltag an. Die Fälle helfen dir, vom theoretischen Wissen zum praktischen Denken zu kommen.
        </p>
      </section>

      <section className="mx-auto grid max-w-6xl gap-4 px-5 pb-16 md:grid-cols-2">
        {cases.map((item) => (
          <article key={item.title} className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
            <span className="text-xs font-bold uppercase tracking-wider text-[#AFA7FF]">{item.tag}</span>
            <h2 className="mt-3 text-2xl font-bold">{item.title}</h2>
            <p className="mt-3 leading-7 text-slate-400">{item.text}</p>
          </article>
        ))}
      </section>

      <section className="mx-auto max-w-4xl px-5 pb-20">
        <div className="rounded-3xl border border-[#7B6FE8]/25 bg-[#7B6FE8]/10 p-7 sm:p-9">
          <p className="text-sm font-bold text-[#AFA7FF]">KOSTENLOSER MINI-FALL</p>
          <h2 className="mt-2 text-2xl font-bold">Wie würdest du ein Anlagegespräch beginnen?</h2>
          <p className="mt-3 leading-7 text-slate-300">Teste direkt eine kurze Kundensituation und erhalte Feedback zu deiner Entscheidung.</p>
          <Link href="/kundengespraech" className="mt-5 inline-flex rounded-xl bg-white px-5 py-3 font-bold text-[#071426]">Praxisfall starten →</Link>
        </div>
      </section>
      <SeoCta />
    </LearningShell>
  );
}
