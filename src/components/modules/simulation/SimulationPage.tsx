"use client";

import { useState } from "react";
import { BriefingScreen } from "./BriefingScreen";
import { VideoCallUI, type Mood, type ResponseOption } from "./VideoCallUI";

type View = "briefing" | "call";

const PLACEHOLDER_OPTIONS: ResponseOption[] = [
  { key: "A", text: "Guten Tag! Was kann ich für Sie tun?" },
  {
    key: "B",
    text: "Guten Tag Herr Kowalski, schön Sie kennenzulernen. Ich helfe Ihnen gerne bei der Kontoeröffnung.",
  },
  { key: "C", text: "Haben Sie alle Unterlagen dabei?" },
  { key: "D", text: "Das geht schnell, kein Problem." },
];

export function SimulationPage() {
  const [view, setView] = useState<View>("briefing");
  const [mood] = useState<Mood>("neutral");

  if (view === "briefing") {
    return <BriefingScreen onStart={() => setView("call")} />;
  }

  return (
    <VideoCallUI
      customerSpeech="Guten Tag. Ich möchte ein Konto eröffnen. Können wir das schnell machen?"
      options={PLACEHOLDER_OPTIONS}
      mood={mood}
      onSelectOption={(key) => console.log("Selected:", key)}
      onEndCall={() => setView("briefing")}
    />
  );
}
