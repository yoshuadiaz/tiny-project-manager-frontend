import React from 'react'
import ActionModal from '../Modal/ActionModal'
import CreateContactForm from '../Forms/CreateUpdateContactForm'
const CreateUpdateContactModal = (props) => {
  return (
    <ActionModal
      title={`${props.isUpdate ? 'Actualizar Contactos' : 'Crear Contacto'}`}
      isOpen={props.isOpen}
      onClose={props.onClose}
    >
      <CreateContactForm
        onHandleSubmit={props.onHandleSubmit}
        onHandleCancel={props.onClose}
        status={props.createContactStatus}
        initialValues={props.initialValues}
      />

    </ActionModal>
  )
}

export default CreateUpdateContactModal
