import axios from 'axios';

export const getOrdersId = async (orderId: string) => {
  const response = await axios.get(`/api/orders/${orderId}`);
  return response.data;
};