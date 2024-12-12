import React from 'react'
import { Spinner } from './Spinner'

export const LoadingScreen = () => {
  return (
    <div className='h-screen flex items-center justify-center'>
        <Spinner size='xl'/>
    </div>
  )
}