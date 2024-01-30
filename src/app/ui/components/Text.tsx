import { TextProps } from '@/app/lib/interfaces/componentsInterfaces'
import React from 'react'

export const Text = ({isBold, text} : TextProps) => {
  return (
    <p className={` text-base text-blue-900 ${isBold && 'font-bold'}`}>{text}</p>
  )
}