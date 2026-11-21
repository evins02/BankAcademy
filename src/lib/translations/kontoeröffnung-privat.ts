import type { LangTranslations } from "./utils";
import { KOE_L1_TRANSLATIONS } from "./kontoeröffnung-privat-l1";
import { KOE_L2_TRANSLATIONS } from "./kontoeröffnung-privat-l2";
import { KOE_L3_TRANSLATIONS } from "./kontoeröffnung-privat-l3";

export const KOE_PRIVAT_TRANSLATIONS: LangTranslations = {
  fr: {
    ...KOE_L1_TRANSLATIONS.fr,
    ...KOE_L2_TRANSLATIONS.fr,
    ...KOE_L3_TRANSLATIONS.fr,
  },
  it: {
    ...KOE_L1_TRANSLATIONS.it,
    ...KOE_L2_TRANSLATIONS.it,
    ...KOE_L3_TRANSLATIONS.it,
  },
};
