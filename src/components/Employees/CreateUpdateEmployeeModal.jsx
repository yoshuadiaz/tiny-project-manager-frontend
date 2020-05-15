import React from 'react'
import ActionModal from '../Modal/ActionModal'
import CreateEmployeeForm from '../Forms/CreateUpdateEmployeeForm'
const CreateUpdateEmployeeModal = (props) => {
  return (
    <ActionModal
      title={`${props.isUpdate ? 'Actualizar Empleado' : 'Crear Empleado'}`}
      isOpen={props.isOpen}
      onClose={props.onClose}
    >
      <CreateEmployeeForm
        onHandleSubmit={props.onHandleSubmit}
        onHandleCancel={props.onClose}
        status={props.status}
        initialValues={props.initialValues}
        isUpdate={props.isUpdate}
      />
    </ActionModal>
  )
}

export default CreateUpdateEmployeeModal
