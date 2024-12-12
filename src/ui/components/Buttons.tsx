import React from 'react'
import { Spinner } from './Spinner';
import { CustomButtonProps } from '@/lib/interfaces/componentsInterfaces';

export const CustomButton = ({ text, onClick, disabled, loading }: CustomButtonProps) => {
    return (
        <button
        type='submit'
            disabled={disabled}
            className={`${disabled ? 'bg-blue-300': 'bg-blue-600'} rounded-md 
        text-white font-semibold text-base px-6 py-4 w-full`}
            onClick={onClick}
        >
            {!loading ? text :  <Spinner/>}
           
        </button>
    )
}


export const ButtonSelectPay = ({ text, onClick, disabled, isSelect }: CustomButtonProps) => {
    return (
        <button
            type='button'
            disabled={disabled}
            className={` ${isSelect ? 'bg-blue-600 text-white ' : 'bg-gray-300 text-gray-500'} rounded-full 
        text-base px-4 py-2`}
            onClick={onClick}
        >
            {text}
        </button>
    )
}