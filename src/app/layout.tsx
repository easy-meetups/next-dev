import { Inter } from "next/font/google";
import type { Metadata } from "next";
import { UserProvider } from "@/context/UserContext";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Plataforma de Registro de Eventos",
  description:
    "Registre-se para eventos futuros e converse com outros participantes",
  icons: [{ rel: "icon", url: "/favicon.svg", type: "image/svg+xml" }],
};

export default function RootLayout({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <UserProvider>
          <div className="flex h-screen overflow-hidden">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-y-auto dark:bg-[#0F1324]">
              <Header />
              <main>{children}</main>
              <Footer />
            </div>
          </div>
        </UserProvider>
      </body>
    </html>
  );
}
