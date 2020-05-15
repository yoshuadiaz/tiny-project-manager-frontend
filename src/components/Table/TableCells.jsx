import React from 'react'
import { ButtonGroup, Button, Divider, TableCell } from 'semantic-ui-react'

export const UserTableCell = props => (
  <TableCell>
    <strong>{`${props.firstName} ${props.lastName}` || 'Sin especificar'}</strong>
    <Divider fitted />
    <small><strong>{`${props.occupation || 'Sin especificar'}`}</strong></small>
  </TableCell>
)

export const ActionsTableCell = props => (
  <TableCell textAlign='center'>
    <ButtonGroup fluid>
      {!props.hideDelete && (
        <Button
          icon='trash alternate'
          negative
          onClick={props.onHandleDelete}
        />
      )}
      <Button
        icon='edit'
        color='blue'
        onClick={props.onHandleUpdate}
      />

    </ButtonGroup>
  </TableCell>
)
