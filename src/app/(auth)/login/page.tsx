'use client'

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { useUser } from '@/context/UserContext';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

const loginSchema = z.object({
  email: z.string().email('E-mail inválido'),
  password: z.string().min(6, 'Mínimo de 6 caracteres'),
});

type LoginData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const { login, isLoading, user } = useUser();
  const router = useRouter();

  const {
    register: formRegister,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginData>({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (data: LoginData) => {
    try {
      await login(data.email, data.password);
      router.push('/');
    } catch (err) {
      console.error('Login failed', err);
    }
  };

  if (isLoading) return null;
  if (user) {
    router.push('/');
    return null;
  }

  return (
    <div className="container mx-auto max-w-md py-12">
      <h1 className="text-2xl font-bold mb-6 text-center">Entrar</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
          Entrar
        </Button>
      </form>
    </div>
  );
}
