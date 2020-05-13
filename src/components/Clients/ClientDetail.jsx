import React from 'react'
import ClientInfo from './ClientInfo'
import ContactsTable from './ContactsTable'
import './ClientDetail.css'

const ClientDetail = props => {
  const { status, subitems, client } = props

  return (
    <div className='clients_detail'>
      <ClientInfo client={client} />

      <div>
        {status === 'fetching' && <p>Loading</p>}
        {status === 'success' && subitems.length === 0 && (
          <div>
            No hay contactos relacionados
          </div>
        )}

        {status === 'success' && subitems.length > 0 && (
          <ContactsTable contacts={subitems} />
        )}
      </div>
    </div>
  )
}

export default ClientDetail
