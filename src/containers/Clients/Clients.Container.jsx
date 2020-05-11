import React, { useContext, useEffect, useState } from 'react'
import { useMachine } from '@xstate/react'
import loadMachine from '../../machines/fetchMachine'
import { Context as GeneralContext } from '../../Context'
import { getFetch } from '../../utils/networkUtils'
import Sidebar from '../../components/Layout/Sidebar'
import '../../components/Clients/ClientDetail.css'
const ClientContainer = props => {
  const [selectedClient, setSelectedClient] = useState('')
  const authContext = useContext(GeneralContext)
  const [clients, sendToClientMachine] = useMachine(loadMachine, {
    services: {
      handleFetch: getFetch('/client', authContext.token),
      handleSuccess: () => {}
    }
  })

  const [contacts, sendToContactsMachine] = useMachine(loadMachine, {
    services: {
      handleFetch: (_, event) => {
        return getFetch(`/contact/${event.id}`, authContext.token)
      },
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
      <Sidebar items={clients.context.data} state={clients.value} entityName='Clientes' handleSelectItem={handleSelectItem} />
      <div className='clients_detail'>
        <div>
          <pre>{JSON.stringify(selectedClient, null, 2)}</pre>
        </div>
        <br />
        <br />
        <br />
        <div>
          {contacts.value === 'idle' && <p>Seleccione algo</p>}
          {contacts.value === 'fetching' && <p>Loading</p>}
          {contacts.value === 'success' && contacts.context.data.length === 0 && (
            <div>
            Colección vacia
            </div>
          )}
          {contacts.value === 'success' && contacts.context.data.length > 0 && (
            <div>
              <pre>{JSON.stringify(contacts.context.data, null, 2)}</pre>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ClientContainer
