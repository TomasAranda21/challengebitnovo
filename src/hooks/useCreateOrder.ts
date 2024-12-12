import { useMutation } from '@tanstack/react-query';
import { createOrder, CreateOrderResponse } from '@/lib/services/ApiServices';
import { FormBuyCryptoProps } from '@/lib/interfaces/cryptoInterfaces';

export const useCreateOrder = () => {
    return useMutation<CreateOrderResponse, Error, FormBuyCryptoProps>({
      mutationFn: async (data: FormBuyCryptoProps) => await createOrder(data),
    });
};