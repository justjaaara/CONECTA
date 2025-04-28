import { FormMessage, Message } from "@/components/form-message";
import FormSignUp from "./FormSignUp";
import Image from "next/image";

export default async function Signup(props: {
  searchParams: Promise<Message>;
}) {
  const searchParams = await props.searchParams;
  if ("message" in searchParams) {
    return (
      <div className="w-full flex-1 flex items-center h-screen sm:max-w-md justify-center gap-2 p-4">
        <FormMessage message={searchParams} />
      </div>
    );
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
