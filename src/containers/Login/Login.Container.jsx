import React from 'react'
import { useMachine } from '@xstate/react'
import * as Yup from 'yup'
import LoginForm from '../../components/Forms/LoginForm'
import './styles.css'

import loginMachine from '../../machines/LoginMachine'
const loginValidationSchema = Yup.object({
  password: Yup.string()
    .required('Requerido'),
  email: Yup.string()
    .email('Ingrese un correo válido')
    .required('Requerido')
})

const Login = (props) => {
  const [state, send] = useMachine(loginMachine)
  const handleSubmit = values => {
    send('SUBMIT', {
      payload: { email: values.email, password: values.password }
    })
  }

  return (
    <div className='login_wrap'>
      <div className='login_form'>
        <section className='login_form_content'>
          <div className='login_logo'>
            <i class='fas fa-handshake' />
          </div>
          <h1>Tiny Project Manager</h1>

          <LoginForm
            state={state.value}
            handleSubmit={handleSubmit}
            validationSchema={loginValidationSchema}
          />
        </section>
      </div>
      <div className='login_image' />
    </div>
  )
}

export default Login
