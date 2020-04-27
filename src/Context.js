import React, { createContext } from 'react'
import base64 from 'base-64'
import { useMachine } from '@xstate/react'

import AuthContextMachine from './machines/authContextMachine'

export const Context = createContext(AuthContextMachine)

const Provider = ({ children }) => {
  const [authState, sendToAuthMachine] = useMachine(AuthContextMachine, {
    services: {
      handleLogin: (context, event) => {
        try {
          const headers = new Headers() // eslint-disable-line
          const username = event.payload.email
          const password = event.payload.password
          headers.append('Authorization', 'Basic ' + base64.encode(username + ':' + password))
          /* eslint-disable */
          return fetch(
            'http://localhost:7000/api/auth/login',
            {
              method: 'POST',
              headers: headers,
              cache: 'no-cache'
            }
          )
            .then(data => data.json())
            .then(data => {
              document.cookie = `token=${data.body.token}`
              return data.body
            })
          /* eslint-enable */
        } catch (e) {
          throw new Error(e.message)
        }
      },
      handleCheck: (context, event) => {
        /* eslint-disable */
        return fetch('http://localhost:7000/api/auth/check', {
          method: 'POST',
          credentials: 'include'
        })
          .then(data => {
            return data.json()
          })
          .then(data => {
            return data.body
          })
        /* eslint-enable */
      }
    },
    context: {
      token: null,
      user: null,
      isFailed: false
    }
  })

  const value = {
    ...authState.context,
    sendToAuthMachine: sendToAuthMachine,
    state: authState.value
  }

  return (
    <Context.Provider value={value}>
      {children}
    </Context.Provider>
  )
}

export default {
  Provider,
  Consumer: Context.Consumer
}
