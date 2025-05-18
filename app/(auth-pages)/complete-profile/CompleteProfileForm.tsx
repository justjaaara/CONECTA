// app/(auth-pages)/complete-profile/CompleteProfileForm.tsx
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { redirect } from "next/navigation";
import { toast } from "sonner";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/client";
import { profileSchema } from "@/validations/CompleteProfileSchema";
import type { User } from "@supabase/supabase-js"; // Importa el tipo User
import { useRouter } from "next/navigation";

// Esquema para validación de datos
type Inputs = {
  profileName: string;
  profileSurname: string;
  profileUsername: string;
  profilePhone: string;
};

export default function CompleteProfileForm({ user }: { user: User }) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const form = useForm<Inputs>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      profileName: "",
      profileSurname: "",
      profileUsername: "",
      profilePhone: "",
    },
  });

  const onSubmit = form.handleSubmit(async (data: Inputs) => {
    try {
      setIsLoading(true);
      const { profileName, profileSurname, profileUsername, profilePhone } =
        data;
      toast.loading("Guardando tu información...", { id: "profile-save" });

      // Insertar en la tabla profiles
      const { error } = await supabase.from("profiles").insert({
        id: user.id, // User ID de auth.users
        name: profileName,
        last_name: profileSurname,
        username: profileUsername,
        phone: profilePhone,
      });
      if (error) {
        toast.dismiss("profile-save");
        toast.error("Error al guardar el perfil", {
          description: error.message,
        });
        setIsLoading(false);
        return;
      }

      toast.dismiss("profile-save");
      toast.success("¡Perfil completado con éxito!");

      // Redireccionar al dashboard
      router.push("/protected/dashboard");
    } catch (error) {
      toast.error("Error inesperado", {
        description: "Hubo un problema al completar tu perfil.",
      });
    } finally {
      setIsLoading(false);
    }
  });

  return (
    <div className="flex flex-1 items-center justify-center p-8 bg-black">
      <div className="w-full max-w-md space-y-8">
        {/* Título */}
        <h1 className="text-3xl font-bold text-center text-white mb-8">
          Completa tu registro
        </h1>

        <Form {...form}>
          <form onSubmit={onSubmit} className="space-y-3">
            <FormField
              control={form.control}
              name="profileUsername"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm text-white">
                  Nombre de usuario
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="conecta123"
                      {...field}
                      className="py-5 bg-[#0D0E0A] backdrop-opacity-10 border-gray-500 text-white focus-visible:ring-lime-700"
                    />
                  </FormControl>
                  <FormMessage
                    className="text-red-500 animate-pulse"
                    aria-live="polite"
                  />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="profileName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm text-white mb-2">Nombre</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="John"
                      {...field}
                      className="py-5 bg-[#0D0E0A] backdrop-opacity-10 border-gray-500 text-white focus-visible:ring-lime-700"
                    />
                  </FormControl>
                  <FormMessage
                    className="text-red-500 animate-pulse"
                    aria-live="polite"
                  />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="profileSurname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm text-white mb-2">Apellido</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Doe"
                      {...field}
                      className="py-5 bg-[#0D0E0A] backdrop-opacity-10 border-gray-500 text-white focus-visible:ring-lime-700"
                    />
                  </FormControl>
                  <FormMessage
                    className="text-red-500 animate-pulse"
                    aria-live="polite"
                  />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="profilePhone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm text-white">Celular</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="3134246478"
                      {...field}
                      className="py-5 bg-[#0D0E0A] backdrop-opacity-10 border-gray-500 text-white focus-visible:ring-lime-700"
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
                  Guardando...
                </>
              ) : (
                "Completar perfil"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
