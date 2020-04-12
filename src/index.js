import React from 'react'
import reactDOM from 'react-dom'
import Login from './containers/Login/Login.Container'
import './app.css'

const App = props => (
  <div>
    <Login />
  </div>
)

reactDOM.render(<App />, document.getElementById('app'))
