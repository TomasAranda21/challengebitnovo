'use client';

import React, { useEffect, useState } from 'react'
import { CustomInput } from './Inputs'
import { CustomButton } from './Buttons'
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import { createOrderSchema } from '@/app/lib/validateSchema';
import {LoadingScreen} from './LoadingScreen';
import { CardForms } from './CardForms';
import { CustomSelect } from './CustomSelect';
import { ErrorAlert } from './ErrorAlert';
import { createOrder, fetchDataCripto } from '@/app/lib/services/ApiServices';
import { Spinner } from './Spinner';

 interface FormBuyCryptoProps {
  amount: number;
  concept: string;
  crypto: string;
}

interface CryptoOption {
  symbol: string;
  name: string;
  image: string;
}

export const FormBuyCrypto = () => {
  const [dataCrypto, setDataCrypto] = useState([])
  const [selectedOption, setSelectedOption] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()
  
  const { values, handleSubmit, handleChange, isValid, handleReset, setFieldValue, setFormikState } = useFormik({
    initialValues: {
      amount: 0,
      concept: '',
      crypto: {
        value: ''
      }
    },
    onSubmit: values => handleOnPress({ 
      amount: values.amount,
      concept: values.concept,
      crypto: values.crypto.value
    }),
    validationSchema: createOrderSchema
  })

  useEffect(() => {
    const getData = async () => {
      const response = await fetchDataCripto()
      const transformedData = response.map(({symbol, name, image } :  CryptoOption) => ({
        value: symbol,
        label: name,
        img: image,
      }));
      setDataCrypto(response)
      setFieldValue('crypto', transformedData[1])
      setSelectedOption(transformedData)
    }
    getData()
  }, [])

  const handleOnPress = async (values : FormBuyCryptoProps) => {
    setLoading(true)
    const orderInfo : {payment_uri: string, identifier:string, detail:string} = await createOrder(values)

    if(orderInfo.payment_uri) {
      setError('')
      const crypto : {image: string} = dataCrypto.filter((item : CryptoOption) => item.symbol === values.crypto)[0]

      router.push(`/order/${orderInfo.identifier}?img=${encodeURIComponent(crypto.image)}&payment_uri=${encodeURIComponent(orderInfo.payment_uri)}`)
    }else {
      setError(orderInfo.detail)
      setTimeout(() => {
        setError('')
      }, 5000)
    }

    setLoading(false)
  }

  return (
    <CardForms>
        {!dataCrypto || !selectedOption ?
        <div className='h-[488px] justify-center items-center flex'>
          <Spinner size='sm'/>
        </div>
        : <form className="w-full" onReset={handleReset}>
          <h1 className="text-2xl font-bold text-center text-blue-900">
            Crear pago
          </h1>
          
          {error !== '' && <ErrorAlert error={error} />}
          
          <CustomInput type='number' name='amount' onChange={(e) => setFieldValue('amount', e.target.value.replace(/^0(?=\d)/, '0.'))} value={values.amount} label="Importe a pagar" placeholder="Añade importe a pagar" />

          <CustomSelect
          name='crypto'
          options={selectedOption ? selectedOption : []}
          valueOption={values.crypto} 
          label='Seleccionar moneda' 
          onChange={(e) => setFieldValue('crypto', e)}
          />

          <CustomInput type='text' name='concept' onChange={handleChange}  value={values.concept} label="Concepto" placeholder="Añade descripción del pago" />
          <CustomButton text="Continuar" loading={loading} disabled={!isValid} onClick={handleSubmit} />
        </form> }
    </CardForms>
  )
}
