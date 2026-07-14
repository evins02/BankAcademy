import type { DocumentConfig } from "./types";
import { hypothekarantrag } from "./hypothekarantrag";
import { kontoeroeffnungPrivatkunde } from "./kontoeroeffnung-privatkunde";

export const DOKUMENT_REGISTRY: Record<string, DocumentConfig> = {
  hypothekarantrag,
  "kontoeroeffnung-privatkunde": kontoeroeffnungPrivatkunde,
};
