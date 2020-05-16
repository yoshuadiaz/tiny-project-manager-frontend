import React, { useContext } from 'react'
import { useFormik } from 'formik'
import { Form, FormGroup, Button, ButtonGroup, FormField, Select } from 'semantic-ui-react'
import { userExtendedValidationSchema, userExtendedWithAuthValidationSchema } from '../../validations/auth'
import { Context as GeneralContext } from '../../Context'

const initialValues = {
  first_name: '',
  last_name: '',
  email: '',
  occupation: '',
  password: '',
  confirm: '',
  salary: 1000,
  currency: 'USD',
  work_type_id: '',
  status_id: ''
}

const options = [
  { key: 'MXN', value: 'MXN', text: '$MXN' },
  { key: 'USD', value: 'USD', text: '$USD' }
]
const CreateUpdateEmployeeForm = (props) => {
  const { catalogs } = useContext(GeneralContext)
  const userStatuses = catalogs.userStatus.data.map(us => ({
    key: us.id,
    value: us.id,
    text: us.description
  }))
  const workTypes = catalogs.workTypes.data.map(wt => ({
    key: wt.id,
    value: wt.id,
    text: wt.description
  }))

  const formik = useFormik({
    initialValues: props.initialValues || initialValues,
    validationSchema: props.isUpdate ? userExtendedValidationSchema : userExtendedWithAuthValidationSchema,
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
          disabled={props.isUpdate}
          {...formik.getFieldProps('email')}
          error={
            formik.touched && formik.touched.email && formik.errors && formik.errors.email
              ? { content: formik.errors.email }
              : null
          }
        />
      </FormGroup>
      <FormGroup widths={4}>
        <FormField
          label='Salario'
          control='input'
          type='number'
          value={formik.values.salary || ''}
          {...formik.getFieldProps('salary')}
          error={
            formik.touched && formik.touched.salary && formik.errors && formik.errors.salary
              ? { content: formik.errors.salary }
              : null
          }
        />

        <FormField
          label='Moneda'
          control={Select}
          options={options}
          fluid
          name='currency'
          value={formik.values.currency}
          onChange={(e, target) => formik.handleChange({ ...e, target })}
          error={
            formik.touched && formik.touched.currency && formik.errors && formik.errors.currency
              ? { content: formik.errors.currency }
              : null
          }
        />

        <FormField
          label='Estado'
          control={Select}
          options={userStatuses}
          fluid
          name='status_id'
          value={formik.values.status_id}
          onChange={(e, target) => formik.handleChange({ ...e, target })}
          error={
            formik.touched && formik.touched.status_id && formik.errors && formik.errors.status_id
              ? { content: formik.errors.status_id }
              : null
          }
        />
        <FormField
          label='Jornada'
          control={Select}
          options={workTypes}
          fluid
          name='work_type_id'
          value={formik.values.work_type_id}
          onChange={(e, target) => formik.handleChange({ ...e, target })}
          error={
            formik.touched && formik.touched.work_type_id && formik.errors && formik.errors.work_type_id
              ? { content: formik.errors.work_type_id }
              : null
          }
        />
      </FormGroup>
      {!props.isUpdate && (
        <FormGroup widths={2}>
          <FormField
            label='Password'
            control='input'
            type='password'
            {...formik.getFieldProps('password')}
            value={formik.values.password || ''}
            error={
              formik.touched && formik.touched.password && formik.errors && formik.errors.password
                ? { content: formik.errors.password }
                : null
            }
          />
          <FormField
            label='Confirmar Password'
            control='input'
            type='password'
            {...formik.getFieldProps('confirm')}
            error={
              formik.touched && formik.touched.confirm && formik.errors && formik.errors.confirm
                ? { content: formik.errors.confirm }
                : null
            }
          />
        </FormGroup>
      )}
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