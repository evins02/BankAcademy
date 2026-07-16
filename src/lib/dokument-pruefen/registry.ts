import type { DocumentConfig } from "./types";
import { hypothekarantrag } from "./hypothekarantrag";
import { kontoeroeffnungPrivatkunde } from "./kontoeroeffnung-privatkunde";
import { kontoeroeffnungFirmenkunde } from "./kontoeroeffnung-firmenkunde";
import { anlageberatungHuber } from "./anlageberatung-huber";
import { auslandsueberweisungSchmid } from "./auslandsueberweisung-schmid";
import { kreditpruefungBianchi } from "./kreditpruefung-bianchi";

export const DOKUMENT_REGISTRY: Record<string, DocumentConfig> = {
  hypothekarantrag,
  "kontoeroeffnung-privatkunde": kontoeroeffnungPrivatkunde,
  "kontoeroeffnung-firmenkunde": kontoeroeffnungFirmenkunde,
  "anlageberatung-huber": anlageberatungHuber,
  "auslandsueberweisung-schmid": auslandsueberweisungSchmid,
  "kreditpruefung-bianchi": kreditpruefungBianchi,
};
