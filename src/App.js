import React from 'react'
import { Router } from '@reach/router'
import Login from './pages/Login'
import NotFound from './pages/NotFound'
import Dashboard from './pages/Dashboard'

import './app.css'
import Context from './Context'

const App = props => (
  <div>
    <Context.Consumer>
      {({ user }) => {
        return (
          <div>
            {!user && (
              <Router>
                <Login path='/' />
                <Login path='/login' />
                <NotFound default />
              </Router>
            )}
            {user && user.id && (
              <Router>
                <Dashboard path='/' />
                <Dashboard path='/dashboard' />
                <NotFound default />
              </Router>
            )}
          </div>
        )
      }}
    </Context.Consumer>
  </div>
)

export default App
