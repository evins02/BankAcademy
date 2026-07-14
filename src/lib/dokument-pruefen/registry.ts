import type { DocumentConfig } from "./types";
import { hypothekarantrag } from "./hypothekarantrag";
import { kontoeroeffnungPrivatkunde } from "./kontoeroeffnung-privatkunde";
import { kontoeroeffnungFirmenkunde } from "./kontoeroeffnung-firmenkunde";

export const DOKUMENT_REGISTRY: Record<string, DocumentConfig> = {
  hypothekarantrag,
  "kontoeroeffnung-privatkunde": kontoeroeffnungPrivatkunde,
  "kontoeroeffnung-firmenkunde": kontoeroeffnungFirmenkunde,
};
