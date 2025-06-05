'use client'

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { useUser } from '@/context/UserContext';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

const registerSchema = z.object({
  name: z.string().min(2, 'Informe seu nome'),
  email: z.string().email('E-mail inválido'),
  password: z.string().min(6, 'Mínimo de 6 caracteres'),
});

type RegisterData = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const { register: registerUser, isLoading, user } = useUser();
  const router = useRouter();

  const {
    register: formRegister,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterData>({ resolver: zodResolver(registerSchema) });

  const onSubmit = async (data: RegisterData) => {
    try {
      await registerUser(data.email, data.password, data.name);
      router.push('/');
    } catch (err) {
      console.error('Register failed', err);
    }
  };

  if (isLoading) return null;
  if (user) {
    router.push('/');
    return null;
  }

  return (
    <div className="container mx-auto max-w-md py-12">
      <h1 className="text-2xl font-bold mb-6 text-center">Criar Conta</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="Nome"
          {...formRegister('name')}
          error={errors.name?.message}
        />
        <Input
          label="E-mail"
          type="email"
          {...formRegister('email')}
          error={errors.email?.message}
        />
        <Input
          label="Senha"
          type="password"
          {...formRegister('password')}
          error={errors.password?.message}
        />
        <Button type="submit" isLoading={isSubmitting} className="w-full">
          Cadastrar
        </Button>
      </form>
    </div>
  );
}
