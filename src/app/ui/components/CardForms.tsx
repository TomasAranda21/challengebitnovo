import React from 'react'

export const CardForms = ({ children }: {children: JSX.Element}) => {
  return (
    <div className='flex h-[90vh] justify-center w-full items-center'>
      <div className="shadow-xl w-[90%] md:w-2/3 xl:w-2/5 mx-auto rounded-xl border border-gray-300
    flex items-center p-9 justify-center ">
        {children}
      </div>
    </div>
  )
}

