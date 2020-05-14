import React from 'react'
import { useMachine } from '@xstate/react'
import { Link, navigate } from '@reach/router'
import { Divider } from 'semantic-ui-react'
import { registerValidationSchema } from '../../validations/auth'
import RegisterMachine from '../../machines/fetchMachine'
import { sendPost } from '../../utils/networkUtils'

import RegisterForm from '../../components/Forms/RegisterForm'

import './styles.css'

const RegisterContainer = props => {
  const [registerState, sendToRegisterMachine] = useMachine(RegisterMachine, {
    services: {
      handleFetch: (context, event) => sendPost('/auth/register', event.payload),
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
          <Divider />
          <p>¿Ya tiene una cuenta? <strong><Link to='/login'>Inicie sesión aquí</Link></strong></p>
        </section>
      </div>
      <div className='register_image' />
    </div>
  )
}

export default RegisterContainer
