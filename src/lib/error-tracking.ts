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
