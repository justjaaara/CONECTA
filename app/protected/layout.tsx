import { DasboardHeader } from "./dashboard/DasboardHeader";
import { getCurrentSession, getProfile } from "@/app/actions";

export default async function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Obtener datos del usuario
  let userName = "conecta";
  let name = "Conecta";
  let lastName = "";
  let avatar = "/placeholder.svg?height=40&width=40";

  const { status, user } = await getCurrentSession();
  if (status && user) {
    const { profile } = await getProfile(user);
    if (profile) {
      userName = profile.username || "conecta";
      name = profile.name || "Conecta";
      lastName = profile.last_name || "";
      avatar = profile.profile_pic_url || "/placeholder.svg?height=40&width=40";
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-4">
        <DasboardHeader
          userName={userName}
          name={name}
          lastName={lastName}
          avatar={avatar}
        />
        {children}
      </div>
    </div>
  );
}
