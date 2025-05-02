import Image from "next/image";
import FormSignIn from "./FormSignIn";
import { isLoggedIn } from "@/app/actions";
import { redirect } from "next/navigation";

export default async function Login() {
  const { status, session } = await isLoggedIn();
  if (status && session) {
    redirect("/protected/dashboard");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-black">
      {/* Parte izquierda */}
      <div className="flex flex-1 items-center justify-center">
        <div className="relative">
          <Image
            src="/conecta-logo.svg"
            alt="Conecta Logo"
            width={600}
            height={600}
            className="relative z-10"
          />
          {/* TODO: ARREGLAR EL  ESTILO DEL MENSAJE */}
          <p className="flex justify-center items-center text-lime-800 tracking-widest">
            R E C O N E C T A C O N E L M U N D O
          </p>
          <div className="absolute -inset-10 bg-lime-500/20 blur-[100px] rounded-full z-0"></div>
        </div>
      </div>
      {/* Parte derecha */}
      <FormSignIn />
    </div>
  );
}
