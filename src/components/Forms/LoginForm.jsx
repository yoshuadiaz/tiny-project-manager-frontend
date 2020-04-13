import React from 'react'
import { useFormik } from 'formik'
import { Form, Message } from 'semantic-ui-react'
import './styles.css'
const LoginForm = props => {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: props.validationSchema,
    onSubmit: props.handleSubmit
  })

  return (
    <>
      <Form
        onSubmit={formik.handleSubmit}
        loading={props.state === 'loading'}
      >
        {props.state === 'unauthorized' && props.isFailed && (<Message negative header='Error' content='Tu contraseña o tu correo estan mal.' />)}

        {props.state === 'authorized' && (<Message positive header='Éxito' content='Serás redirigido en breve' />)}
        <Form.Field
          label='Email'
          control='input'
          type='text'
          {...formik.getFieldProps('email')}
          error={
            formik.touched.email && formik.errors.email
              ? { content: formik.errors.email }
              : null
          }
        />
        <Form.Field
          label='Password'
          control='input'
          type='password'
          {...formik.getFieldProps('password')}
          error={
            formik.touched.password && formik.errors.password
              ? { content: formik.errors.password }
              : null
          }
        />
        <Form.Button
          type='submit'
          className='form_submit'
        >
        Iniciar sesión
        </Form.Button>
      </Form>
    </>
  )
}

export default LoginForm
