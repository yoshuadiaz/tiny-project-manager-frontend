import React from 'react'
import { useFormik } from 'formik'
import { Form, FormGroup, Button, ButtonGroup, TextArea } from 'semantic-ui-react'
import { clientValidationSchema } from '../../validations/client'

const CreateClientFormik = props => {
  const formik = useFormik({
    initialValues: {
      name: '',
      website: 'http://',
      industry: '',
      description: '',
      phone: '',
      address: '',
      notes: ''
    },
    validationSchema: clientValidationSchema,
    onSubmit: props.onHandleSubmit
  })
  return (
    <>
      <Form
        size='small'
        onSubmit={formik.handleSubmit}
        loading={props.status === 'fetching'}
      >
        <Form.Field
          label='Nombre'
          control='input'
          type='text'
          {...formik.getFieldProps('name')}
          error={
            formik.touched && formik.touched.name && formik.errors && formik.errors.name
              ? { content: formik.errors.name }
              : null
          }
        />
        <FormGroup widths='3'>
          <Form.Field
            label='Sitio web'
            control='input'
            type='text'
            {...formik.getFieldProps('website')}
            error={
              formik.touched && formik.touched.website && formik.errors && formik.errors.website
                ? { content: formik.errors.website }
                : null
            }
          />
          <Form.Field
            label='Industria'
            control='input'
            type='text'
            {...formik.getFieldProps('industry')}
            error={
              formik.touched && formik.touched.industry && formik.errors && formik.errors.industry
                ? { content: formik.errors.industry }
                : null
            }
          />
          <Form.Field
            label='Teléfono'
            control='input'
            type='text'
            {...formik.getFieldProps('phone')}
            error={
              formik.touched && formik.touched.phone && formik.errors && formik.errors.phone
                ? { content: formik.errors.phone }
                : null
            }
          />
        </FormGroup>
        <Form.Field
          label='Dirección'
          control='input'
          type='text'
          {...formik.getFieldProps('address')}
          value={formik.values.address || ''}
          error={
            formik.touched && formik.touched.address && formik.errors && formik.errors.address
              ? { content: formik.errors.address }
              : null
          }
        />

        <Form.Field
          label='Descripción'
          control={TextArea}
          {...formik.getFieldProps('description')}
          error={
            formik.touched && formik.touched.description && formik.errors && formik.errors.description
              ? { content: formik.errors.description }
              : null
          }
        />
        <Form.Field
          label='Notas'
          control={TextArea}
          {...formik.getFieldProps('notes')}
          error={
            formik.touched && formik.touched.notes && formik.errors && formik.errors.notes
              ? { content: formik.errors.notes }
              : null
          }
        />
        <ButtonGroup>
          <Button
            type='button'
            negative
            onClick={props.onHandleCancel}
          >
            Cancelar
          </Button>
          <Button
            type='submit'
            color='black'
            className='form_submit'
          >
            Guardar Cliente
          </Button>
        </ButtonGroup>
      </Form>
    </>
  )
}

export default CreateClientFormik
