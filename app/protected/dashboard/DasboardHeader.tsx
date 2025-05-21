"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronDown, Menu, X } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useState } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOutAction } from "@/app/actions";

// Props para recibir los datos del usuario desde el componente padre
type DashboardHeaderProps = {
  userName: string;
  name: string;
  lastName: string;
  avatar: string;
};

export const DasboardHeader = ({
  userName,
  name,
  lastName,
  avatar,
}: DashboardHeaderProps) => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="flex flex-col border-b border-gray-800 pb-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 h-12 overflow-hidden">
          <Link href="/protected/dashboard">
            <Image
              src="/conecta-logo.svg"
              alt="CONECTA Logo"
              width={220}
              height={60}
              className="h-12 sm:h-16 w-auto"
            />
          </Link>
        </div>

        {/* Botón de menú hamburguesa para móvil */}
        <button
          className="md:hidden text-gray-400 hover:text-white p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Menú de navegación para desktop */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link
            href="/protected/dashboard"
            className={`transition-colors ${
              pathname === "/protected/dashboard"
                ? "text-lime-500 font-medium"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Resumen
          </Link>
          <Link
            href="/protected/home"
            className={`transition-colors ${
              pathname === "/protected/home"
                ? "text-lime-500 font-medium"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Mi Hogar
          </Link>
          <Link
            href="/protected/reports"
            className={`transition-colors ${
              pathname === "/protected/reports"
                ? "text-lime-500 font-medium"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Reportes
          </Link>
        </nav>

        {/* Perfil de usuario (visible en todas las pantallas) */}
        <div className="flex items-center space-x-2">
          <div className="text-right mr-2 hidden sm:block">
            <div className="font-medium">
              {name} {lastName}
            </div>
            <div className="text-xs text-gray-400">@{userName}</div>
          </div>
          <div className="flex justify-center">
            <Avatar className="h-8 w-8 sm:h-10 sm:w-10 border border-gray-700 text-black">
              <AvatarImage src={avatar} alt={name} />
              <AvatarFallback>
                {(name?.substring(0, 1) || "C") + (lastName?.substring(0, 1) || "")}
              </AvatarFallback>
            </Avatar>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <ChevronDown className="h-5 w-4 text-gray-400" />
            </DropdownMenuTrigger>

            <DropdownMenuContent className="border border-lime-500 bg-black text-white">
              <DropdownMenuLabel>Mi cuenta</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Perfil</DropdownMenuItem>
              <DropdownMenuItem asChild>
                <button className="w-full text-left" onClick={signOutAction}>
                    Cerrar sesión
                </button>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <button className="w-full text-left">
                <Link href="/protected/subscription">Suscripción</Link>
                </button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Menú móvil desplegable */}
      {mobileMenuOpen && (
        <nav className="md:hidden mt-4 space-y-3 bg-gray-900/80 p-4 rounded-lg animate-in slide-in-from-top duration-300">
          <Link
            href="/protected/dashboard"
            className={`block py-2 px-3 rounded-md ${
              pathname === "/protected/dashboard"
                ? "bg-lime-500/20 text-lime-500 font-medium"
                : "text-gray-300 hover:bg-gray-800"
            }`}
            onClick={() => setMobileMenuOpen(false)}
          >
            Resumen
          </Link>
          <Link
            href="/protected/home"
            className={`block py-2 px-3 rounded-md ${
              pathname === "/protected/home"
                ? "bg-lime-500/20 text-lime-500 font-medium"
                : "text-gray-300 hover:bg-gray-800"
            }`}
            onClick={() => setMobileMenuOpen(false)}
          >
            Mi Hogar
          </Link>
          <Link
            href="/protected/reports"
            className={`block py-2 px-3 rounded-md ${
              pathname === "/protected/reports"
                ? "bg-lime-500/20 text-lime-500 font-medium"
                : "text-gray-300 hover:bg-gray-800"
            }`}
            onClick={() => setMobileMenuOpen(false)}
          >
            Reportes
          </Link>
          <div className="border-t border-gray-700 pt-3 mt-3">
            <Link
              href="/protected/subscription"
              className="block py-2 px-3 rounded-md text-gray-300 hover:bg-gray-800"
              onClick={() => setMobileMenuOpen(false)}
            >
              Suscripción
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
};
