import React from 'react'

export const Spinner = ({size} : {size?: string}) => {
    const xl = `w-[80px] h-[80px] border-[7px]`
    const sm = `w-6 h-6 border-[3px]`

    return (
        <div className="flex-col gap-4 w-full flex items-center justify-center">
            <div className={`${size !== 'xl' ? sm : xl} text-blue-400 text-4xl animate-spin
             border-gray-300 flex items-center justify-center 
             border-t-blue-400 rounded-full`}>
            </div>
        </div>
    )
}