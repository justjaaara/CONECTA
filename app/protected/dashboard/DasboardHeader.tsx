import { getCurrentSession, getProfile, signOutAction } from "@/app/actions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, ChevronDown } from "lucide-react";
import Image from "next/image";

export const DasboardHeader = async () => {
  let userName = "conecta";
  let name = "Conecta";
  let lastName = "";
  let avatar = "/placeholder.svg?height=40&width=40";
  const { status, session } = await getCurrentSession();
  if (status && session) {
    const { profile } = await getProfile(session);
    userName = profile.username;
    name = profile.name;
    lastName = profile.last_name;
    avatar = profile.profile_pic_url;
  }

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
          <div className="font-medium">
            {name} {lastName}
          </div>
          <div className="text-xs text-gray-400">@{userName}</div>
        </div>
        <Avatar className="h-10 w-10 border border-gray-700 text-black">
          <AvatarImage src={avatar} alt="@camila" />
          <AvatarFallback>CY</AvatarFallback>
        </Avatar>
        <ChevronDown className="h-4 w-4 text-gray-400" />
      </div>
    </header>
  );
};
