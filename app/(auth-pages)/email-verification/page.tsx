"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function EmailVerificationPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black p-8">
      <div className="w-full max-w-md space-y-8 text-center">
        <div className="mb-8">
          <Image
            src="/conecta-logo.svg"
            alt="Conecta Logo"
            width={120}
            height={120}
            className="mx-auto"
          />
        </div>

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

        <h1 className="text-3xl font-bold text-white">Verifica tu Correo</h1>

        <p className="text-white/70 mb-6">
          Hemos enviado un enlace de verificación a tu correo electrónico. Por
          favor, revisa tu bandeja de entrada y haz clic en el enlace para
          activar tu cuenta.
        </p>

        <div className="bg-black/30 p-4 rounded-lg border border-lime-500/20 text-sm text-white/60">
          <p>
            Si no recibes el correo en unos minutos, revisa tu carpeta de spam o
            correo no deseado.
          </p>
        </div>

        <div className="pt-6">
          <Link href="/sign-in">
            <Button
              variant="outline"
              className="w-full border-lime-500/50 text-lime-500 hover:bg-lime-500/10 hover:text-lime-400"
            >
              Volver a Iniciar Sesión
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
