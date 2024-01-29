import * as Yup from 'yup';


export const createOrderSchema = Yup.object().shape({
    amount: Yup.number().required('Campo requerido')
    .positive('El importe debe ser mayor a 0'),
    concept: Yup.string().required('Campo requerido').max(100, 'El concepto debe ser menor a 100 caracteres'),
    crypto: Yup.object().shape({}).required('Campo requerido')
  
})
