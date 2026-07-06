export type Mood = "positive" | "neutral" | "negative";
export type Difficulty = "einsteiger" | "fortgeschritten" | "challenge";

export interface ScoreBreakdown {
  professionalism: number;
  bankingKnowledge: number;
  customerOrientation: number;
}

export interface ConversationMessage {
  role: "student" | "thomas";
  content: string;
  mood?: Mood;
  moodReason?: string;
  score?: number;
  scoreBreakdown?: ScoreBreakdown;
  hint?: string;
}

export interface FinalFeedback {
  overallScore: number;
  summary: string;
  strengths: string[];
  improvements: string[];
  wouldOpenAccount: boolean;
  wouldOpenAccountReason: string;
}

export interface ChatApiResponse {
  customerResponse: string;
  mood: Mood;
  moodReason: string;
  score: number;
  scoreBreakdown: ScoreBreakdown;
  hint?: string;
  conversationComplete: boolean;
  finalFeedback: FinalFeedback | null;
}
