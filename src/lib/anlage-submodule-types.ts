export type LevelNum = 1 | 2 | 3;
export type OptionKey = "A" | "B" | "C" | "D";

export interface SubmoduleOption {
  key: OptionKey;
  text: string;
}

export interface CalculatorRow {
  label: string;
  value: string;
  type?: "normal" | "total" | "divider";
}

export interface CalculatorSection {
  heading?: string;
  rows: CalculatorRow[];
}

export interface SubmoduleCase {
  id: string;
  level: LevelNum;
  title: string;
  situation: string;
  inputData?: { label: string; value: string }[];
  calculator?: CalculatorSection[];
  question: string;
  options: SubmoduleOption[];
  correct: OptionKey;
  feedback: string;
  warum?: string;
  inDerPraxis?: string;
  merksatz?: string;
  rechtsgrundlage?: string;
}

export interface SubmoduleLevel {
  level: LevelNum;
  label: string;
  badgeVariant: "green" | "orange" | "red";
  cases: SubmoduleCase[];
}
