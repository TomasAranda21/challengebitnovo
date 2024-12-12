'use client';

import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useFetchCryptoOptions } from '@/hooks/useFetchCryptoOptions';
import { useCreateOrder } from '@/hooks/useCreateOrder';
import { CustomInput } from './Inputs';
import { CustomButton } from './Buttons';
import { CustomSelect, SelectOption } from './CustomSelect';
import { CardForms } from './CardForms';
import { yupResolver } from '@hookform/resolvers/yup'; 
import { Spinner } from './Spinner';
import { ErrorAlert } from './ErrorAlert';
import { createOrderSchema } from '@/validateSchema';
import { validateYupSchema } from 'formik';

type FormData = {
  amount: number;
  concept: string;
  crypto: { value: string; label: string; img: string };
};

export const FormBuyCrypto = () => {
  const router = useRouter();
  const { data: cryptoOptions, isLoading: isLoadingCrypto } = useFetchCryptoOptions();
  const { mutateAsync: createOrder, isPending: isCreatingOrder, error } = useCreateOrder();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid, isDirty },
  } = useForm<FormData>({
    defaultValues: {
      amount: 0,
      concept: '',
      crypto: {},
    },
    mode: 'onChange',
    resolver: yupResolver(createOrderSchema),
  });

   useEffect(() => {
    if (cryptoOptions && cryptoOptions.length > 0) {
      reset({
        amount: 0,
        concept: '',
        crypto: {
          value: cryptoOptions[1].value,
          label: cryptoOptions[1].label,
          img: cryptoOptions[1].img,
        },
      });
    }
  }, [cryptoOptions, reset]);


  const onSubmit = async (values: FormData) => {
    try {
      const orderInfo = await createOrder({
        amount: values.amount,
        concept: values.concept,
        crypto: values.crypto.value,
      });
  
      if (orderInfo.payment_uri) {
        const selectedCrypto = cryptoOptions?.find((item) => item.value === values.crypto.value);
        router.push(
          `/order/${orderInfo.identifier}?img=${encodeURIComponent(
            selectedCrypto?.img || ''
          )}&payment_uri=${encodeURIComponent(orderInfo.payment_uri)}`
        );
      }
    } catch (error) {
      console.error('Error creando la orden:', error);
    }
  };

  return (
   <CardForms> 
     {isLoadingCrypto ?      
       <div className="justify-center items-center flex">
        <Spinner size='sm' />
      </div> : 
        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
        <h1 className="text-2xl font-bold text-center text-blue-900">Crear pago</h1>

        {errors.crypto || error?.message ? <ErrorAlert error={error?.message || "Selecciona una moneda válida."} /> : null}

        <Controller
          name="amount"
          control={control}
          rules={{ required: 'El importe es obligatorio', min: 0.01 }}
          render={({ field }) => (
            <CustomInput
              {...field}
              type="number"
              label="Importe a pagar"
              placeholder="Añade importe a pagar"
            />
          )}
        />

        <Controller
          name="crypto"
          control={control}
          rules={{ required: 'Selecciona una moneda' }}
          render={({ field }) => (
            <CustomSelect
              {...field}
              onChange={(value) => field.onChange(value)}
              valueOption={field.value}
              options={cryptoOptions as SelectOption[]}
              label="Seleccionar moneda"
            />
          )}
        />

        <Controller
          name="concept"
          control={control}
          rules={{ required: 'El concepto es obligatorio' }}
          render={({ field }) => (
            <CustomInput
              {...field}
              type="text"
              label="Concepto"
              placeholder="Añade descripción del pago"
            />
          )}
        />

        <CustomButton
          text="Continuar"
          onClick={handleSubmit(onSubmit)}
          loading={isCreatingOrder}
          disabled={!isValid || !isDirty || isCreatingOrder}
        />
      </form> }
    </CardForms>
  );
};
