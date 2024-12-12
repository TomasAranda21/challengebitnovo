import React from 'react'

export const ErrorAlert = ({error} : {error:string}) => {
  return (
    <h3 className='text-red-500 text-center p-2 bg-red-100 mt-3 -mb-1.5 rounded border-red-500 border'>{error}</h3>
  )
}