'use client';

import { QueryClient } from '@tanstack/react-query';
import { QueryClientProvider } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2, // Reintenta dos veces si la consulta falla
      refetchOnWindowFocus: false, // No refetch automáticamente al enfocar la ventana
    },
  },
});

export const ReactQueryClient = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
)
