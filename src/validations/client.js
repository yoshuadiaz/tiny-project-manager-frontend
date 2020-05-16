import * as Yup from 'yup'

const phoneRegExp = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/ //eslint-disable-line
const uuidV4RegExp = /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i //eslint-disable-line

export const clientValidationSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Debe ser un nombre de mínimo 3 caracteres')
    .required('Requerido'),
  website: Yup.string()
    .url('Dirección con formato inválido')
    .required('Requerido'),
  industry: Yup.string().min(3, 'Muy corto')
    .required('Requerido'),
  description: Yup.string()
    .min(20, 'Se necesita una descripción más larga')
    .max(250, 'Descripción demasiado larga'),
  phone: Yup.string()
    .matches(phoneRegExp, 'Formato de teléfono inválido')
    .required('Requerido'),
  address: Yup.string()
    .min(10, 'Se necesita una dirección más larga')
    .max(150, 'Dirección demasiado larga')
    .required('Requerido'),
  notes: Yup.string()
    .max(350, 'Nota demasiado larga')
})

export const contactValidationSchema = Yup.object().shape({
  first_name: Yup.string()
    .min(3, 'Debe ser un nombre de mínimo 3 caracteres')
    .required('Requerido'),
  last_name: Yup.string()
    .min(3, 'Debe ser un nombre de mínimo 3 caracteres')
    .required('Requerido'),
  email: Yup.string()
    .email('Ingrese un correo válido')
    .required('Requerido'),
  occupation: Yup.string().required('Requerido'),
  gender_id: Yup.string()
    .matches(uuidV4RegExp, 'Género inválido')
    .required('Requerido'),
  phone: Yup.string()
    .matches(phoneRegExp, 'Formato de teléfono inválido')
    .required('Requerido'),
  birthday: Yup.date().required('Requerido'),
  notes: Yup.string()
    .max(350, 'Nota demasiado larga')
})
