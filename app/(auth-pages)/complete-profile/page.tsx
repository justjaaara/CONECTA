// app/(auth-pages)/complete-profile/page.tsx

"use server";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import CompleteProfileForm from "./CompleteProfileForm";
import { isLoggedIn, hasProfile } from "@/app/actions";

export default async function CompleteProfile() {
  const loggedIn = await isLoggedIn();
  console.log("🚀 ~ CompleteProfile ~ loggedIn:", loggedIn.session?.user.id);

  if (!loggedIn.status || !loggedIn.session?.user) {
    // Si no hay sesión, redireccionar a sign-in
    return redirect("/sign-in");
  }
  const profile = await hasProfile(loggedIn.session);
  if (profile.status) {
    // Si ya tiene perfil, redireccionar a la página de dashboard
    return redirect("/protected/dashboard");
  }
  // Si no tiene perfil, continuar con la creación del perfil

  const user = loggedIn.session?.user;

  return (
    <div className="flex min-h-screen bg-black w-full">
      <CompleteProfileForm user={user} />
    </div>
  );
}
