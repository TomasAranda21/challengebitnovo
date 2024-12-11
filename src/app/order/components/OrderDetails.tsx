'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import QRCode from 'qrcode.react';
import { format } from 'date-fns';
import { Text } from '@/app/ui/components/Text';
import CountdownTimer from '@/app/ui/components/CountdownTimer';
import { ButtonSelectPay } from '@/app/ui/components/Buttons';
import { ErrorAlert } from '@/app/ui/components/ErrorAlert';
import { CopyToClipboardButton } from '@/app/ui/components/CopyToClipboardButton';
import { OrderDataType } from '@/app/lib/interfaces/cryptoInterfaces';


type Props = {
    dataOrder: OrderDataType;
    qrData: string | null;
    imgCrypto: string | null;
    handleSubmit: (params: { addr: string; ether: string }) => void;
    setIsTimeOut: (value: boolean) => void;
    error: string | null;
    setError: (value: string | null) => void;
};

export const OrderDetails = ({
    dataOrder,
    qrData,
    imgCrypto,
    handleSubmit,
    setIsTimeOut,
    error, 
    setError,
}: Props) => {
    const [value, setValue] = useState<'qr' | 'web3'>('qr');

    return (
        <>
            <Link
                className="text-blue-900 w-fit flex items-center gap-2 font-bold m-4 lg:mx-20 mt-8"
                href="/"
            >
                <Image src="/arrow-left.svg" width={24} height={24} alt="arrow" />
                Volver
            </Link>

            <div className="flex h-full justify-center lg:mx-20 items-center p-5 lg:p-0">
                <div className="flex lg:flex-row flex-col justify-center w-full gap-9 items-start">
                    {/* Resumen del Pedido */}
                    <div className="mt-5 lg:mt-0 w-full">
                        <h2 className="text-blue-900 text-lg mb-5 font-bold">Resumen del pedido</h2>
                        <div className="bg-gray-200 rounded-2xl p-4 md:p-9">
                            <div className="flex items-center justify-between py-4 pt-2">
                                <Text isBold text="Importe:" />
                                <Text isBold text={`${dataOrder.fiat_amount} EUR`} />
                            </div>
                            <div className="flex items-center justify-between pb-4 pt-8 border-t border-gray-400">
                                <Text isBold text="Moneda seleccionada:" />
                                <div className="flex items-center gap-2">
                                    {imgCrypto && (
                                        <Image width={24} height={24} src={imgCrypto} alt="image cripto" />
                                    )}
                                    <Text isBold text={dataOrder.currency_id} />
                                </div>
                            </div>
                            <div className="flex items-center justify-between py-4 pt-6 border-t border-gray-400">
                                <Text isBold text="Comercio:" />
                                <div className="flex items-center text-right w-auto gap-[3px]">
                                    <Image width={24} height={24} src="/verify.svg" alt="logo" />
                                    <Text text="Comercio de pruebas" />
                                </div>
                            </div>
                            <div className="flex items-center justify-between py-4">
                                <Text isBold text="Fecha:" />
                                {dataOrder.created_at && (
                                    <Text text={`${format(new Date(dataOrder.created_at), 'dd/MM/yyyy HH:mm')} hs`} />
                                )}
                            </div>
                            <div className="flex items-center px-1 gap-2.5 text-right pt-6 border-t border-gray-400 justify-between">
                                <Text isBold text="Concepto:" />
                                <Text text={dataOrder.notes} />
                            </div>
                        </div>
                    </div>

                    {/* Opciones de Pago */}
                    <div className="w-full overflow-hidden">
                        <h2 className="text-blue-900 text-lg mb-5 font-bold">Realiza el pago</h2>
                        <div className="bg-white flex flex-col mb-5 gap-8 items-center p-4 sm:p-9 rounded-2xl border border-gray-300 shadow-md w-full">
                            <CountdownTimer setIsTimeOut={setIsTimeOut} targetDate={dataOrder.expired_time} />
                            <div className="flex items-center gap-2">
                                <ButtonSelectPay
                                    isSelect={value === 'qr'}
                                    onClick={() => {
                                        setValue('qr');
                                        setError(null);
                                    }}
                                    text="Smart QR"
                                />
                                <ButtonSelectPay
                                    isSelect={value !== 'qr'}
                                    onClick={() => setValue('web3')}
                                    text="Web3"
                                />
                            </div>
                            {value === 'qr' ? (
                                <div className="rounded-xl flex items-center justify-center bg-white h-[193px] w-[193px] border shadow-md p-2 border-gray-300">
                                    {qrData && <QRCode size={140} value={qrData} />}
                                </div>
                            ) : (
                                <button
                                    type="button"
                                    onClick={() =>
                                        handleSubmit({
                                            addr: dataOrder.address,
                                            ether: dataOrder.crypto_amount.toString(),
                                        })
                                    }
                                    className="rounded-xl bg-white h-[193px] w-[193px] border shadow p-2 border-gray-300"
                                >
                                    <Image
                                        className="w-full"
                                        src="/metamask.png"
                                        width={137}
                                        height={43}
                                        alt="MetaMask"
                                    />
                                </button>
                            )}
                            {error && <ErrorAlert error={error} />}
                            <div className="flex items-center w-full gap-1 justify-center">
                                <Text text="Enviar" />
                                <CopyToClipboardButton
                                    isBold
                                    text={dataOrder?.crypto_amount?.toString()}
                                    span={dataOrder?.currency_id}
                                />
                            </div>
                            <div className="w-full sm:w-auto">
                                <CopyToClipboardButton isAddress text={dataOrder.address} />
                            </div>
                            <div className="flex flex-col xs:flex-row items-center gap-1">
                                <div className="flex items-center gap-1">
                                    <Image src="/warning.svg" width={24} height={24} alt="warning" />
                                    <Text text="Etiqueta de destino: " />
                                </div>
                                <CopyToClipboardButton text="2557164061" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>)
}
