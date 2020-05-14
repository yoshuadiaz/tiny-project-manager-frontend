import React from 'react'
import { useMachine } from '@xstate/react'
import { Link, navigate } from '@reach/router'
import { Divider } from 'semantic-ui-react'
import { registerValidationSchema } from '../../validations/auth'

import RegisterMachine from '../../machines/fetchMachine'

import RegisterForm from '../../components/Forms/RegisterForm'

import './styles.css'

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
          <Divider />
          <p>¿Ya tiene una cuenta? <strong><Link to='/login'>Inicie sesión aquí</Link></strong></p>
        </section>
      </div>
      <div className='register_image' />
    </div>
  )
}

export default RegisterContainer
