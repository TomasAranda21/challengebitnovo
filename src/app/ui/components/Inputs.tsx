import Image from 'next/image';
import React, { InputHTMLAttributes} from 'react'

interface CustomInputProps {
    label?: string;
}


type InputProps = InputHTMLAttributes<HTMLInputElement> & CustomInputProps;


export const CustomInput = ({ label, ...inputProps }: InputProps) => {
    return (
        <div className='my-8'>
            <label className='text-sm font-bold text-blue-900'>{label}</label>
            <input
                className='border placeholder:text-gray-500 border-gray-400 text-blue-900 rounded-md mt-2 px-3 p-4 w-full'
                {...inputProps} />
        </div>
    )
}




