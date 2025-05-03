"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { SignUpSchema } from "@/validations/SignUpSchema";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { signUpAction } from "@/app/actions";
import { useRouter } from "next/navigation";
import Link from "next/link";

type Inputs = {
  email: string;
  password: string;
  confirmPassword: string;
};

export default function FormSignUp() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<Inputs>({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    resolver: zodResolver(SignUpSchema),
  });

  const onSubmit = (formData: Inputs) => {
    setIsLoading(true);
    toast.promise(
      signUpAction(formData).then((result) => {
        if (result.status === "error") {
          setIsLoading(false);
          throw new Error(result.message || "Ocurrió un error inesperado.");
        }

        if (result.path && result.status === "success") {
          router.push(result.path);
        }

        return result;
      }),
      {
        loading: "Registrando...",
        success: "Cuenta creada correctamente",
        error: (error) => error.message || "Error desconocido",
      }
    );
  };

  return (
    <div className="flex flex-1 items-center justify-center p-6 md:p-8 bg-black">
      <div className="w-full max-w-sm md:max-w-md space-y-6 md:space-y-8">
        {/* Botón "Ya tengo cuenta" */}
        <div className="flex justify-end">
          <Button
            variant="outline"
            className="px-6 text-white bg-gradient-to-b from-black to-lime-700 border-gray-500 hover:bg-lime-500/10 hover:text-lime-400 hover:border-lime-500"
            asChild
          >
            <Link href="/sign-in">Ya tengo cuenta</Link>
          </Button>
        </div>

        {/* Título */}
        <h1 className="text-2xl md:text-3xl font-bold text-center text-white mb-4">
          REGISTRARSE
        </h1>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 md:space-y-6">
            <p className="text-sm text-white">Correo electrónico</p>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="ejemplo@conecta.com"
                      {...field}
                      className="py-5 bg-[#0D0E0A] border border-gray-500 text-white focus-visible:ring-lime-700"
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 animate-pulse text-xs md:text-sm" />
                </FormItem>
              )}
            />

            <p className="text-sm text-white">Contraseña</p>
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="••••••••••"
                      {...field}
                      className="py-5 bg-[#0D0E0A] border border-gray-500 text-white focus-visible:ring-lime-700"
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 animate-pulse text-xs md:text-sm" />
                </FormItem>
              )}
            />

            <p className="text-sm text-white">Confirmar contraseña</p>
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="••••••••••"
                      {...field}
                      className="py-5 bg-[#0D0E0A] border border-gray-500 text-white focus-visible:ring-lime-700"
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 animate-pulse text-xs md:text-sm" />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full bg-[#0D0E0A] border border-lime-500 hover:bg-lime-600 hover:text-black text-lime-500 font-medium text-center"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-black"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Registrando...
                </>
              ) : (
                "Registrarse"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
