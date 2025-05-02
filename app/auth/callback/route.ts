// app/auth/callback/route.ts
import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const origin = requestUrl.origin;
  const redirectTo = requestUrl.searchParams.get("redirect_to")?.toString();
  const authType = requestUrl.searchParams.get("type");

  if (code) {
    const supabase = await createClient();
    await supabase.auth.exchangeCodeForSession(code);

    // Obtener información sobre el usuario
    const {
      data: { user },
    } = await supabase.auth.getUser();

    // Si el usuario existe y acaba de confirmar su email
    if (user && (authType === "signup" || authType === "email_confirmation")) {
      // Verificar si el usuario ya tiene un perfil
      let { data: profile, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      // Si no tiene perfil, redireccionar a la página de verificación
      // donde verá el botón para completar su perfil
      if (!profile || error) {
        console.log(error, profile, "ERRORRRRRRRRRRR");
        return NextResponse.redirect(`${origin}/complete-profile`);
      }
      // Si tiene perfil, redireccionar a la página de dashboard
      return NextResponse.redirect(`${origin}/protected/dashboard`);
    }

    // Si el tipo es recuperación de contraseña
    if (authType === "recovery") {
      return NextResponse.redirect(`${origin}/reset-password`);
    }
  }

  if (redirectTo) {
    return NextResponse.redirect(`${origin}${redirectTo}`);
  }

  // URL por defecto para los usuarios con sesiones existentes
  return NextResponse.redirect(`${origin}/protected/dashboard`);
}
