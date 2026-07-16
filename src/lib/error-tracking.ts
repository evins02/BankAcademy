export interface TrackingError {
  type: "missed" | "wrong";
  /** doc ID (document-select) or option key (MCQ) */
  documentId: string;
  documentLabel: string;
}

export interface AttemptRecord {
  id: string;
  moduleId: string;
  levelNum: number;
  caseId: string;
  caseTitle: string;
  attempt: 1 | 2;
  timestamp: number;
  score: number;
  correct: boolean;
  errors: TrackingError[];
}

export interface ErrorTrackingStore {
  schemaVersion: 1;
  records: AttemptRecord[];
}

const STORAGE_KEY = "bankinglab:error-tracking";

function loadStore(): ErrorTrackingStore {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { schemaVersion: 1, records: [] };
    return JSON.parse(raw) as ErrorTrackingStore;
  } catch {
    return { schemaVersion: 1, records: [] };
  }
}

function saveStore(store: ErrorTrackingStore): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  } catch {
    // localStorage unavailable (SSR / private browsing with storage blocked)
  }
}

export function addAttemptRecord(record: Omit<AttemptRecord, "id">): void {
  const store = loadStore();
  store.records.push({
    ...record,
    id: `${record.caseId}-a${record.attempt}-${Date.now()}`,
  });
  saveStore(store);
}

export function getAttemptRecords(): AttemptRecord[] {
  return loadStore().records;
}

export interface WeakScenario {
  moduleId: string;
  caseId: string;
  caseTitle: string;
  errorCount: number;
  lastErrorAt: number;
  moduleLabel: string;
  moduleHref: string;
}

export const MODULE_META: Record<string, { label: string; href: string }> = {
  "kontoeröffnung-privat": { label: "Kontoeröffnung", href: "/privatkunde/kontoeröffnung" },
  "banking-operations-kyc": { label: "KYC / GwG", href: "/backoffice/kyc" },
  "banking-operations-blankokredit": { label: "Blankokredit", href: "/backoffice/blankokredit" },
  "backoffice-credit-operations": { label: "Kreditgeschäft", href: "/backoffice/credit-operations" },
  "banking-operations-anlagekunde": { label: "Anlagekunde", href: "/anlagekunde" },
  "privatkunde-zahlungsverkehr": { label: "Zahlungsverkehr", href: "/privatkunde/zahlungsverkehr" },
  "banking-operations-mahnwesen": { label: "Mahnwesen", href: "/backoffice/mahnwesen" },
  "privatkunde-fonds": { label: "Fonds", href: "/privatkunde/fonds" },
};

export function getWeakScenarios(limit = 3): WeakScenario[] {
  const records = getAttemptRecords();
  const map = new Map<string, { moduleId: string; caseId: string; caseTitle: string; errorCount: number; lastErrorAt: number }>();

  for (const r of records) {
    if (r.correct) continue;
    const key = `${r.moduleId}:${r.caseId}`;
    const existing = map.get(key);
    if (existing) {
      existing.errorCount++;
      if (r.timestamp > existing.lastErrorAt) existing.lastErrorAt = r.timestamp;
    } else {
      map.set(key, { moduleId: r.moduleId, caseId: r.caseId, caseTitle: r.caseTitle, errorCount: 1, lastErrorAt: r.timestamp });
    }
  }

  return Array.from(map.values())
    .sort((a, b) => b.errorCount - a.errorCount || b.lastErrorAt - a.lastErrorAt)
    .slice(0, limit)
    .map((s) => ({
      ...s,
      moduleLabel: MODULE_META[s.moduleId]?.label ?? s.moduleId,
      moduleHref: MODULE_META[s.moduleId]?.href ?? "/dashboard",
    }));
}
