import { useQuery } from '@tanstack/react-query';
import { fetchDataCripto } from '@/app/lib/services/ApiServices';

export interface Option {
  value: string;
  label: string;
  img?: string;
}

interface FetchCryptoOptions {
  symbol: string;
  name: string;
  image: string;
}

export const useFetchCryptoOptions = () => {
  return useQuery<Option[], Error>({
    queryKey: ['cryptoOptions'], // Clave correctamente definida como parte de un objeto
    queryFn: async () => {
      const data = await fetchDataCripto();
      return data.map(({ symbol, name, image }: FetchCryptoOptions) => ({
        value: symbol,
        label: name,
        img: image,
      }));
    },
  });
};
