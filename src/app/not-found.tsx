import Link from "next/link";
import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Página não encontrada | TechEventos",
};

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-24 text-center space-y-6">
      <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        Ops! Página não encontrada
      </h1>
      <p className="text-gray-600">
        Parece que você seguiu um link inválido ou a página não existe mais.
      </p>
      <Link href="/">
        <Button variant="primary" className="mt-4">
          Voltar para a página inicial
        </Button>
      </Link>
    </div>
  );
}
