export interface LückentextCase {
  type: "lückentext";
  id: string;
  level: number;
  briefing?: string;
  question: string;   // sentence with ___ marking the blank
  answer: string;     // correct answer as string (e.g. "36", "100000", "21")
  unit?: string;      // optional unit hint next to the input (e.g. "Monate")
  tolerance?: number; // allowed numerical deviation
  feedback: string;
  concepts?: string[];
}

export function checkLückentextAnswer(
  studentInput: string,
  correctAnswer: string,
  tolerance = 0
): boolean {
  const normalize = (s: string) =>
    s.replace(/['''\s]/g, "").replace(/CHF/gi, "").replace(/%/g, "").trim().toLowerCase();

  const n = normalize(studentInput);
  const c = normalize(correctAnswer);

  if (n === c) return true;

  const nNum = parseFloat(n.replace(",", "."));
  const cNum = parseFloat(c.replace(",", "."));
  if (!isNaN(nNum) && !isNaN(cNum)) {
    return Math.abs(nNum - cNum) <= Math.max(tolerance, 0.01);
  }

  return false;
}
