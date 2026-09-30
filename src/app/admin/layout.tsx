import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const { userId } = await auth();
  if (!userId) redirect("/");

  const user = await currentUser();
  const adminEmail = process.env.ADMIN_EMAIL ?? "evins@bankacademy.ch";
  const isAdmin = user?.emailAddresses.some((e) => e.emailAddress === adminEmail);
  if (!isAdmin) redirect("/");

  return <>{children}</>;
}
