import FormSignUp from "./FormSignUp";
import Image from "next/image";
import { isLoggedIn } from "@/app/actions";
import { redirect } from "next/navigation";

export default async function Signup() {
  const { status, session } = await isLoggedIn();
  if (status && session) {
    redirect("/protected/dashboard");
  }
  return (
    <div className="flex min-h-screen bg-black w-full">
      {/* Parte izquierda - Logo */}
      <div className="flex flex-1 items-center justify-center">
        <div className="relative">
          <Image
            src="/conecta-logo.svg"
            alt="Conecta Logo"
            width={600}
            height={600}
            className="relative z-10"
          />
          <div className="absolute -inset-10 bg-lime-500/20 blur-[100px] rounded-full z-0"></div>
        </div>
      </div>
      {/* Parte derecha - Formulario */}
      <FormSignUp />
    </div>
  );
}
