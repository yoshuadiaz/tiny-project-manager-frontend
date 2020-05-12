import React from 'react'
import ClientInfo from './ClientInfo'
import { Table, Divider, TableCell } from 'semantic-ui-react'
import dayjs from 'dayjs'
import './ClientDetail.css'
const ClientDetail = props => {
  const { status, subitems, client } = props
  const renderBodyRow = (cols) => ({
    key: cols.id,
    cells: [
      (
        <TableCell key={`contact_fullname_${cols.id}`}>
          {`${cols.first_name} ${cols.last_name}` || 'Sin especificar'}
          <Divider fitted />
          <small>{`Ocupación: ${cols.occupation || 'Sin especificar'}`}</small>
        </TableCell>
      ),
      (
        <TableCell key={`contact_contactInfo_${cols.id}`}>
          <p><strong>Correo:</strong> <br />{cols.email || 'Sin especificar'}</p>
          <Divider fitted />
          <p><strong>Teléfono:</strong> <br />{cols.phone || 'Sin especificar'}</p>
        </TableCell>
      ),

      dayjs(cols.birthday).format('MMM DD, YYYY') || 'Sin especificar',
      cols.notes || 'Sin especificar'
    ]
  })
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
          <div>
            <Table
              color='blue'
              celled
              compact
              striped
              size='small'
              headerRow={['Nombre completo', 'Contacto', 'Cumpleaños', 'Notas']}
              renderBodyRow={renderBodyRow}
              tableData={subitems}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default ClientDetail
