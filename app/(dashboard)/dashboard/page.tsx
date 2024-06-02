import { redirect } from "next/navigation";

import { getUser } from "@/server/user/actions";

import Navigation from "@/components/Navigation";
import GenerateStory from "@/components/GenerateStory";
import GenerateImage from "@/components/Story";

export default async function ProtectedPage() {
  const user = await getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="flex w-full flex-1 flex-col items-center gap-20">
      <Navigation />
      Welcome back, {user.email}
      <GenerateImage />
      <GenerateStory />
    </div>
  );
}
