// app/(auth-pages)/complete-profile/page.tsx
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import CompleteProfileForm from "./CompleteProfileForm";

export default async function CompleteProfile() {
  const supabase = await createClient();

  // Verificar que el usuario está autenticado
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const user = session?.user;

  // Si no hay usuario, redireccionar a sign-in
  if (!user) {
    return redirect("/sign-in");
  }

  // También podemos verificar si el perfil ya existe
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  // Si ya tiene perfil completo, redireccionar al dashboard
  if (profile) {
    return redirect("/protected/dashboard");
  }

  return (
    <div className="flex min-h-screen bg-black w-full">
      <CompleteProfileForm user={user} />;
    </div>
  );
}
