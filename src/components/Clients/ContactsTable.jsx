import React from 'react'
import { Table, Divider, TableCell } from 'semantic-ui-react'
import dayjs from 'dayjs'

const ContactsTable = props => {
  const headerRow = ['Nombre completo', 'Contacto', 'Cumpleaños', 'Notas']
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
          <p>
            <strong>Correo:</strong>
            <br />
            {cols.email && (
              <a
                href={`mailto:${cols.email}`}
                target='_blank'
                rel='noopener noreferrer'
              >
                {cols.email}
              </a>
            )}
            {!cols.email && <span>Sin especificar</span>}
          </p>
          <Divider fitted />
          <p>
            <strong>Teléfono:</strong>
            <br />
            {cols.phone && (
              <a href={`tel:+${cols.phone}`}>{cols.phone}</a>
            )}
            {!cols.phone && <span>Sin especificar</span>}
          </p>
        </TableCell>
      ),

      dayjs(cols.birthday).format('MMM DD, YYYY') || 'Sin especificar',
      cols.notes || 'Sin especificar'
    ]
  })
  return (
    <Table
      color='blue'
      celled
      compact
      striped
      selectable
      size='small'
      headerRow={headerRow}
      renderBodyRow={renderBodyRow}
      tableData={props.contacts}
    />
  )
}

export default ContactsTable
