import { getCurrentSession, signOutAction } from "@/app/actions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, ChevronDown } from "lucide-react";
import Image from "next/image";

export const DasboardHeader = async () => {
  const { status, session, message } = await getCurrentSession();

  const userName = session?.user?.user_metadata?.name || "Usuario";

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
            <a href="#" className="font-medium">
              Resumen
            </a>
            <a href="#" className="text-gray-400">
              Mi Hogar
            </a>
            <a href="#" className="text-gray-400">
              Reportes
            </a>
            <button onClick={signOutAction}>Logout</button>
          </nav>
          <div className="flex items-center space-x-2">
            <div className="text-right mr-2">
              <div className="font-medium">Camila Yepes</div>
              <div className="text-xs text-gray-400">@imcamilee</div>
            </div>
            <Avatar className="h-10 w-10 border border-gray-700 text-black">
              <AvatarImage src="/placeholder.svg?height=40&width=40" alt="@camila" />
              <AvatarFallback>CY</AvatarFallback>
            </Avatar>
            <ChevronDown className="h-4 w-4 text-gray-400" />
          </div>

        </header>
  );
};
