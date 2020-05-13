import React, { useEffect, useState } from 'react'
import { useMachine } from '@xstate/react'
import { Button } from 'semantic-ui-react'
import loadMachine from '../../machines/fetchMachine'
import { getFetch } from '../../utils/networkUtils'
import Sidebar from '../../components/Layout/Sidebar'
import ClientDetail from '../../components/Clients/ClientDetail'
import EntityHeadbar from '../../components/EntityHeadbar/EntityHeadbar'
import '../../components/Clients/ClientDetail.css'
import Idle from '../../components/Idle/Idle'
import ClientsIdle from '../../assets/login.jpeg'
const ClientContainer = props => {
  const [selectedClient, setSelectedClient] = useState(null)
  const [clients, sendToClientMachine] = useMachine(loadMachine, {
    services: {
      handleFetch: (event, context) => getFetch('/client'),
      handleSuccess: () => {}
    }
  })

  const [contacts, sendToContactsMachine] = useMachine(loadMachine, {
    services: {
      handleFetch: (context, event) => getFetch(`/contact/${event.id}`),
      handleSuccess: () => {}
    }
  })
  const handleSelectItem = (item) => {
    setSelectedClient(item)
    sendToContactsMachine('submit', { id: item.id })
  }
  const onHandleCreate = (data) => console.log('Will create')
  const onHandleCreateContact = data => console.log('Will create contact')
  const onHandleDelete = (data) => console.log('Will delete', data)
  const onHandleUpdate = (data) => console.log('Will update', data)
  useEffect(() => {
    sendToClientMachine('submit')
  }, [])

  return (
    <div className='clients dashboard_wrap'>
      <EntityHeadbar
        className='clients clients_entityHeadbar'
        title='Todos los Clientes'
      >
        <Button onClick={onHandleCreate} icon='add user' color='blue' />
      </EntityHeadbar>
      <Sidebar
        items={clients.context.data}
        state={clients.value}
        entityName='Clientes'
        handleSelectItem={handleSelectItem}
      />
      {!selectedClient && <Idle message='Seleccione algún cliente' src={ClientsIdle} />}
      {selectedClient && (
        <ClientDetail
          client={selectedClient}
          subitems={contacts.context.data}
          status={contacts.value}
          onHandleDelete={onHandleDelete}
          onHandleUpdate={onHandleUpdate}
          onHandleCreateContact={onHandleCreateContact}
        />
      )}
    </div>
  )
}

export default ClientContainer
