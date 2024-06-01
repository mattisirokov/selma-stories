import { getUser } from "@/server/user/actions";

import Navigation from "@/components/Navigation";
import Link from "next/link";

export default async function Index() {
  const user = await getUser();
  return (
    <div className="flex w-full flex-1 flex-col items-center gap-20">
      <Navigation />
      {user ? (
        <Link
          href="/dashboard"
          className={
            "flex items-center justify-center rounded-md bg-black p-4 text-white"
          }
        >
          Go to dashboard
        </Link>
      ) : (
        <Link
          href="/login"
          className={
            "flex items-center justify-center rounded-md bg-black p-4 text-white"
          }
        >
          Login
        </Link>
      )}
    </div>
  );
}
