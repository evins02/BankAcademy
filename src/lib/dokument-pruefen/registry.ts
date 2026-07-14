import type { DocumentConfig } from "./types";
import { hypothekarantrag } from "./hypothekarantrag";

export const DOKUMENT_REGISTRY: Record<string, DocumentConfig> = {
  hypothekarantrag,
};
