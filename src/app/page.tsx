import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { SignOutButton } from "./components/signout-button";
import Image from "next/image";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/auth/signin");
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 gap-8">
      <h1 className="text-3xl font-bold">Welcome to Modular Widget Builder!</h1>
      <p className="text-lg text-gray-600">You are signed in as <b>{session.user?.email}</b>.</p>
      <SignOutButton />
    </div>
  );
}

