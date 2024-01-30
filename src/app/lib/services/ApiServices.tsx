import { FormBuyCryptoProps } from "../interfaces/cryptoInterfaces";

const headers = {
    'Authorization': `Bearer ${process.env.TOKEN}`,
    'X-Device-Id': process.env.TOKEN || 'test',
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

export const createOrder = async (data : FormBuyCryptoProps) => {
    try {
        const formData = new FormData();
        formData.append('expected_output_amount', data.amount.toString());
        formData.append('input_currency', data.crypto);
        formData.append('notes', data.concept);

        const post = await fetch('https://payments.pre-bnvo.com/api/v1/orders/', {
            method: 'POST',
            headers,
            body: formData,
        });
        const orderInfo = await post.json()
    
        return orderInfo;
    } catch (error) {
        console.log('error -->', error)
    }
}


export const getOrdersId = async (id : string) => {
    try {
        const res = await fetch(`https://payments.pre-bnvo.com/api/v1/orders/info/${id}`, {
            method: 'GET',
            headers,
        });
        const data = await res.json()

        return data
    } catch (error) {
        console.log(error)
    }
}