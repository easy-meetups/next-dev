'use client';

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Input } from "./Input";
import { Button } from "./Button";

const newsletterSchema = z.object({
  email: z.string().email({ message: "Por favor, digite um e-mail válido" }),
});

type NewsletterFormData = z.infer<typeof newsletterSchema>;

export default function NewsletterForm() {
  const [subscribed, setSubscribed] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<NewsletterFormData>({
    resolver: zodResolver(newsletterSchema),
  });

  const onSubmitNewsletter = async (data: NewsletterFormData) => {
    setErrorMessage("");
    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSubscribed(true);
        reset();
      } else {
        const res = await response.json();
        setErrorMessage(res.message || "Erro ao se inscrever.");
      }
    } catch {
      setErrorMessage("Erro de conexão. Tente novamente.");
    }
  };

  return (
    <div className="bg-blue-700 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h3 className="text-2xl font-bold mb-4">
            Receba Atualizações de Novos Eventos
          </h3>
          <p className="text-blue-100 mb-6">
            Inscreva-se em nossa newsletter e fique por dentro dos melhores eventos e novidades.
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

          {errorMessage && <p className="text-red-200 mt-4">{errorMessage}</p>}
        </div>
      </div>
    </div>
  );
}
