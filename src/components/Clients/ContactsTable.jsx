import React from 'react'
import { Table, Divider, TableCell } from 'semantic-ui-react'
import dayjs from 'dayjs'
import { UserTableCell, ActionsTableCell } from '../Table/TableCells'

const ContactsTable = props => {
  const headerRow = ['Nombre completo', 'Contacto', 'Cumpleaños', 'Notas', 'Acciones']
  const renderBodyRow = (cols) => ({
    key: cols.id,
    cells: [
      (
        <UserTableCell
          key={`contact_fullname_${cols.id}`}
          firstName={cols.first_name}
          lastName={cols.last_name}
          occupation={cols.occupation}
        />
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
      cols.notes || 'Sin especificar',
      (
        <ActionsTableCell
          key={`contacts_actions_${cols.id}`}
          onHandleUpdate={() => props.onHandleUpdate(cols)}
          onHandleDelete={() => props.onHandleDelete(cols)}
        />
      )
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
