import * as Yup from 'yup'

const phoneRegExp = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/ //eslint-disable-line

export const registerValidationSchema = Yup.object().shape({
  user: Yup.object({
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
    password: Yup.string().required('Requerido'),
    confirm: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Las contraseñas no coinciden')
  }),
  company: Yup.object({
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
  })
})

export const loginValidationSchema = Yup.object({
  password: Yup.string()
    .required('Requerido'),
  email: Yup.string()
    .email('Ingrese un correo válido')
    .required('Requerido')
})
