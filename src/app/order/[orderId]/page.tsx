// 'use client';

// import React, { useEffect, useState } from 'react'
// import { DataOrderProps } from '@/app/lib/interfaces/cryptoInterfaces';
// import { getOrdersId } from '@/app/lib/services/ApiServices';
// import { tranferMetaMask } from '@/app/lib/services/web3Sevices';
// import { AlertPaid } from '@/app/ui/components/AlertPaid';
// import { ButtonSelectPay } from '@/app/ui/components/Buttons';
// import { CopyToClipboardButton } from '@/app/ui/components/CopyToClipboardButton';
// import CountdownTimer from '@/app/ui/components/CountdownTimer';
// import { ErrorAlert } from '@/app/ui/components/ErrorAlert';
// import { LoadingScreen } from '@/app/ui/components/LoadingScreen';
// import { Text } from '@/app/ui/components/Text';
// import { differenceInSeconds, format, parseISO, set } from 'date-fns';
// import Image from 'next/image';
// import Link from 'next/link';
// import { useSearchParams } from 'next/navigation';
// import QRCode from 'qrcode.react';


// const Page = ({ params }: { params: { orderId: string } }) => {
//     const [dataOrder, setDataOrder] = useState<DataOrderProps | null>(null)
//     const [value, setValue] = useState<string>('qr')
//     const [refresh, setRefresh] = useState(false);
//     const [isTimeOut, setIsTimeOut] = useState(false)
//     const [error, setError] = useState('');
//     const searchParams = useSearchParams()
//     const qrData = searchParams.get('payment_uri')
//     const imgCrypto = searchParams.get('img')

//     useEffect(() => {
//         const getData = async () => {
//             const data = await getOrdersId(params.orderId)
//             setDataOrder(data[0])
//         }
//         getData()
//     }, [params.orderId, refresh])

//     useEffect(() => {
//         try {
//             const socket = new WebSocket(`wss://payments.pre-bnvo.com/ws/${params.orderId}`);

//             // Escuchar cambios de estado
//             socket.addEventListener('message', (event) => {
//                 setRefresh(!refresh)
//             });

//             socket.addEventListener('error', (errorEvent) => {
//                 console.error('WebSocket error:', errorEvent);
//             });

//             // Limpiar el WebSocket cuando se desmonta el componente
//             return () => {
//                 socket.close();
//             };

//         } catch (error) {
//             console.log('===> error socket', error)
//         }
//     }, [params.orderId])


//     const handleSubmit = async (e: { addr: string, ether: string }) => {
//         const data = await tranferMetaMask(e.addr, e.ether)
//         if (data.error) {
//             setError(data.error)
//             setTimeout(() => {
//                 setError('')
//             }, 7000)
//         }
//     };

//     if (!dataOrder) return <LoadingScreen />

//     if (dataOrder?.status === 'CO' || dataOrder?.status === 'AC') return <AlertPaid error={false} />

//     if (dataOrder?.status === 'OC' || dataOrder?.status === 'EX' || isTimeOut) return <AlertPaid error />

//     return (
//         <>
//             <Link className='text-blue-900 w-fit flex items-center gap-2 font-bold m-4 lg:mx-20 mt-8' href='/'>
//                 <Image src='/arrow-left.svg' width={24} height={24} alt="arrow" />
//                 Volver
//             </Link>
//             <div className='flex h-full justify-center lg:mx-20 items-center p-5 lg:p-0'>
//                 <div className='flex lg:flex-row flex-col justify-center w-full gap-9 items-start'>
//                     <div className='mt-5 lg:mt-0 w-full'>
//                         <h2 className='text-blue-900 text-lg mb-5 font-bold '>Resumen del pedido</h2>
//                         <div className='bg-gray-200 rounded-2xl p-4 md:p-9 '>
//                             <div className='flex items-center justify-between py-4 pt-2'>
//                                 <Text isBold text={'Importe:'} />
//                                 <Text isBold text={`${dataOrder?.fiat_amount}${' '}EUR`} />
//                             </div>
//                             <div className='flex items-center justify-between pb-4 pt-8 border-t border-gray-400 '>
//                                 <Text isBold text={'Moneda seleccionada:'} />
//                                 <div className='flex items-center gap-2'>
//                                     {imgCrypto && <Image width={24} height={24} src={imgCrypto} alt="image cripto" />}
//                                     <Text isBold text={dataOrder?.currency_id} />
//                                 </div>
//                             </div>
//                             <div className='flex items-center justify-between py-4 pt-6 border-t border-gray-400 '>
//                                 <Text isBold text={'Comercio:'} />
//                                 <div className='flex items-center text-right w-auto gap-[3px]'>
//                                     <Image width={24} height={24} src='/verify.svg' alt="logo" />
//                                     <Text text={'Comercio de pruebas'} />
//                                 </div>
//                             </div>
//                             <div className='flex items-center justify-between py-4'>
//                                 <Text isBold text={'Fecha:'} />
//                                 {dataOrder?.created_at && <Text text={format(new Date(dataOrder?.created_at), 'dd/MM/yyyy HH:mm')} />}
//                             </div>
//                             <div className='flex items-center px-1 gap-2.5 text-right
//                         pt-6 border-t border-gray-400 justify-between'>
//                                 <Text isBold text={'Concepto:'} />
//                                 <Text text={dataOrder?.notes} />
//                             </div>
//                         </div>
//                     </div>

