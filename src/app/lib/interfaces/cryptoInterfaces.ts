export interface FormBuyCryptoProps {
    amount: number;
    concept: string;
    crypto: string;
}

export interface CryptoOption {
    symbol: string;
    name: string;
    image: string;
}

export interface DataOrderProps {
    orderId: string;
    fiat_amount: string;
    currency_id: string;
    status: string;
    created_at: string;
    expired_time: string;
    notes: string;
    address: string;
    crypto_amount: string;
}