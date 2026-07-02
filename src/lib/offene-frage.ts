export interface OffeneFrageCase {
  type: "offene-frage";
  id: string;
  level: 1 | 2 | 3;
  briefing: string;
  question: string;
  role: string;
  expectedApproach: string;
  concepts?: string[];
}

export interface OffeneFrageEvalResult {
  ergebnis: "Richtig" | "Teilweise richtig" | "Nicht richtig";
  feedback: string;
  korrektes_vorgehen: string;
  merksatz: string;
}
