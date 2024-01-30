import { CopyToClipboardButtonProps } from '@/app/lib/interfaces/componentsInterfaces';
import Image from 'next/image';
import React, { useRef } from 'react';



export const CopyToClipboardButton = ({text, span, isBold, isAddress} : CopyToClipboardButtonProps) => {
  const textRef = useRef<HTMLParagraphElement | null>(null);

  const handleCopyClick = async () => {
    try {
      if (textRef.current) {
        await navigator.clipboard.writeText(textRef.current.innerText);
      }
    } catch (error) {
      console.error('Error al copiar al portapapeles:', error);
    }
  };

  return (
    <div className={`flex ${isAddress && 'xs:flex-row flex-col w-full sm:w-auto'}  items-center gap-2 `}>
      <div className={`flex text-sm w-full items-center gap-1 ${isBold && 'font-bold'} text-blue-900`}>
        <p className='text-blue-900 break-words w-full text-center' ref={textRef}>{text}</p>
        <p className='text-blue-900'>{span}</p>
      </div>
      <button type='button' className='' onClick={handleCopyClick}>
        <Image src='/copy.svg' width={18} height={18} alt="copy" />
      </button>
    </div>
  );
};



