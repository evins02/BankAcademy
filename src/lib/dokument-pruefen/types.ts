export type BadgeColor = "green" | "amber" | "red";

export interface FieldValue {
  text: string;
  bold?: boolean;
  muted?: boolean;
  badge?: { text: string; color: BadgeColor };
}

export interface FieldDef {
  id: string;
  label: string;
  value: FieldValue;
}

export interface SectionDef {
  title: string;
  fields: FieldDef[];
}

export interface ErrorContext {
  field: string;
  shown: string;
  correct: string;
  type: string;
}

export interface DocumentConfig {
  id: string;
  title: string;
  subtitle: string;
  header: {
    bank: string;
    docType: string;
    docNr: string;
    date: string;
    clerk: string;
    statusBadge?: string;
  };
  sections: SectionDef[];
  actualErrors: string[];
  errorExplanations: Record<string, string>;
  errorContext: Record<string, ErrorContext>;
}
