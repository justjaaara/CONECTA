// app/(auth-pages)/email-verification/page.tsx
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import { isLoggedIn } from "@/app/actions";
import { redirect } from "next/navigation";

export default async function EmailVerificationPage() {
  const supabase = await createClient();

  // Verificar si el usuario ya está autenticado (ya verificó el email)
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { status, session } = await isLoggedIn();
  if (status === "success" && session) {
    redirect("/protected/dashboard");
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black p-8">
      <div className="w-full max-w-md space-y-8 text-center">
        <div className="bg-lime-500/20 p-4 rounded-full w-20 h-20 mx-auto flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-lime-500"
          >
            <rect width="20" height="16" x="2" y="4" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
          </svg>
        </div>

        <h1 className="text-3xl font-bold text-white">
          {user ? "¡Email verificado!" : "Verifica tu correo"}
        </h1>

        <p className="text-white/70 mb-6">
          {user
            ? "Tu correo electrónico ha sido verificado correctamente. Ahora puedes completar tu perfil."
            : "Hemos enviado un enlace de verificación a tu correo electrónico. Por favor, revisa tu bandeja de entrada y haz clic en el enlace para activar tu cuenta."}
        </p>

        {!user && (
          <div className="bg-black/30 p-4 rounded-lg border border-lime-500/20 text-sm text-white/60">
            <p>
              Si no recibes el correo en unos minutos, revisa tu carpeta de spam
              o correo no deseado.
            </p>
          </div>
        )}

        <div className="pt-6">
          {user ? (
            <Link href="/complete-profile">
              <Button className="w-full bg-lime-500 hover:bg-lime-600 text-black font-medium">
                Completar mi perfil
              </Button>
            </Link>
          ) : (
            <Link href="/sign-in">
              <Button
                variant="outline"
                className="w-full border-lime-500/50 text-lime-500 hover:bg-lime-500/10 hover:text-lime-400"
              >
                Volver a Iniciar Sesión
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
