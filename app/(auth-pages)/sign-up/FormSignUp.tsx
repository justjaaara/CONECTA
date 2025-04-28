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

type Inputs = {
  email: string;
  password: string;
};

export default function FormSignUp() {
  const onSubmit = (data: Inputs) => {
    console.log(data);
  };

  const form = useForm<Inputs>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(SignUpSchema),
  });

  return (
    <div className="flex flex-1 items-center justify-center p-8 bg-black">
      <div className="w-full max-w-md space-y-8">
        {/* Título */}
        <h1 className="text-3xl font-bold text-center text-white mb-8">
          REGISTRARSE
        </h1>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
            <Button
              type="submit"
              className="w-full bg-lime-500 hover:bg-lime-600 text-black font-medium"
            >
              Registrarme
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
