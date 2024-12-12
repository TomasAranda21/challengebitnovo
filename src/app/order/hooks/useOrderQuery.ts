import { useQuery } from '@tanstack/react-query';
import { getOrdersId } from '@/lib/services/ApiServices';
import { OrderDataType } from '@/lib/interfaces/cryptoInterfaces';

export const useOrderQuery = (orderId: string) => {
  return useQuery<OrderDataType | undefined, Error>({
    queryKey: ['order', orderId], // Clave de query
    queryFn: async () => {
        const orders = await getOrdersId(orderId); // Obtén el array
        return orders[0]; // Retorna el primer elemento del array
      },
  });
};
