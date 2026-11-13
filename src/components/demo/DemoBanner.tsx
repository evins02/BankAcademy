"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

interface Props {
  onFeedback?: () => void;
  langPicker?: React.ReactNode;
}

export function DemoBanner({ onFeedback, langPicker }: Props) {
  const { t } = useLanguage();
  const d = t.demo;

  return (
    <div
      style={{
        background: "#fffbeb",
        borderBottom: "1px solid #fde68a",
        padding: "5px 20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
        fontSize: 11,
        fontWeight: 500,
        color: "#92400e",
        flexWrap: "wrap",
        flexShrink: 0,
      }}
    >
      <span
        style={{
          background: "#fbbf24",
          color: "#78350f",
          fontSize: 9,
          fontWeight: 800,
          padding: "2px 7px",
          borderRadius: 50,
          letterSpacing: "0.06em",
          flexShrink: 0,
        }}
      >
        {d.bannerLabel}
      </span>

      <span style={{ color: "#92400e" }}>{d.bannerText}</span>

      <Link
        href="/kontakt"
        style={{ fontWeight: 700, color: "#78350f", textDecoration: "underline", whiteSpace: "nowrap" }}
      >
        {d.bannerLink}
      </Link>

      {onFeedback && (
        <button
          onClick={onFeedback}
          style={{
            padding: "2px 10px",
            borderRadius: 50,
            border: "1px solid #b45309",
            background: "transparent",
            color: "#78350f",
            fontSize: 10,
            fontWeight: 700,
            cursor: "pointer",
            whiteSpace: "nowrap",
          }}
        >
          {d.feedbackBtn}
        </button>
      )}

      {langPicker && (
        <div style={{ marginLeft: "auto" }}>
          {langPicker}
        </div>
      )}
    </div>
  );
}
