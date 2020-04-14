import React from 'react'
import { Link } from '@reach/router'
import './Header.css'

const Header = props => {
  return (
    <header className='header'>
      <div className='content'>
        <figure className='header_logo'>
          <Link to='/'>
            <i className='fas fa-handshake' />
          Company Name
          </Link>
        </figure>

        <div className='header_user'>
        User
        </div>
      </div>
    </header>
  )
}

export default Header
