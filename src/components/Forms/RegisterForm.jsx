import React from 'react'
import { useFormik } from 'formik'
import { Form, Message } from 'semantic-ui-react'
import './styles.css'
const RegisterForm = props => {
  const formik = useFormik({
    initialValues: {
      user: {
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        confirm: ''
      },
      company: {
        name: '',
        website: '',
        industry: '',
        description: '',
        phone: '',
        address: ''
      }
    },
    validationSchema: props.validationSchema || null,
    onSubmit: props.handleSubmit
  })

  return (
    <>
      {props.state === 'success' && <Message positive header='Éxito' content='Será redirigido en breve' />}
      {props.state !== 'success' && (
        <Form
          onSubmit={formik.handleSubmit}
          loading={props.state === 'fetching'}
          size='tiny'
        >
          {formik.errors && (formik.errors.user || formik.errors.company) && <Message negative header='Error' content='Revisa la información' />}
          <h2>Datos de usuario</h2>
          <Form.Group widths={2}>
            <Form.Field
              label='Nombre(s)'
              control='input'
              type='text'
              {...formik.getFieldProps('user.first_name')}
              error={
                formik.touched.user && formik.touched.user.first_name && formik.errors.user && formik.errors.user.first_name
                  ? { content: formik.errors.user.first_name }
                  : null
              }
            />
            <Form.Field
              label='Apellido(s)'
              control='input'
              type='text'
              {...formik.getFieldProps('user.last_name')}
              error={
                formik.touched.user && formik.touched.user.last_name && formik.errors.user && formik.errors.user.last_name
                  ? { content: formik.errors.user.last_name }
                  : null
              }
            />
          </Form.Group>
          <Form.Field
            label='Email'
            control='input'
            type='email'
            {...formik.getFieldProps('user.email')}
            error={
              formik.touched.user && formik.touched.user.email && formik.errors.user && formik.errors.user.email
                ? { content: formik.errors.user.email }
                : null
            }
          />
          <Form.Group widths={2}>
            <Form.Field
              label='Password'
              control='input'
              type='password'
              {...formik.getFieldProps('user.password')}
              value={formik.values.user.password || ''}
              error={
                formik.touched.user && formik.touched.user.password && formik.errors.user && formik.errors.user.password
                  ? { content: formik.errors.user.password }
                  : null
              }
            />
            <Form.Field
              label='Confirmar Password'
              control='input'
              type='password'
              {...formik.getFieldProps('user.confirm')}
              error={
                formik.touched.user && formik.touched.user.confirm && formik.errors.user && formik.errors.user.confirm
                  ? { content: formik.errors.user.confirm }
                  : null
              }
            />
          </Form.Group>
          <h2>Datos de su empresa</h2>
          <Form.Group widths={2}>
            <Form.Field
              label='Nombre de la empresa'
              control='input'
              type='text'
              {...formik.getFieldProps('company.name')}
              value={formik.values.company.name || ''}
              error={
                formik.touched.company && formik.touched.company.name && formik.errors.company && formik.errors.company.name
                  ? { content: formik.errors.company.name }
                  : null
              }
            />
            <Form.Field
              label='Teléfono'
              control='input'
              type='tel'
              {...formik.getFieldProps('company.phone')}
              value={formik.values.company.phone || ''}
              error={
                formik.touched.company && formik.touched.company.phone && formik.errors.company && formik.errors.company.phone
                  ? { content: formik.errors.company.phone }
                  : null
              }
            />
          </Form.Group>
          <Form.Group widths={2}>
            <Form.Field
              label='Sitio web'
              control='input'
              type='text'
              {...formik.getFieldProps('company.website')}
              value={formik.values.company.website || ''}
              error={
                formik.touched.company && formik.touched.company.website && formik.errors.company && formik.errors.company.website
                  ? { content: formik.errors.company.website }
                  : null
              }
            />
            <Form.Field
              label='Industria'
              control='input'
              type='text'
              {...formik.getFieldProps('company.industry')}
              value={formik.values.company.industry || ''}
              error={
                formik.touched.company && formik.touched.company.industry && formik.errors.company && formik.errors.company.industry
                  ? { content: formik.errors.company.industry }
                  : null
              }
            />
          </Form.Group>
          <Form.Group widths={2}>
            <Form.Field
              label='Valores, misión, metas'
              control='input'
              type='text'
              {...formik.getFieldProps('company.description')}
              value={formik.values.company.description || ''}
              error={
                formik.touched.company && formik.touched.company.description && formik.errors.company && formik.errors.company.description
                  ? { content: formik.errors.company.description }
                  : null
              }
            />
            <Form.Field
              label='Dirección'
              control='input'
              type='text'
              {...formik.getFieldProps('company.address')}
              value={formik.values.company.address || ''}
              error={
                formik.touched.company && formik.touched.company.address && formik.errors.company && formik.errors.company.address
                  ? { content: formik.errors.company.address }
                  : null
              }
            />
          </Form.Group>

          <Form.Button
            type='submit'
            className='form_submit'
          >
            Registrar
          </Form.Button>
        </Form>
      )}
    </>
  )
}

export default RegisterForm
