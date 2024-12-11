import { useEffect } from 'react';

export const usePaymentWebSocket = (orderId: string, onRefresh: () => void) => {

    useEffect(() => {
    const socket = new WebSocket(`wss://payments.pre-bnvo.com/ws/${orderId}`);
    socket.addEventListener('message', onRefresh);
    socket.addEventListener('error', (errorEvent) => {
      console.error('WebSocket error:', errorEvent);
    });

    return () => socket.close();
  }, [orderId, onRefresh]);
};
