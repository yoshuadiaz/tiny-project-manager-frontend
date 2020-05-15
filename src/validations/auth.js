import * as Yup from 'yup'

const phoneRegExp = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/ //eslint-disable-line
const uuidV4RegExp = /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i //eslint-disable-line
export const userValidationSchema = {
  first_name: Yup.string()
    .min(3, 'Debe ser un nombre de mínimo 3 caracteres')
    .required('Requerido'),
  last_name: Yup.string()
    .min(3, 'Debe ser un nombre de mínimo 3 caracteres')
    .required('Requerido'),
  occupation: Yup.string().required('Requerido')
}

export const authData = {
  email: Yup.string()
    .email('Ingrese un correo válido')
    .required('Requerido'),
  password: Yup.string().required('Requerido'),
  confirm: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Las contraseñas no coinciden').required('Requerido')
}

export const userExtendedValidationSchema = Yup.object({
  ...userValidationSchema,
  salary: Yup.number().required('Requerido'),
  currency: Yup.string().min(3, 'Longitud inválida').max(3, 'Longitud inválida').required('Requerido'),
  work_type_id: Yup.string()
    .matches(uuidV4RegExp, 'Jornada inválida')
    .required('Requerido'),
  status_id: Yup.string()
    .matches(uuidV4RegExp, 'Estatus inválido')
    .required('Requerido')
})

export const userExtendedWithAuthValidationSchema = Yup.object({
  ...userValidationSchema,
  ...authData,
  salary: Yup.number().required('Requerido'),
  currency: Yup.string().min(3, 'Longitud inválida').max(3, 'Longitud inválida').required('Requerido'),
  work_type_id: Yup.string()
    .matches(uuidV4RegExp, 'Jornada inválida')
    .required('Requerido'),
  status_id: Yup.string()
    .matches(uuidV4RegExp, 'Estatus inválido')
    .required('Requerido')
})

export const companyValidationSchema = {
  name: Yup.string()
    .required('Requerido'),
  phone: Yup.string()
    .matches(phoneRegExp, 'Formato de teléfono inválido')
    .required('Requerido'),
  website: Yup.string()
    .url('Dirección con formato inválido')
    .required('Requerido'),
  industry: Yup.string()
    .required('Requerido'),
  description: Yup.string()
    .min(20, 'Se necesita una descripción más larga')
    .max(250, 'Descripción demasiado larga'),
  address: Yup.string()
    .min(10, 'Se necesita una dirección más larga')
    .max(150, 'Dirección demasiado larga')
    .required('Requerido')
}

export const registerValidationSchema = Yup.object().shape({
  user: Yup.object({ ...userValidationSchema, ...authData }),
  company: Yup.object({ ...companyValidationSchema })
})

export const loginValidationSchema = Yup.object({
  password: Yup.string()
    .required('Requerido'),
  email: Yup.string()
    .email('Ingrese un correo válido')
    .required('Requerido')
})
