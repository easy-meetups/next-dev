'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

const newsletterSchema = z.object({
  email: z.string().email({ message: 'Por favor, digite um e-mail válido' }),
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
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('E-mail para newsletter:', data.email);
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
              <h3 className="text-2xl font-bold mb-4">Receba Atualizações de Novos Eventos</h3>
              <p className="text-blue-100 mb-6">
                Inscreva-se em nossa newsletter e fique por dentro dos melhores eventos e novidades.
              </p>
              
              {subscribed ? (
                <div className="bg-blue-900 text-blue-100 rounded-lg p-4 inline-block">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline-block mr-2 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Obrigado por se inscrever! Em breve você receberá nossas novidades.
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmitNewsletter)} className="flex flex-col sm:flex-row gap-2 max-w-lg mx-auto">
                  <div className="flex-grow">
                    <Input
                      type="email"
                      placeholder="Seu melhor e-mail"
                      className="bg-white text-gray-800 h-12"
                      {...register('email')}
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Coluna 1: Sobre */}
            <div>
              <h4 className="text-xl font-bold mb-4 text-white">Sobre Nós</h4>
              <p className="text-gray-300 mb-4">
                Somos uma plataforma dedicada a conectar pessoas a eventos incríveis. 
                Nossa missão é facilitar a descoberta e participação em experiências únicas.
              </p>
              <div className="flex space-x-4">
                {/* Ícones de redes sociais */}
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
              </div>
            </div>
            
            {/* Coluna 2: Links Rápidos */}
            <div>
              <h4 className="text-xl font-bold mb-4 text-white">Links Rápidos</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-gray-300 hover:text-white transition-colors">
                    Página Inicial
                  </Link>
                </li>
                <li>
                  <Link href="/events" className="text-gray-300 hover:text-white transition-colors">
                    Eventos
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-gray-300 hover:text-white transition-colors">
                    Sobre Nós
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-gray-300 hover:text-white transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-300 hover:text-white transition-colors">
                    Contato
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="text-gray-300 hover:text-white transition-colors">
                    Perguntas Frequentes
                  </Link>
                </li>
              </ul>
            </div>
            
            {/* Coluna 3: Categorias de Eventos */}
            <div>
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
            </div>
            
            {/* Coluna 4: Contato */}
            <div>
              <h4 className="text-xl font-bold mb-4 text-white">Contato</h4>
              <address className="not-italic">
                <div className="flex items-start mb-3">
                  <svg className="h-6 w-6 text-gray-400 mt-1 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <div className="text-gray-300">
                    Av. Paulista, 1000<br />
                    Bela Vista, São Paulo - SP<br />
                    CEP 01310-100
                  </div>
                </div>
                <div className="flex items-center mb-3">
                  <svg className="h-6 w-6 text-gray-400 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="text-gray-300">(11) 3456-7890</span>
                </div>
                <div className="flex items-center">
                  <svg className="h-6 w-6 text-gray-400 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <a href="mailto:contato@eventos.com.br" className="text-gray-300 hover:text-white transition-colors">
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
                &copy; {new Date().getFullYear()} Plataforma de Eventos. Todos os direitos reservados.
              </div>
              <div className="flex space-x-6">
                <Link href="/terms" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Termos de Uso
                </Link>
                <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Política de Privacidade
                </Link>
                <Link href="/cookies" className="text-gray-400 hover:text-white transition-colors text-sm">
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