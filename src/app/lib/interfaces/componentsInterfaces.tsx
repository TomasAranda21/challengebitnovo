import { DataOrderProps } from "./cryptoInterfaces";

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


export interface MySelectProps {
    options: Option[];
    onChange: (selectedOption: Option | null) => void;
    label: string;
    name: string;
    valueOption: any;
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