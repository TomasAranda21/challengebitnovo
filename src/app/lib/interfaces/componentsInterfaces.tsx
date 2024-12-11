import { SelectHTMLAttributes } from 'react';

export interface TextProps {
    isBold?: boolean;
    text: string;
}

export interface CountdownTimerProps {
    targetDate: string;
    setIsTimeOut: (value: boolean) => void;
}


export interface CopyToClipboardButtonProps {
    text: string;
    span?: string;
    isBold?: boolean;
    isAddress?: boolean;
}


export interface SelectOption {
  value: string;
  label: string;
  img: string;
}

export interface MySelectProps {
    options: SelectOption[]; // Las opciones del Select
    onChange: (value: SelectOption | null) => void; // Manejador para el cambio
    name: string; // Nombre del campo
    label: string; // Etiqueta
    valueOption: SelectOption | null; // Valor seleccionado
  }

export interface Option {
    value: string;
    label: string;
    img: string;
}


export interface CustomButtonProps {
    text: string;
    onClick: () => void;
    disabled?: boolean;
    isSelect?: boolean;
    loading?: boolean
}