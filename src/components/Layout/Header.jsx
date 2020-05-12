import React from 'react'
import { Link } from '@reach/router'
import './Header.css'

const Header = props => {
  const company = props.company
  const user = props.user
  return (
    <header className='main_header'>
      <div className='content'>
        {company.value === 'fetching' && <p>Loading...</p>}
        {company.value === 'success' && (
          <figure className='main_header_logo'>
            <Link to='/dashboard'>
              <i className='fas fa-handshake' />
              {company.context.data.name}
            </Link>
          </figure>
        )}

        <nav className='main_header_menu'>
          <ul>
            <li>
              <Link to='/dashboard'>Proyectos</Link>
            </li>
            <li>
              <Link to='/dashboard/clients'>Clientes</Link>
            </li>
            <li>
              <Link to='/dashboard/contacts'>Contactos</Link>
            </li>
            <li>
              <Link to='/dashboard/employees'>Empleados</Link>
            </li>
          </ul>
        </nav>

        <div className='main_header_user'>
          {user.value === 'fetching' && <p>Loading...</p>}
          {
            user.value === 'success' && (
              <p>{user.context.data.first_name} {user.context.data.last_name}</p>
            )
          }
        </div>
      </div>
    </header>
  )
}

export default Header
