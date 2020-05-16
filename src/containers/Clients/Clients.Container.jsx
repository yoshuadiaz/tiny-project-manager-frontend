import React, { useEffect, useState } from 'react'
import { useMachine } from '@xstate/react'
import loadMachine from '../../machines/fetchMachine'
import { getFetch, sendPost } from '../../utils/networkUtils'
import ClientsView from '../../views/Clients.view'

const ClientContainer = props => {
  const [selectedClient, setSelectedClient] = useState(null)
  const [createClientModal, setCreateClientModal] = useState(false)
  const [createContactModal, setCreateContactModal] = useState(false)
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
  const [createClient, sendToCreateClientMachine] = useMachine(loadMachine, {
    services: {
      handleFetch: (context, event) => sendPost('/client', {
        ...event.payload
      }),
      handleSuccess: () => {
        closeCreateClientModal()
        sendToClientMachine('refresh')
      }
    }
  })
  const [createContact, sendToCreateContactMachine] = useMachine(loadMachine, {
    services: {
      handleFetch: (context, event) => sendPost('/contact', {
        ...event.payload,
        client_id: selectedClient.id
      }),
      handleSuccess: () => {
        closeCreateContactModal()
        sendToContactsMachine('refresh', { id: selectedClient.id })
      }
    }
  })
  const onHandleSelectItem = (item) => {
    setSelectedClient(item)
    sendToContactsMachine('submit', { id: item.id })
  }
  const onHandleCreateClient = (payload) => {
    sendToCreateClientMachine('submit', { payload })
  }
  const onHandleCreateContact = payload => {
    sendToCreateContactMachine('submit', { payload })
  }
  const onHandleDelete = (data) => console.log('Will delete', data)
  const onHandleUpdate = (data) => console.log('Will update', data)
  const closeCreateClientModal = () => setCreateClientModal(false)
  const openCreateClientModal = () => setCreateClientModal(true)
  const closeCreateContactModal = () => setCreateContactModal(false)
  const openCreateContactModal = () => setCreateContactModal(true)

  useEffect(() => {
    sendToClientMachine('submit')
  }, [])

  return (
    <ClientsView
      onHandleSelectItem={onHandleSelectItem}
      clients={clients}
      selectedClient={selectedClient}
      clientsStatus={clients.value}
      contactsStatus={contacts.value}
      subitems={contacts.context.data}
      status={contacts.value}
      onHandleDelete={onHandleDelete}
      onHandleUpdate={onHandleUpdate}
      // Create Client Modal
      onHandleCreateClient={onHandleCreateClient}
      createClientStatus={createClient.value}
      createClientModal={createClientModal}
      closeCreateClientModal={closeCreateClientModal}
      openCreateClientModal={openCreateClientModal}
      // Create Contact Modal
      onHandleCreateContact={onHandleCreateContact}
      createContactStatus={createContact.value}
      createContactModal={createContactModal}
      closeCreateContactModal={closeCreateContactModal}
      openCreateContactModal={openCreateContactModal}
    />
  )
}

export default ClientContainer
