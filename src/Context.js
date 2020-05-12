import React, { createContext } from 'react'
import { useMachine } from '@xstate/react'
import axios from 'axios'

import AuthContextMachine from './machines/authContextMachine'

export const Context = createContext(AuthContextMachine)

const Provider = ({ children }) => {
  const [authState, sendToAuthMachine] = useMachine(AuthContextMachine, {
    services: {
      handleLogin: (context, event) => {
        try {
          const username = event.payload.email
          const password = event.payload.password
          return axios.post(
            'http://localhost:7000/api/auth/login',
            {
            },
            {
              withCredentials: true,
              auth: {
                username,
                password
              }
            }
          )
            .then(({ data }) => {
              return data.body
            })
        } catch (e) {
          throw new Error(e.message)
        }
      },
      handleCheck: (context, event) => {
        return axios.post('http://localhost:7000/api/auth/check', {}, {
          withCredentials: true
        })
          .then(({ data }) => {
            return data.body
          })
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
