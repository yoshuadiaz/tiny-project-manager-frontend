import React from 'react'
import { Button } from 'semantic-ui-react'
import ClientInfo from './ClientInfo'
import ContactsTable from './ContactsTable'
import EntityHeadbar from '../../components/EntityHeadbar/EntityHeadbar'
import './ClientDetail.css'

const ClientDetail = props => {
  const {
    status,
    subitems,
    client,
    onHandleUpdate,
    onHandleDelete,
    openCreateContactModal
  } = props

  return (
    <div className='clients_detail'>
      <ClientInfo client={client} />

      <div>
        {status === 'fetching' && <p>Loading</p>}
        <EntityHeadbar
          className='clients clients_entityHeadbar'
          title='Todos los Contactos'
        >
          <Button onClick={openCreateContactModal} icon='add user' color='blue' />
        </EntityHeadbar>
        {status === 'success' && subitems.length === 0 && (
          <div>
            No hay contactos relacionados
          </div>
        )}

        {status === 'success' && subitems.length > 0 && (
          <ContactsTable
            contacts={subitems}
            onHandleUpdate={onHandleUpdate}
            onHandleDelete={onHandleDelete}
          />
        )}
      </div>
    </div>
  )
}

export default ClientDetail
