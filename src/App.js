import React from 'react'
import { Router } from '@reach/router'
import Login from './pages/Login'
import Register from './pages/Register'
import NotFound from './pages/NotFound'
import Dashboard from './pages/Dashboard'
import Projects from './pages/Projects'
import Clients from './pages/Clients'
import Contacts from './pages/Contacts'
import Employees from './pages/Employees'

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
                <Register path='/register' />
                <Login path='/login' default />
              </Router>
            )}
            {user && user.id && (
              <Router>
                <Dashboard path='/' />
                <Dashboard path='dashboard'>
                  <Projects path='/' />
                  <Clients path='clients' />
                  <Contacts path='contacts' />
                  <Employees path='employees' />
                </Dashboard>
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
