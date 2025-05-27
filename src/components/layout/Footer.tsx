"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import {
  FaSquareXTwitter,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaDiscord,
} from "react-icons/fa6";

const newsletterSchema = z.object({
  email: z.string().email({ message: "Por favor, digite um e-mail válido" }),
});

type NewsletterFormData = z.infer<typeof newsletterSchema>;

export function Footer() {
  const [subscribed, setSubscribed] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<NewsletterFormData>({
    resolver: zodResolver(newsletterSchema),
  });

  const onSubmitNewsletter = async (data: NewsletterFormData) => {
    // Simulação de envio para API
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("E-mail para newsletter:", data.email);
    setSubscribed(true);
    reset();
    // Em uma aplicação real, você enviaria isso para seu backend
  };

  return (
    <footer className="relative mt-16">
      {/* Gradiente decorativo superior */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>

      {/* Container principal do footer */}
      <div className="bg-gray-900 text-white">
        {/* Seção de Newsletter */}
        <div className="bg-blue-700 py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h3 className="text-2xl font-bold mb-4">
                Receba Atualizações de Novos Eventos
              </h3>
              <p className="text-blue-100 mb-6">
                Inscreva-se em nossa newsletter e fique por dentro dos melhores
                eventos e novidades.
              </p>

              {subscribed ? (
                <div className="bg-blue-900 text-blue-100 rounded-lg p-4 inline-block">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 inline-block mr-2 text-blue-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Obrigado por se inscrever! Em breve você receberá nossas
                  novidades.
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit(onSubmitNewsletter)}
                  className="flex flex-col sm:flex-row gap-2 max-w-lg mx-auto"
                >
                  <div className="flex-grow">
                    <Input
                      type="email"
                      placeholder="Seu melhor e-mail"
                      className="bg-white text-gray-800 h-12"
                      {...register("email")}
                      error={errors.email?.message}
                    />
                  </div>
                  <Button
                    type="submit"
                    variant="primary"
                    isLoading={isSubmitting}
                    className="h-12 sm:w-auto px-6 bg-blue-900 hover:bg-blue-800"
                  >
                    Inscrever-se
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Conteúdo principal do footer */}
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Coluna 1: Sobre */}
            <div>
              <h4 className="text-xl font-bold mb-4 text-white">Sobre Nós</h4>
              <p className="text-gray-300 mb-4">
                Somos uma plataforma dedicada a conectar pessoas a eventos
                incríveis. Nossa missão é facilitar a descoberta e participação
                em experiências únicas.
              </p>
              <div className="flex space-x-4 text-gray-300 hover:text-white transition-colors">
                {/* Ícones de redes sociais */}
                <a
                  href="https://www.linkedin.com/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FaLinkedin className="h-6 w-6" />
                </a>
                <a href="https://x.com/" target="_blank" rel="noreferrer">
                  <FaSquareXTwitter className="h-6 w-6" />
                </a>
                <a
                  href="https://www.facebook.com/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FaFacebook className="h-6 w-6" />
                </a>
                <a
                  href="https://www.instagram.com/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FaInstagram className="h-6 w-6" />
                </a>
                <a
                  href="https://www.discord.gg/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FaDiscord className="h-6 w-6" />
                </a>
              </div>
            </div>

            {/* Coluna 2: Links Rápidos */}
            <div>
              <h4 className="text-xl font-bold mb-4 text-white">
                Links Rápidos
              </h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Página Inicial
                  </Link>
                </li>
                <li>
                  <Link
                    href="/events"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Eventos
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Sobre Nós
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Contato
                  </Link>
                </li>
                <li>
                  <Link
                    href="/faq"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Perguntas Frequentes
                  </Link>
                </li>
              </ul>
            </div>

            {/* Coluna 3: Categorias de Eventos */}
            {/* <div>
              <h4 className="text-xl font-bold mb-4 text-white">Categorias</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/events/category/tech" className="text-gray-300 hover:text-white transition-colors">
                    Tecnologia
                  </Link>
                </li>
                <li>
                  <Link href="/events/category/business" className="text-gray-300 hover:text-white transition-colors">
                    Negócios
                  </Link>
                </li>
                <li>
                  <Link href="/events/category/entertainment" className="text-gray-300 hover:text-white transition-colors">
                    Entretenimento
                  </Link>
                </li>
                <li>
                  <Link href="/events/category/education" className="text-gray-300 hover:text-white transition-colors">
                    Educação
                  </Link>
                </li>
                <li>
                  <Link href="/events/category/health" className="text-gray-300 hover:text-white transition-colors">
                    Saúde & Bem-estar
                  </Link>
                </li>
                <li>
                  <Link href="/events/category/sports" className="text-gray-300 hover:text-white transition-colors">
                    Esportes
                  </Link>
                </li>
              </ul>
            </div> */}

            {/* Coluna 4: Contato */}
            <div>
              <h4 className="text-xl font-bold mb-4 text-white">Contato</h4>
              <address className="not-italic">
                <div className="flex items-start mb-3">
                  <svg
                    className="h-6 w-6 text-gray-400 mt-1 mr-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <div className="text-gray-300">
                    Av. Paulista, 1000
                    <br />
                    Bela Vista, São Paulo - SP
                    <br />
                    CEP 01310-100
                  </div>
                </div>
                <div className="flex items-center mb-3">
                  <svg
                    className="h-6 w-6 text-gray-400 mr-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <span className="text-gray-300">(11) 3456-7890</span>
                </div>
                <div className="flex items-center">
                  <svg
                    className="h-6 w-6 text-gray-400 mr-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <a
                    href="mailto:contato@eventos.com.br"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    contato@eventos.com.br
                  </a>
                </div>
              </address>
            </div>
          </div>
        </div>

        {/* Barra de direitos autorais */}
        <div className="bg-gray-950 py-6">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="text-gray-400 mb-4 md:mb-0 text-center md:text-left">
                &copy; {new Date().getFullYear()} Plataforma de Eventos. Todos
                os direitos reservados.
              </div>
              <div className="flex space-x-6">
                <Link
                  href="/terms"
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  Termos de Uso
                </Link>
                <Link
                  href="/privacy"
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  Política de Privacidade
                </Link>
                <Link
                  href="/cookies"
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  Cookies
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
