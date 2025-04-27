"use client";

import React from "react";
import Link from "next/link";
import { SignInSchema } from "@/validations/SignInSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function FormSignIn() {
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(SignInSchema),
  });

  const onSubmit = (data) => {
    console.log(data);
    // Aquí implementarías la lógica para iniciar sesión
  };

  return (
    <div className="flex flex-1 items-center justify-center p-8">
      <div className="w-full max-w-md space-y-8">
        {/* Botón "Soy Nuevo" */}
        <div className="flex justify-end">
          <Button
            variant="outline"
            className="text-lime-500 border-lime-500 hover:bg-lime-500/10 hover:text-lime-400"
            asChild
          >
            <Link href="/auth/sign-up">Soy Nuevo</Link>
          </Button>
        </div>

        {/* Título */}
        <h1 className="text-3xl font-bold text-center text-white mb-8">
          INICIAR SESIÓN
        </h1>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <p className="text-sm text-white mb-2">
              Ingrese el correo registrado del titular de hogar establecido
            </p>
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
            <p className="text-sm text-white mb-2">Ahora la contraseña</p>
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

            <div className="text-center">
              <Link
                href="/auth/forgot-password"
                className="text-lime-500 hover:underline text-sm"
              >
                Si la olvidaste, haz click Aquí
              </Link>
            </div>

            <Button
              type="submit"
              className="w-full bg-lime-500 hover:bg-lime-600 text-black font-medium"
            >
              Entrar
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
