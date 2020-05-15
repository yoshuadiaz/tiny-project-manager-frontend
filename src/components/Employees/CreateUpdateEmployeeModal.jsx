import React from 'react'
import ActionModal from '../Modal/ActionModal'
import CreateEmployeeForm from '../Forms/CreateUpdateEmployeeForm'
const CreateUpdateEmployeeModal = (props) => {
  return (
    <ActionModal
      title='Crear Empleado'
      isOpen={props.isOpen}
      onClose={props.onClose}
    >
      <CreateEmployeeForm
        onHandleSubmit={props.onHandleSubmit}
        onHandleCancel={props.onClose}
        status={props.createEmployeeStatus}
      />
    </ActionModal>
  )
}

export default CreateUpdateEmployeeModal
