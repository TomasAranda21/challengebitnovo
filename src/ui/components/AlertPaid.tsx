import React from 'react'
import { CustomButton } from './Buttons'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export const AlertPaid = ({error} : {error: boolean}) => {
  const router = useRouter()
  return (
    <div className='h-[90vh] w-full flex p-4 justify-center items-center'>
      <div className='bg-white shadow-md px-4 p-9 md:p-9 w-full md:w-2/3 lg:w-[40%] xl:w-1/3 rounded-2xl flex flex-col justify-center items-center '>
          <Image src={`/${error ? 'error' : 'check'}.png`} width={80} height={80} alt="check" />
          <h2 className='text-blue-900 text-lg font-bold mb-3 mt-5'>{error ? '¡Pago cancelado!' : '¡Pago completado!'}</h2>
          <p className='text-center text-gray-500 mb-7 w-[90%] mx-auto'>Lorem ipsum dolor sit amet consectetur. Laoreet blandit auctor et varius dolor elit facilisi enim. Nulla ut ut eu nunc.</p>
          <CustomButton text="Crear nuevo pago" onClick={() => router.push('/')} />
      </div>
    </div>
  )

}