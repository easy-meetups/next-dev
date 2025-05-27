import { z } from 'zod';

export const eventRegistrationSchema = z.object({
  name: z.string().min(3, { message: "O nome deve ter pelo menos 3 caracteres" }),
  email: z.string().email({ message: "Por favor, insira um endereço de e-mail válido" }),
  phone: z.string().min(10, { message: "Por favor, insira um número de telefone válido" }),
  attendees: z.number().min(1, { message: "É necessário pelo menos 1 participante" }).max(10, { message: "Máximo de 10 participantes permitidos" }),
  specialRequirements: z.string().optional(),
});

export const chatMessageSchema = z.object({
  content: z.string().min(1, { message: "A mensagem não pode ficar vazia" }).max(500, { message: "A mensagem é muito longa" }),
});

export type EventRegistrationFormData = z.infer<typeof eventRegistrationSchema>;
export type ChatMessageFormData = z.infer<typeof chatMessageSchema>;