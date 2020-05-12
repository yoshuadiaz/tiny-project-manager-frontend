import React, { useEffect, useState } from 'react'
import { useMachine } from '@xstate/react'
import loadMachine from '../../machines/fetchMachine'
import { getFetch } from '../../utils/networkUtils'
import Sidebar from '../../components/Layout/Sidebar'
import ClientDetail from '../../components/Clients/ClientDetail'
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
  useEffect(() => {
    sendToClientMachine('submit')
  }, [])

  return (
    <div className='clients dashboard_wrap'>
      <Sidebar
        items={clients.context.data}
        state={clients.value}
        entityName='Clientes'
        handleSelectItem={handleSelectItem}
      />
      {!selectedClient && <Idle message='Seleccione algún cliente' src={ClientsIdle} />}
      {selectedClient && (
        <ClientDetail client={selectedClient} subitems={contacts.context.data} status={contacts.value} />
      )}
    </div>
  )
}

export default ClientContainer
