// app/(auth-pages)/email-verification/page.tsx
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import { hasProfile, isLoggedIn } from "@/app/actions";
import { redirect } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default async function EmailVerificationPage() {
  const { status, user } = await isLoggedIn();

  if (status && user) {
    const profileExists = await hasProfile(user);
    if (profileExists.status) {
      // Si ya tiene perfil, redireccionar a la página de dashboard
      redirect("/protected/dashboard");
    } else {
      // Si no tiene perfil, redireccionar a la página de completar perfil
      redirect("/complete-profile");
    }
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

        <h1 className="text-3xl font-bold text-white">Verifica tu correo  </h1>

        <p className="text-white/70 mb-6">
          Hemos enviado un enlace de verificación a tu correo electrónico. Por
          favor, revisa tu bandeja de entrada y haz clic en el enlace para
          activar tu cuenta.
        </p>

        <div className="bg-black/30 p-4 rounded-lg border border-lime-500/60 text-sm text-white/60">
          <p>
            Si no recibes el correo en unos minutos, revisa tu carpeta de spam o
            correo no deseado.
          </p>
        </div>
        <Link href="/" className="inline-block">
          <Button
            variant="outline"
            className="mt-6 bg-[#0D0E0A] border border-lime-500 hover:bg-lime-600 hover:text-black text-lime-500 inline-flex items-center"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Regresar
          </Button>
        </Link>
      </div>
    </div>
  );
}
