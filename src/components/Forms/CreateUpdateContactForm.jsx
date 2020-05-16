import React, { useContext } from 'react'
import { useFormik } from 'formik'
import { Form, FormGroup, Button, ButtonGroup, FormField, Select, TextArea } from 'semantic-ui-react'
import { contactValidationSchema } from '../../validations/client'
import { Context as GeneralContext } from '../../Context'
import dayjs from 'dayjs'

const initialValues = {
  first_name: '',
  last_name: '',
  email: '',
  occupation: '',
  gender_id: '',
  phone: '',
  birthday: '',
  notes: ''
}
const CreateUpdateEmployeeForm = (props) => {
  const { catalogs } = useContext(GeneralContext)
  const genders = catalogs.genders.data.map(gender => ({
    key: gender.id,
    value: gender.id,
    text: gender.name
  }))

  const formik = useFormik({
    initialValues: props.initialValues || initialValues,
    validationSchema: contactValidationSchema,
    onSubmit: props.onHandleSubmit
  })
  return (
    <Form
      size='small'
      onSubmit={formik.handleSubmit}
      loading={props.status === 'fetching'}
    >
      <FormGroup widths={2}>
        <FormField
          label='Nombre(s)'
          control='input'
          type='text'
          {...formik.getFieldProps('first_name')}
          error={
            formik.touched && formik.touched.first_name && formik.errors && formik.errors.first_name
              ? { content: formik.errors.first_name }
              : null
          }
        />
        <FormField
          label='Apellido(s)'
          control='input'
          type='text'
          {...formik.getFieldProps('last_name')}
          error={
            formik.touched && formik.touched.last_name && formik.errors && formik.errors.last_name
              ? { content: formik.errors.last_name }
              : null
          }
        />
      </FormGroup>
      <FormGroup widths={2}>
        <FormField
          label='Cargo u ocupación'
          control='input'
          type='text'
          {...formik.getFieldProps('occupation')}
          error={
            formik.touched && formik.touched.occupation && formik.errors && formik.errors.occupation
              ? { content: formik.errors.occupation }
              : null
          }
        />
        <FormField
          label='Email'
          control='input'
          type='email'
          {...formik.getFieldProps('email')}
          error={
            formik.touched && formik.touched.email && formik.errors && formik.errors.email
              ? { content: formik.errors.email }
              : null
          }
        />
      </FormGroup>
      <FormGroup widths={3}>
        <FormField
          label='Género'
          control={Select}
          options={genders}
          fluid
          name='gender_id'
          value={formik.values.gender_id}
          onChange={(e, target) => formik.handleChange({ ...e, target })}
          error={
            formik.touched && formik.touched.genders && formik.errors && formik.errors.genders
              ? { content: formik.errors.genders }
              : null
          }
        />
        <FormField
          label='Teléfono'
          control='input'
          type='tel'
          {...formik.getFieldProps('phone')}
          error={
            formik.touched && formik.touched.phone && formik.errors && formik.errors.phone
              ? { content: formik.errors.phone }
              : null
          }
        />
        <FormField
          label='Cumpleaños'
          control='input'
          type='date'
          {...formik.getFieldProps('birthday')}
          value={dayjs(formik.values.birthday).format('YYYY-MM-DD')}
          error={
            formik.touched && formik.touched.birthday && formik.errors && formik.errors.birthday
              ? { content: formik.errors.birthday }
              : null
          }
        />
      </FormGroup>
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
            Guardar Empleado
        </Button>
      </ButtonGroup>
    </Form>
  )
}

export default CreateUpdateEmployeeForm
