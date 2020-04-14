import React from 'react'
import { useMachine } from '@xstate/react'
import * as Yup from 'yup'
import { navigate } from '@reach/router'

import RegisterMachine from '../../machines/fetchMachine'

import RegisterForm from '../../components/Forms/RegisterForm'

import './styles.css'

const phoneRegExp = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/ //eslint-disable-line

const registerValidationSchema = Yup.object().shape({
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
    password: Yup.string().required('Requerido'),
    confirm: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Las contraseñas no coinciden')
  }),
  company: Yup.object({
    name: Yup.string()
      .required('Requerido'),
    phone: Yup.string()
      .matches(phoneRegExp, 'Phone number is not valid')
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

const RegisterContainer = props => {
  const [registerState, sendToRegisterMachine] = useMachine(RegisterMachine, {
    services: {
      handleFetch: (_, event) => {
        /* eslint-disable */
        return fetch('http://localhost:7000/api/auth/register', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(event.payload)
        })
          .then(data => data.json())
          .then(data => data)
        /* eslint-enable */
      },
      handleSuccess: () => {
        navigate('/login')
      }
    }
  })

  const handleSubmit = values => {
    sendToRegisterMachine('submit', { payload: { ...values } })
  }
  return (
    <div className='register_wrap'>
      <div className='register_form'>
        <section className='register_form_content'>
          <div className='register_logo'>
            <i className='fas fa-handshake' />
          </div>
          <h1>Tiny Project Manager</h1>
          <RegisterForm
            state={registerState.value}
            validationSchema={registerValidationSchema}
            handleSubmit={handleSubmit}
          />
        </section>
      </div>
      <div className='register_image' />
    </div>
  )
}

export default RegisterContainer
