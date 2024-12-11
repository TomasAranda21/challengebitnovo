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

export type OrderDataType = {
    identifier: string;
    reference: string | null;
    created_at: string; // ISO date string
    edited_at: string; // ISO date string
    status: "PE" | "CO" | "AC" | "EX" | "OC"; // Puedes ajustar según los posibles valores
    fiat_amount: number;
    crypto_amount: number;
    unconfirmed_amount: number;
    confirmed_amount: number;
    currency_id: string;
    merchant_device_id: number;
    merchant_device: string;
    address: string;
    tag_memo: string;
    url_ko: string | null;
    url_ok: string | null;
    url_standby: string | null;
    expired_time: string; // ISO date string
    good_fee: boolean;
    notes: string;
    rbf: boolean;
    safe: boolean;
    fiat: string;
    language: string;
    percentage: number;
    received_amount: number;
    balance_based: string;
    internal_data: null; 
    transactions: [];
  };
  