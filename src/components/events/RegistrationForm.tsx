'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { EventRegistrationFormData, eventRegistrationSchema } from '@/lib/validation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';

interface RegistrationFormProps {
  onSubmit: (data: EventRegistrationFormData) => void;
  isSubmitting: boolean;
}

export function RegistrationForm({ onSubmit, isSubmitting }: RegistrationFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EventRegistrationFormData>({
    resolver: zodResolver(eventRegistrationSchema),
    defaultValues: {
      attendees: 1,
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        label="Full Name"
        placeholder="Enter your full name"
        {...register('name')}
        error={errors.name?.message}
      />
      
      <Input
        label="Email Address"
        type="email"
        placeholder="your.email@example.com"
        {...register('email')}
        error={errors.email?.message}
      />
      
      <Input
        label="Phone Number"
        type="tel"
        placeholder="Your phone number"
        {...register('phone')}
        error={errors.phone?.message}
      />
      
      <Input
        label="Number of Attendees"
        type="number"
        min={1}
        max={10}
        {...register('attendees', { valueAsNumber: true })}
        error={errors.attendees?.message}
      />
      
      <Textarea
        label="Special Requirements (Optional)"
        placeholder="Any dietary restrictions, accessibility needs, or other requirements"
        {...register('specialRequirements')}
        error={errors.specialRequirements?.message}
      />
      
      <Button 
        type="submit" 
        variant="primary" 
        isLoading={isSubmitting} 
        className="w-full"
      >
        Complete Registration
      </Button>
    </form>
  );
}
