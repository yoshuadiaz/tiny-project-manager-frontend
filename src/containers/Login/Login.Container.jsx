import React, { useContext } from 'react'
import { Divider } from 'semantic-ui-react'
import { Link } from '@reach/router'
import { Context as GeneralContext } from '../../Context'
import { loginValidationSchema } from '../../validations/auth.js'
import LoginForm from '../../components/Forms/LoginForm'
import './styles.css'

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
          <Divider />
          <p>¿No tiene una cuenta? <strong><Link to='/register'>Regístrese aquí</Link></strong></p>
        </section>
      </div>
      <div className='login_image' />
    </div>
  )
}

export default Login
