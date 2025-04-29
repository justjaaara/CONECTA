import { getCurrentSession, signOutAction } from "@/app/actions";
import { createClient } from "@/utils/supabase/server";

export const DasboardHeader = async () => {
  const { status, session, message } = await getCurrentSession();

  return <button onClick={signOutAction}>Logout</button>;
};
