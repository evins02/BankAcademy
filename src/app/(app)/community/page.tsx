import Link from "next/link";
import { MessageSquare } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";

export default function CommunityPage() {
  return (
    <>
      <Header title="Forum" subtitle="Austausch mit anderen Lernenden" />
      <div className="flex flex-1 items-center justify-center p-6">
        <div className="max-w-md text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-primary-light">
            <MessageSquare size={36} className="text-primary" />
          </div>
          <h2 className="text-2xl font-bold text-text-primary">Community Forum</h2>
          <p className="mt-3 text-text-secondary">
            Das Community-Forum ist in Entwicklung. Hier wirst du bald Fragen stellen,
            Erfahrungen teilen und mit anderen Banking-Lernenden in Kontakt treten können.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <Button asChild variant="secondary">
              <Link href="/dashboard">Zurück zum Dashboard</Link>
            </Button>
            <Button asChild>
              <Link href="/leaderboard">Leaderboard anschauen</Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
