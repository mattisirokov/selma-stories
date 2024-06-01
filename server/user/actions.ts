"use server";

import { createClient } from "@/utils/supabase/server";
import { AuthenticatedUser } from "@/types";

// function to get authenticated user object from supabase

export async function getUser(): Promise<AuthenticatedUser | null> {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
}
