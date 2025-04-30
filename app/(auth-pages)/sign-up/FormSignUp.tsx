"use client";

import { SignUpSchema } from "@/validations/SignUpSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { signUpAction } from "../../actions";
import { useState } from "react";
import { toast } from "sonner";
import { redirect } from "next/navigation";

type Inputs = {
  email: string;
  password: string;
  confirmPassword: string;
};

export default function FormSignUp() {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<Inputs>({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    resolver: zodResolver(SignUpSchema),
  });

  const onSubmit = form.handleSubmit(async (formData) => {
    setIsLoading(true);
    toast.promise(
      signUpAction(formData).then((result) => {
        if (result.status === "error") {
          setIsLoading(false);
          throw new Error(result.message || "An unexpected error occurred.");
        }

        if (result.path && result.status === "success") {
          setTimeout(() => {
            redirect(result.path);
          }, 1000);
        }
        return result;
      }),
      {
        loading: "Registrando...",
        success: "Registro exitoso",
        error: (error) => error.message || "An unexpected error occurred.",
      }
    );
  });

  return (
    <div className="flex flex-1 items-center justify-center p-8 bg-black">
      <div className="w-full max-w-md space-y-8">
        {/* Título */}
        <h1 className="text-3xl font-bold text-center text-white mb-8">
          REGISTRARSE
        </h1>

        <Form {...form}>
          <form onSubmit={onSubmit} className="space-y-2">
            <FormLabel className="text-sm text-white mb-2">
              Correo electrónico
            </FormLabel>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="ejemplo@conecta.com"
                      {...field}
                      className="bg-transparent border border-gray-600 text-white focus-visible:ring-lime-500"
                    />
                  </FormControl>
                  <FormMessage
                    className="text-red-500 animate-pulse"
                    aria-live="polite"
                  />
                </FormItem>
              )}
            />
            <FormLabel className="text-sm text-white mb-2">
              Contraseña
            </FormLabel>
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
                      className="bg-transparent border border-gray-600 text-white focus-visible:ring-lime-500"
                    />
                  </FormControl>
                  <FormMessage
                    className="text-red-500 animate-pulse"
                    aria-live="polite"
                  />
                </FormItem>
              )}
            />
            <FormLabel className="text-sm text-white mb-2">
              Confirmar contraseña
            </FormLabel>
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
                      className="bg-transparent border border-gray-600 text-white focus-visible:ring-lime-500"
                    />
                  </FormControl>
                  <FormMessage
                    className="text-red-500 animate-pulse"
                    aria-live="polite"
                  />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full bg-lime-500 hover:bg-lime-600 text-black"
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
