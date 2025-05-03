import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { SmtpMessage } from "../smtp-message";
import Image from "next/image";

export default async function ForgotPassword() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <form className="flex flex-col w-full max-w-sm mx-auto p-6 rounded-2xl bg-zinc-950 shadow-xl text-white">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white">Restablecer Contraseña</h1>
          <p className="text-sm text-zinc-400 mt-1">
            ¿Ya tienes una cuenta?{" "}
            <Link href="/sign-in" className="text-[#c1ff00] underline hover:text-[#d4ff4a]">
              Inicia sesión
            </Link>
          </p>
        </div>

        <div className="flex flex-col gap-2 mb-6">
          <Label htmlFor="email" className="text-white">Correo electrónico</Label>
          <Input
            name="email"
            placeholder="tu@email.com"
            required
            className="bg-zinc-900 border border-zinc-700 placeholder-zinc-500 text-white focus:border-[#c1ff00] focus:ring-[#c1ff00]"
          />
        </div>

        <button
          type="submit"
          className="bg-zinc-900 border border-lime-400 text-[#c1ff00] font-semibold py-2 rounded-xl hover:bg-lime-300 hover:text-black transition"
        >
          Enviar enlace de recuperación
        </button>
        <div className="mt-4">
        <SmtpMessage />
      </div>
      <div className="items-center">
        <Image
          src="/conecta-logo.svg"
          alt="CONECTA Logo"
          width={180}
          height={50}
          className="h-12 w-auto"
        />
      </div>
      </form>

    </div>
  );
}
