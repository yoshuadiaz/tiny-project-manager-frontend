import React from 'react'
import { Card, Divider } from 'semantic-ui-react'

const ClientInfo = props => {
  const { client } = props
  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>
          {client.name}
        </Card.Header>
        <Card.Meta>
          <span>{client.industry} | <a href={client.website} target='_blank' rel='noopener noreferrer'>{client.website}</a></span>
        </Card.Meta>
        <Card.Description>
          <p>{client.description}</p>
          <Divider />
          <p><strong>Teléfono</strong>: {client.phone} </p>
          <p><strong>Dirección</strong>: {client.address}</p>
          <p><strong>Notas</strong>: {client.notes}</p>
        </Card.Description>
      </Card.Content>
    </Card>
  )
}

export default ClientInfo
