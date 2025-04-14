import { z } from 'zod';

export const eventRegistrationSchema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().min(10, { message: "Please enter a valid phone number" }),
  attendees: z.number().min(1, { message: "At least 1 attendee is required" }).max(10, { message: "Maximum 10 attendees allowed" }),
  specialRequirements: z.string().optional(),
});

export const chatMessageSchema = z.object({
  content: z.string().min(1, { message: "Message cannot be empty" }).max(500, { message: "Message is too long" }),
});

export type EventRegistrationFormData = z.infer<typeof eventRegistrationSchema>;
export type ChatMessageFormData = z.infer<typeof chatMessageSchema>;