import { Header } from "@/components/layout/Header";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { PracticeSimulationPage } from "@/components/modules/simulation/PracticeSimulationPage";
import type { BriefingCustomer, DifficultyOption } from "@/components/modules/simulation/PracticeBriefingScreen";
import type { Difficulty } from "@/components/modules/simulation/sim-types";

const CUSTOMER: BriefingCustomer = {
  initials: "MS",
  name: "Markus Steiner",
  statusLabel: "Bestandeskunde · 12 Jahre",
  fields: [
    { label: "Alter", value: "45 Jahre" },
    { label: "Beruf", value: "Techniker / Angestellter" },
    { label: "Wohnort", value: "Winterthur" },
    { label: "Portfolio", value: "CHF 280’000" },
    { label: "Allokation", value: "60% Aktien · 30% Obl. · 10% Cash" },
    { label: "Rendite Ziel", value: "4–5% p.a." },
    { label: "Rendite IST", value: "–2% (letztes Jahr)" },
    { label: "Anliegen", value: "Jahresgespräch / Performance-Review" },
  ],
  mood: { label: "Angespannt", colorClass: "text-amber-600", dotClass: "bg-amber-500" },
  alertText:
    "Langjähriger Kunde ist enttäuscht über die Performance. Erwähnte in der Terminnotiz, dass er Vergleiche mit anderen Banken angestellt hat.",
  appointmentLabel: "Jahresgespräch · 10:00 Uhr",
};

const DIFFICULTIES: DifficultyOption[] = [
  { key: "einsteiger", dot: "bg-green-500", label: "Einsteiger", description: "Markus ist enttäuscht aber offen für Erklärungen." },
  { key: "fortgeschritten", dot: "bg-yellow-400", label: "Fortgeschritten", description: "Markus ist kritisch und erwartet klare Antworten." },
  { key: "challenge", dot: "bg-red-500", label: "Challenge-Niveau", description: "Markus vergleicht mit Konkurrenz und erwägt Portfolio-Abzug." },
];

const OPENINGS: Record<Difficulty, string[]> = {
  einsteiger: [
    "Guten Morgen. Ich bin etwas früh – ich hoffe das ist in Ordnung. Ich wollte das Jahresgespräch nicht verpassen.",
    "Guten Tag. Ich freue mich, dass wir uns heute Zeit nehmen. Ich hätte ein paar Fragen zu meinem Portfolio.",
  ],
  fortgeschritten: [
    "Guten Morgen. Ich muss ehrlich sagen, ich bin nicht ganz zufrieden mit dem letzten Jahr. Die Performance hat mich überrascht – und nicht positiv.",
    "Guten Tag. Ich schaue mir die Zahlen an und verstehe ehrlich gesagt nicht, wie wir bei dieser Marktlage so abgeschnitten haben. Können Sie mir das erklären?",
    "Guten Morgen. Bevor wir anfangen – ich habe mit einem Bekannten gesprochen. Der war bei einer anderen Bank und hat ganz andere Zahlen gesehen.",
  ],
  challenge: [
    "Guten Morgen. Ich komme direkt zum Punkt: Minus zwei Prozent letztes Jahr. Mein Bekannter hat bei der ZKB sechs Prozent gemacht. Ich erwarte heute eine sehr gute Erklärung.",
    "Guten Tag. Minus zwei Prozent bei einem Portfolio von CHF 280’000 – das sind CHF 5’600 Verlust. Was ist da schiefgelaufen?",
  ],
};

export default function JahresgespraechAnlagePage() {
  return (
    <>
      <Header title="Anlageberatung – Jahresgespräch" subtitle="Markus Steiner · Performance-Review" />
      <Breadcrumb
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Practice" },
          { label: "Privatkundenberater" },
          { label: "Anlageberatung" },
          { label: "Jahresgespräch" },
        ]}
      />
      <PracticeSimulationPage
        apiEndpoint="/api/simulation/practice-chat"
        openings={OPENINGS}
        customer={CUSTOMER}
        difficulties={DIFFICULTIES}
      />
    </>
  );
}
