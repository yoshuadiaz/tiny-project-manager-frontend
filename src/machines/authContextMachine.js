import { Machine } from 'xstate'
import { navigate } from '@reach/router'

const authContextMachine = Machine({
  id: 'authContextMachine',
  initial: 'unauthorized',
  context: {
    user: null,
    token: null,
    isFailed: false,
    isInitialChecked: false
  },
  states: {
    unauthorized: {
      invoke: {
        src: 'handleCheck',
        onDone: 'authorized',
        onError: {
          actions: (context) => {
            context.isInitialChecked = true
          }
        }
      },
      on: {
        submit: 'fetching'
      }
    },
    fetching: {
      invoke: {
        src: 'handleLogin',
        onDone: 'authorized',
        onError: {
          target: 'unauthorized',
          actions: (context) => {
            context.user = null
            context.token = null
            context.isFailed = true
          }
        }
      }
    },
    authorized: {
      entry: (context, event) => {
        context.user = event.data.user
        context.token = event.data.token
        context.isFailed = false
        navigate('/dashboard')
      },
      on: {
        logout: {
          target: 'unauthorized',
          actions: (context, event) => {
            context.user = null
            context.token = null
          }
        }
      }
    }
  }
})

export default authContextMachine
