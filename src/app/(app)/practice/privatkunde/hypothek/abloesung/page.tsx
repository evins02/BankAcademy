import { Header } from "@/components/layout/Header";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { PracticeSimulationPage } from "@/components/modules/simulation/PracticeSimulationPage";
import type { BriefingCustomer, DifficultyOption } from "@/components/modules/simulation/PracticeBriefingScreen";
import type { Difficulty } from "@/components/modules/simulation/sim-types";

const CUSTOMER: BriefingCustomer = {
  initials: "SM",
  name: "Sandra Meyer",
  statusLabel: "Interessentin (Bankwechsel)",
  fields: [
    { label: "Alter", value: "38 Jahre" },
    { label: "Beruf", value: "Projektleiterin" },
    { label: "Wohnort", value: "Zürich-Höngg" },
    { label: "Kinder", value: "2 (8 und 11 Jahre)" },
    { label: "Hypothek aktuell", value: "CHF 650'000 (PostFinance)" },
    { label: "Aktueller Zins", value: "2.8% · Festhypothek" },
    { label: "Restlaufzeit", value: "8 Monate" },
    { label: "Anliegen", value: "Ablösung / Bankwechsel" },
  ],
  mood: { label: "Abwägend", colorClass: "text-blue-600", dotClass: "bg-blue-500" },
  alertText:
    "Kundin hat bereits eine Konkurrenzofferte von Raiffeisen (2.1%, 10 Jahre fix). Möchte vergleichen und bei überzeugendem Angebot wechseln.",
  appointmentLabel: "Erstgespräch · 14:00 Uhr",
};

const DIFFICULTIES: DifficultyOption[] = [
  { key: "einsteiger", dot: "bg-green-500", label: "Einsteiger", description: "Sandra ist offen und wechselbereit bei einem fairen Angebot." },
  { key: "fortgeschritten", dot: "bg-yellow-400", label: "Fortgeschritten", description: "Sandra hat recherchiert und stellt gezielte Fragen zu Kosten und Prozess." },
  { key: "challenge", dot: "bg-red-500", label: "Challenge-Niveau", description: "Sandra verhandelt hart und verweist auf das 2.1%-Angebot von Raiffeisen." },
];

const OPENINGS: Record<Difficulty, string[]> = {
  einsteiger: [
    "Guten Tag. Ich habe bei Ihnen einen Termin wegen meiner Hypothek – ich möchte einen Bankwechsel prüfen.",
    "Hallo, schön. Ich habe von einer Kollegin gehört, dass Sie gute Konditionen anbieten. Ich hätte Interesse.",
  ],
  fortgeschritten: [
    "Guten Tag. Meine Festhypothek bei der PostFinance läuft in acht Monaten aus. Ich möchte vergleichen und brauche konkrete Zahlen.",
    "Guten Tag. Ich habe bei PostFinance 2.8% bezahlt – was können Sie mir anbieten? Ich spreche gerade mit mehreren Banken.",
  ],
  challenge: [
    "Guten Tag. Ich mache es kurz: Raiffeisen hat mir 2.1% auf zehn Jahre angeboten. Können Sie das unterbieten? Und was kostet mich der Wechsel insgesamt?",
    "Guten Tag. Ich habe CHF 650'000 Hypothek, acht Monate Restlaufzeit. Raiffeisen bietet 2.1% für zehn Jahre fix. Was ist Ihr bestes Angebot und welche Kosten fallen an?",
  ],
};

export default function HypothekAbloesung() {
  return (
    <>
      <Header title="Hypothek – Ablösung Fremdbank" subtitle="Sandra Meyer · Bankwechsel / Offertvergleich" />
      <Breadcrumb
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Practice" },
          { label: "Privatkundenberater" },
          { label: "Hypotheken" },
          { label: "Ablösung Fremdbank" },
        ]}
      />
      <PracticeSimulationPage
        apiEndpoint="/api/simulation/practice-hypothek"
        openings={OPENINGS}
        customer={CUSTOMER}
        difficulties={DIFFICULTIES}
      />
    </>
  );
}
