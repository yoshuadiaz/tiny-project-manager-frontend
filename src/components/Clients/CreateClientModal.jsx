
import React from 'react'
import ActionModal from '../Modal/ActionModal'
// import { clientValidationSchema } from '../../validations/client'
import CreateClientForm from '../Forms/CreateUpdateClientForm'
function CreateClientModal (props) {
  return (
    <div>
      <ActionModal
        title='Crear cliente'
        isOpen={props.isOpen}
        onClose={props.onClose}
      >
        <>
          <CreateClientForm
            onHandleSubmit={props.onHandleSubmit}
            onHandleCancel={props.onClose}
            status={props.createClientStatus}
          />

        </>
      </ActionModal>
    </div>
  )
}

export default CreateClientModal