//                     <div className='w-full overflow-hidden'>
//                         <h2 className='text-blue-900 text-lg mb-5 font-bold '>Realiza el pago</h2>

//                         <div className='bg-white flex flex-col mb-5 gap-8 items-center p-4 sm:p-9 rounded-2xl border border-gray-300 shadow-md w-full'>
//                             <CountdownTimer setIsTimeOut={setIsTimeOut} targetDate={dataOrder?.expired_time} />
//                             <div className='flex items-center gap-2'>
//                                 <ButtonSelectPay isSelect={value === 'qr'} onClick={() => { setValue('qr'), setError('') }} text='Smart QR' />
//                                 <ButtonSelectPay isSelect={value !== 'qr'} onClick={() => setValue('web3')} text='Web3' />
//                             </div>
//                             {value === 'qr' ?
//                                 <div className='rounded-xl flex items-center justify-center bg-white h-[193px] w-[193px] border shadow-md p-2 border-gray-300'>
//                                     {qrData && <QRCode size={140} scale={20} value={qrData as string} />}
//                                 </div>
//                                 :
//                                 <button
//                                     type='button'
//                                     onClick={() => handleSubmit({ addr: dataOrder?.address, ether: dataOrder?.crypto_amount })}
//                                     className=' rounded-xl bg-white h-[193px] w-[193px] border shadow p-2 border-gray-300'>
//                                     <Image className='w-full' src='/metamask.png' width={137} height={43} alt="MetaMask" />
//                                 </button>
//                             }
//                             {error && <ErrorAlert error={error} />}

//                             <div className='flex items-center w-full gap-1 justify-center'>
//                                 <Text text={'Enviar'} />
//                                 <CopyToClipboardButton isBold text={dataOrder?.crypto_amount} span={dataOrder?.currency_id} />
//                             </div>
//                             <div className='w-full sm:w-auto'>
//                                 <CopyToClipboardButton isAddress text={dataOrder?.address} />
//                             </div>
//                             <div className='flex flex-col xs:flex-row items-center gap-1'>
//                                 <div className='flex items-center gap-1'>
//                                     <Image src='/warning.svg' width={24} height={24} alt="warning" />
//                                     <Text text={'Etiqueta de destino: '} />
//                                 </div>
//                                 <CopyToClipboardButton text={'2557164061'} />
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     )
// }

// export default Page


'use client';

import React, { useEffect, useState } from 'react';
import { useOrderQuery } from '@/app/order/hooks/useOrderQuery';
import { usePaymentWebSocket } from '@/app/order/hooks/usePaymentWebSocket';
import { OrderDetails } from '@/app/order/components/OrderDetails';
import { LoadingScreen } from '@/app/ui/components/LoadingScreen';
import { useSearchParams } from 'next/navigation';
import { AlertPaid } from '@/app/ui/components/AlertPaid';
import { tranferMetaMask } from '@/app/lib/services/web3Sevices';

const Page = ({ params }: { params: { orderId: string } }) => {
    const { data: dataOrder, isLoading, refetch, error: errorToGetId } = useOrderQuery(params.orderId);
    const searchParams = useSearchParams()
    const qrData = searchParams.get('payment_uri')
    const [isTimeOut, setIsTimeOut] = useState(false);
    const [error, setError] = useState<string | null>('');
    const imgCrypto = searchParams.get('img')
    usePaymentWebSocket(params.orderId, refetch);

    if (isLoading) return <LoadingScreen />;

    const handlePayment = async (formData: { addr: string; ether: string }) => {
        const data = await tranferMetaMask(formData.addr, formData.ether)
        if (data.error) {
            setError(data.error)
            setTimeout(() => {
                setError('')
            }, 7000)
        }
    };

    if (!dataOrder) return <LoadingScreen />

    if (dataOrder?.status === 'CO' || dataOrder?.status === 'AC') return <AlertPaid error={false} />

    if (dataOrder?.status === 'OC' || dataOrder?.status === 'EX' || isTimeOut) return <AlertPaid error />
    return (
        <div className='h-full'>
            <OrderDetails dataOrder={dataOrder}
            qrData={qrData} 
            setError={setError}
            error={error}
            setIsTimeOut={setIsTimeOut}
            imgCrypto={imgCrypto} 
            handleSubmit={handlePayment} 
            />
        </div>
    );
};

export default Page;
