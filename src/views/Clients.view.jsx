import React from 'react'
import { Button } from 'semantic-ui-react'
import Sidebar from '../components/Layout/Sidebar'
import ClientDetail from '../components/Clients/ClientDetail'
import EntityHeadbar from '../components/EntityHeadbar/EntityHeadbar'
import '../components/Clients/ClientDetail.css'
import Idle from '../components/Idle/Idle'
import ClientsIdle from '../assets/login.jpeg'
import CreateClientModal from '../components/Clients/CreateClientModal'
import CreateUpdateContactModal from '../components/Clients/CreateUpdateContactModal'
const ClientsView = (props) => {
  const {
    createClientModal,
    closeCreateClientModal,
    openCreateClientModal,
    onHandleCreateClient,
    createClientStatus,
    createContactStatus,
    createContactModal,
    closeCreateContactModal,
    openCreateContactModal,
    onHandleCreateContact,
    updateContactModal,
    onHandleUpdateContact,
    updateContactStatus,
    closeUpdateContactModal,
    openUpdateContactModal,
    updateInitialValues
  } = props
  return (
    <div>
      <CreateClientModal
        isOpen={createClientModal}
        onClose={closeCreateClientModal}
        onHandleSubmit={onHandleCreateClient}
        status={createClientStatus}
      />
      <CreateUpdateContactModal
        isOpen={updateContactModal}
        onClose={closeUpdateContactModal}
        onHandleSubmit={onHandleUpdateContact}
        status={updateContactStatus}
        initialValues={updateInitialValues}
        isUpdate
      />

      <CreateUpdateContactModal
        isOpen={createContactModal}
        onClose={closeCreateContactModal}
        onHandleSubmit={onHandleCreateContact}
        createContactStatus={createContactStatus}
      />
      <div className='clients dashboard_wrap'>
        <EntityHeadbar
          className='clients clients_entityHeadbar'
          title='Todos los Clientes'
        >
          <Button onClick={openCreateClientModal} icon='add user' color='blue' />
        </EntityHeadbar>
        <Sidebar
          items={props.clients.context.data}
          state={props.clients.value}
          entityName='Clientes'
          onHandleSelectItem={props.onHandleSelectItem}
        />
        {!props.selectedClient && <Idle message='Seleccione algún cliente' src={ClientsIdle} />}

        {props.selectedClient && (
          <ClientDetail
            client={props.selectedClient}
            subitems={props.subitems}
            status={props.contactsStatus}
            onHandleDelete={props.onHandleDelete}
            openUpdateContactModal={openUpdateContactModal}
            openCreateContactModal={openCreateContactModal}
            onHandleCreateContact={onHandleCreateContact}
          />
        )}
      </div>
    </div>
  )
}

export default ClientsView
