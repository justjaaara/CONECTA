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
    <div className="min-h-screen bg-black flex flex-col md:flex-row items-center justify-center p-6 md:p-8 lg:p-16">
      {/* Parte izquierda (Logo y Mensaje) */}
      <div className="flex flex-col items-center justify-center md:w-1/2 mb-8 md:mb-0 md:mr-8 lg:mr-16">
        <div className="relative">
        <Image
            src="/conecta-logo.svg"
            alt="Conecta Logo"
            width={500}
            height={500}
            priority
            className="relative z-10"
          />       
          <div className="absolute -inset-4 md:-inset-6 lg:-inset-10 bg-lime-500/20 blur-[50px] md:blur-[100px] rounded-full z-0"></div>
        </div>
        {/* Mensaje más bonito y responsivo */}
        <p className="mt-6 text-center text-lime-400 tracking-[0.15em] md:tracking-[0.2em] lg:tracking-[0.3em] text-xl md:text-2xl lg:text-3xl leading-relaxed">
          RECONECTA <br className="block md:hidden" /> CON EL MUNDO
        </p>
      </div>
      

      {/* Parte derecha (Formulario de Inicio de Sesión) */}
      <div className="md:w-1/2 max-w-md">
        <FormSignIn />
      </div>
    </div>
  );
}
