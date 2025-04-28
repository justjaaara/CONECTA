import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  // The `/auth/callback` route is required for the server-side auth flow implemented
  // by the SSR package. It exchanges an auth code for the user's session.
  // https://supabase.com/docs/guides/auth/server-side/nextjs
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const origin = requestUrl.origin;
  const redirectTo = requestUrl.searchParams.get("redirect_to")?.toString();

  // Obtener el tipo de autenticación (signup, magiclink, etc.)
  const authType = requestUrl.searchParams.get("type");

  if (code) {
    const supabase = await createClient();
    await supabase.auth.exchangeCodeForSession(code);

    // Obtener información sobre el usuario
    const {
      data: { user },
    } = await supabase.auth.getUser();

    // Si el usuario existe y es un signup o no tiene el email confirmado
    if (user) {
      // Si el usuario acaba de registrarse (signup) o el email no está confirmado
      if (authType === "signup" || !user.email_confirmed_at) {
        // Redirigir a la página de confirmación de correo
        return NextResponse.redirect(`${origin}/email-verification`);
      }

      // Si el tipo es recuperación de contraseña
      if (authType === "recovery") {
        return NextResponse.redirect(`${origin}/reset-password`);
      }
    }
  }

  if (redirectTo) {
    return NextResponse.redirect(`${origin}${redirectTo}`);
  }

  // URL por defecto para los usuarios con sesiones existentes
  return NextResponse.redirect(`${origin}/protected/dashboard`);
}
