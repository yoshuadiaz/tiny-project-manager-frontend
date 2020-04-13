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
      {({ isAuth }) => {
        return !isAuth ? (
          <Router>
            <Login path='/' />
            <Login path='/login' />
            <NotFound default />
          </Router>
        ) : (
          <Router>
            <Dashboard path='/' />
            <Dashboard path='/dashboard' />
            <NotFound default />
          </Router>
        )
      }}
    </Context.Consumer>
  </div>
)

export default App
