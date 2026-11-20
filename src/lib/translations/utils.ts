import type { Lang } from "@/lib/i18n";

export type ScenarioTranslation = {
  situation?: string;
  question?: string;
  options?: Array<{ key: string; text: string }>;
  feedback?: string;
};

export type TranslationMap = Record<string, ScenarioTranslation>;
export type LangTranslations = Partial<Record<Exclude<Lang, "de">, TranslationMap>>;

export function localizeScenario<T extends { id: string }>(
  scenario: T,
  map: TranslationMap
): T {
  const tr = map[scenario.id];
  if (!tr) return scenario;
  return { ...scenario, ...tr };
}

export function localizeLevels<
  TLevel extends { scenarios: TScenario[] },
  TScenario extends { id: string },
>(
  levels: TLevel[],
  lang: Lang,
  translations: LangTranslations
): TLevel[] {
  if (lang === "de") return levels;
  const map = translations[lang as Exclude<Lang, "de">];
  if (!map) return levels;
  return levels.map((level) => ({
    ...level,
    scenarios: level.scenarios.map((s) => localizeScenario(s, map)),
  }));
}
