// import DeployButton from "@/components/deploy-button";
// import { EnvVarWarning } from "@/components/env-var-warning";
// import HeaderAuth from "@/components/header-auth";
// import { ThemeSwitcher } from "@/components/theme-switcher";
// import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import { Geist, Geist_Mono } from "next/font/google";
// import { ThemeProvider } from "next-themes";
// import Link from "next/link";
import "./globals.css";
import { Toaster } from "sonner";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  title: "CONECTA",
  description: "Página web para la optimización de energética en el hogar.",
};

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="w-full ">
        {children}
        <Toaster theme="dark" position="bottom-right" richColors closeButton />
      </body>
    </html>
    // <html lang="en" className={geistSans.className} suppressHydrationWarning>
    //   <body className="bg-background text-foreground">
    //     <ThemeProvider
    //       attribute="class"
    //       defaultTheme="system"
    //       enableSystem
    //       disableTransitionOnChange
    //     >
    //       <main className="min-h-screen flex flex-col items-center">
    //         <div className="flex-1 w-full flex flex-col gap-20 items-center">
    //           <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
    //             <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
    //               <div className="flex gap-5 items-center font-semibold">
    //                 <Link href={"/"}>Next.js Supabase Starter</Link>
    //                 <div className="flex items-center gap-2">
    //                   <DeployButton />
    //                 </div>
    //               </div>
    //               {!hasEnvVars ? <EnvVarWarning /> : <HeaderAuth />}
    //             </div>
    //           </nav>
    //           <div className="flex flex-col gap-20 max-w-5xl p-5">
    //             {children}
    //           </div>

    //           <footer className="w-full flex items-center justify-center border-t mx-auto text-center text-xs gap-8 py-16">
    //             <p>
    //               Powered by{" "}
    //               <a
    //                 href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
    //                 target="_blank"
    //                 className="font-bold hover:underline"
    //                 rel="noreferrer"
    //               >
    //                 Supabase
    //               </a>
    //             </p>
    //             <ThemeSwitcher />
    //           </footer>
    //         </div>
    //       </main>
    //     </ThemeProvider>
    //   </body>
    // </html>
  );
}
