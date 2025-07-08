import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";
import WidgetBuilderClientWrapper from "./WidgetBuilderClientWrapper";


export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/auth/signin");
  }

  return <WidgetBuilderClientWrapper email={session.user?.email ?? "Unknown"} />;
}
