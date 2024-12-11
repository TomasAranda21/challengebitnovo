import React from 'react';
import { useForm } from 'react-hook-form';

type PaymentFormData = {
  addr: string;
  ether: string;
};

export const PaymentForm = ({ onSubmit }: { onSubmit: (data: PaymentFormData) => void }) => {
  const { register, handleSubmit } = useForm<PaymentFormData>();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <input {...register('addr')} placeholder="Dirección" className="input" />
      <input {...register('ether')} placeholder="Cantidad" className="input" />
      <button type="submit" className="btn-primary">Pagar</button>
    </form>
  );
};
