import Image from 'next/image'
import React from 'react'

export const Footer = () => {
  return (
    <footer className='text-center flex items-center justify-center pb-10 mt-5 lg:mt-0'>
      <Image src='/imageFooter.png' className='px-4' width={164} height={26} alt="imageFooter" />
      <p className='text-sm text-gray-400 border-gray-400 border-l-[1.4px] px-4'>© 2022 Bitnovo. All rights reserved.</p>
    </footer>
  )
}