import React from 'react'
import { ButtonGroup, Button, Divider, TableCell } from 'semantic-ui-react'

export const UserTableCell = props => (
  <TableCell>
    {`${props.firstName} ${props.lastName}` || 'Sin especificar'}
    <Divider fitted />
    <small>{`Ocupación: ${props.occupation || 'Sin especificar'}`}</small>
  </TableCell>
)

export const ActionsTableCell = props => (
  <TableCell textAlign='center'>
    <ButtonGroup fluid>
      <Button
        icon='trash alternate'
        negative
        onClick={props.handleDelete}
      />
      <Button
        icon='edit'
        color='blue'
        onClick={props.handleUpdate}
      />
    </ButtonGroup>
  </TableCell>
)
