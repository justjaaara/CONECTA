import { ArrowUpRight, InfoIcon } from "lucide-react";
import Link from "next/link";

export function SmtpMessage() {
  return (
    <div className="bg-zinc-900 border border-zinc-700 text-white px-5 py-4 rounded-xl flex gap-4 shadow-md">
      <InfoIcon size={18} className="text-[#c1ff00] mt-0.5" />
      <div className="flex flex-col gap-1">
        <small className="text-sm text-zinc-400 leading-snug">
          <strong className="text-white">Nota:</strong> Los correos tienen límite de envío. Habilita un SMTP personalizado para aumentar ese límite.
        </small>
        <Link
          href="https://supabase.com/docs/guides/auth/auth-smtp"
          target="_blank"
          className="text-[#c1ff00] hover:text-lime-300 flex items-center text-sm gap-1 mt-1"
        >
          Saber más <ArrowUpRight size={14} />
        </Link>
      </div>
    </div>
  );
}
