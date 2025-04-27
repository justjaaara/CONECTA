import React from "react";
import Image from "next/image";
import FormSignUp from "./FormSignUp";

export default function SignUp() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-black">
      {/* Parte izquierda */}
      <div className="flex flex-1 items-center justify-center">
        <div className="relative">
          <Image
            src="/file.svg"
            alt="Conecta Logo"
            width={300}
            height={300}
            className="relative z-10"
          />
          <div className="absolute -inset-10 bg-lime-500/20 blur-[100px] rounded-full z-0"></div>
        </div>
      </div>
      {/* Parte derecha */}
      <FormSignUp />
    </div>
  );
}
