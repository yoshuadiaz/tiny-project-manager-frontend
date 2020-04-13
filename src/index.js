import React from 'react'
import reactDOM from 'react-dom'

import App from './App'
import Context from './Context'

reactDOM.render(
  (
    <Context.Provider>
      <App />
    </Context.Provider>
  ),
  document.getElementById('app')
)
