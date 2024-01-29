import React from 'react'

export const Text = ({isBold, text} : {isBold?: boolean, text: string}) => {
  return (
    <p className={`text-blue-900 ${isBold && 'font-bold'}`}>{text}</p>
  )
}