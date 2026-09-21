export { de } from "./de";
export { fr } from "./fr";
export { it } from "./it";
export type { de as Translations } from "./de";
import { de } from "./de";
import { fr } from "./fr";
import { it } from "./it";

export type Lang = "de" | "fr" | "it";

export const DICTS = { de, fr, it } satisfies Record<Lang, typeof de>;
