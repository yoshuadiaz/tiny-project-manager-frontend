import React, { createContext } from 'react'
import { useMachine } from '@xstate/react'
import { sendPost } from './utils/networkUtils'

import AuthContextMachine from './machines/authContextMachine'

export const Context = createContext(AuthContextMachine)

const Provider = ({ children }) => {
  const [authState, sendToAuthMachine] = useMachine(AuthContextMachine, {
    services: {
      handleLogin: (context, event) => {
        try {
          const username = event.payload.email
          const password = event.payload.password
          return sendPost('/auth/login', {}, {
            auth: {
              username,
              password
            }
          })
        } catch (e) {
          throw new Error(e.message)
        }
      },
      handleCheck: (context, event) => {
        return sendPost('/auth/check')
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
