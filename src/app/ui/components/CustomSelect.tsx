import Image from 'next/image';
import React, { InputHTMLAttributes, SelectHTMLAttributes, useState } from 'react'
import Select, { OptionProps } from 'react-select';

interface MySelectProps {
    options: Option[];
    onChange: (selectedOption: Option | null) => void;
    label: string;
    name: string;
    valueOption: any;
}

interface Option {
    value: string;
    label: string;
    img: string;
}


const Option = (props: OptionProps) => {
    const {
        children,
        isSelected,
        innerRef,
        innerProps,
      } = props;
return (
        <div
        className='flex items-center 
        px-2 py-3
        justify-between hover:bg-gray-300 cursor-pointer'
        ref={innerRef}
        {...innerProps}
      >
        {children}
         { isSelected ? (
            <Image src='/tick-circle.svg' alt="tick-circle" width={16} height={16} />
        ) : (
            <Image src='/arrow-right.svg' alt="arrow-right" width={16} height={16} />
        )}
      </div>
    )
}


export const CustomSelect = ({ options, onChange, name, label, valueOption, ...inputProps }: MySelectProps) => {

return (
    <div className='my-8'>
        <div className='flex items-center gap-1.5 '>
            <label className='text-sm font-bold text-blue-900'>{label}</label>
            <Image src='/alertGray.svg' alt="arrow" width={16} height={16} />
        </div>
        <Select
            {...inputProps}
            classNames={{
                control: (state) =>
                `mt-[10px] border border-gray-400 rounded-md px-1 p-2.5 w-full`,
                placeholder: (state) => 'text-gray-500',
            }}
            onChange={onChange}
            options={options}
            defaultValue={options[1]}
            name={name}
            components={{ Option }}
            value={valueOption}
            placeholder='Seleccionar moneda'
            isSearchable
            isClearable
            formatOptionLabel={({ value, label, img}) => {
                
                return (
                <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-2'>
                        <Image src={value ? img : options[1]?.img} alt="img" width={32} height={32} />
                        <div className='flex flex-col'>
                            <p className='text-sm text-blue-900 font-semibold'>{value ? label : options[1]?.label}</p>
                            <p className='text-xs text-gray-500'>{value ? value : options[1]?.value}</p>
                        </div>
                    </div>
                </div>
            )}}
        />
    </div>
);
};