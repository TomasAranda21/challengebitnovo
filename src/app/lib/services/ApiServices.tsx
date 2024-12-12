import { FormBuyCryptoProps, OrderDataType } from "../interfaces/cryptoInterfaces";

const headers = {
    'Authorization': `Bearer ${process.env.NEXT_TOKEN}`,
    'X-Device-Id': process.env.NEXT_TOKEN || 'test',
}

export interface CreateOrderResponse {
    payment_uri: string; 
    identifier: string; 
    detail?: string
}


export const fetchDataCripto = async () => {
    try {
        const res = await fetch('https://payments.pre-bnvo.com/api/v1/currencies', {
            method: 'GET',
            headers,
        });
        const data = await res.json()

        return data
    } catch (error) {
        console.log(error)
    }

}

export const createOrder = async (data: FormBuyCryptoProps): Promise<CreateOrderResponse> => {
    try {
      const formData = new FormData();
      formData.append('expected_output_amount', data.amount.toString());
      formData.append('input_currency', data.crypto);
      formData.append('notes', data.concept);
  
      const response = await fetch('https://payments.pre-bnvo.com/api/v1/orders/', {
        method: 'POST',
        headers,
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error('Error al crear la orden elige otro monto o criptomoneda');
      }
  
      return await response.json();
    } catch (error) {

      console.error('Error creando la orden:', error);
      throw error; // Lanza el error para que React Query lo capture
    }
  };
  

export const getOrdersId = async (id : string): Promise<OrderDataType[] | []> => {
    try {
        const response = await fetch(`https://payments.pre-bnvo.com/api/v1/orders/info/${id}`, {
            headers,
          });
        // console.log('res====> ', response)

        if (!response.ok) {
            throw new Error('Error fetching order');
        }

        return await response.json()
    } catch (error) {
        console.log(error)
        return []
    }
}