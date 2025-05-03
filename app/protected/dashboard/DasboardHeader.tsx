"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";

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

  return (
    <header className="flex items-center justify-between border-b border-gray-800 pb-4">
      <div className="flex items-center space-x-2">
        <Image
          src="/conecta-logo.svg"
          alt="CONECTA Logo"
          width={180}
          height={50}
          className="h-12 w-auto"
        />
      </div>
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
      <div className="flex items-center space-x-2">
        <div className="text-right mr-2">
          <div className="font-medium">
            {name} {lastName}
          </div>
          <div className="text-xs text-gray-400">@{userName}</div>
        </div>
        <Avatar className="h-10 w-10 border border-gray-700 text-black">
          <AvatarImage src={avatar} alt={name} />
          <AvatarFallback>
            {(name?.substring(0, 1) || "C") + (lastName?.substring(0, 1) || "")}
          </AvatarFallback>
        </Avatar>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <ChevronDown className="h-5 w-4 text-gray-400" />
          </DropdownMenuTrigger>

          <DropdownMenuContent className="border border-lime-500 bg-black text-white">
            <DropdownMenuLabel>Mi cuenta</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Perfil</DropdownMenuItem>
            <DropdownMenuItem>Subscripción</DropdownMenuItem>
            <DropdownMenuItem asChild>
              <button className="w-full text-left" onClick={signOutAction}>
                Cerrar sesión
              </button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};
