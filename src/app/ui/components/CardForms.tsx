import React from 'react'

export const CardForms = ({ children }: {children: JSX.Element}) => {
  return (
    <div className='flex  h-[90vh] justify-center w-full items-center'>
      <div className="shadow-xl w-[95%] h-[580px] md:w-2/3 xl:w-2/5 mx-auto rounded-xl border border-gray-300
    flex items-center p-6 md:p-9 justify-center ">
        {children}
      </div>
    </div>
  )
}

