import React, { useContext } from 'react'
import * as Yup from 'yup'
import { Context as GeneralContext } from '../../Context'

import LoginForm from '../../components/Forms/LoginForm'

import './styles.css'

const loginValidationSchema = Yup.object({
  password: Yup.string()
    .required('Requerido'),
  email: Yup.string()
    .email('Ingrese un correo válido')
    .required('Requerido')
})

const Login = (props) => {
  const generalContext = useContext(GeneralContext)
  const handleSubmit = values => {
    generalContext.sendToAuthMachine('submit', {
      payload: { email: values.email, password: values.password }
    })
  }

  return (
    <div className='login_wrap'>
      <div className='login_form'>
        <section className='login_form_content'>
          <div className='login_logo'>
            <i className='fas fa-handshake' />
          </div>
          <h1>Tiny Project Manager</h1>
          <LoginForm
            state={generalContext.state}
            isFailed={generalContext.isFailed}
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
