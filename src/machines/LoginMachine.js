import { Machine } from 'xstate'

const base64 = require('base-64')

export const loginMachine = Machine({
  id: 'login',
  initial: 'idle',
  context: {
    token: null
  },
  states: {
    idle: {
      on: {
        SUBMIT: 'loading'
      }
    },
    loading: {
      invoke: {
        src: 'handleLogin',
        onDone: {
          target: 'authorized'
        },
        onError: {
          target: 'unauthorized'
        }
      }
    },
    authorized: {
      invoke: {
        src: 'handleAuthorized',
        onDone: 'idle'
      }
    },
    unauthorized: {
      on: {
        SUBMIT: 'loading'
      }
    }
  }
}, {
  services: {
    handleLogin: (context, event) => {
      try {
        const headers = new Headers() // eslint-disable-line
        const username = event.payload.email
        const password = event.payload.password
        headers.append('Authorization', 'Basic ' + base64.encode(username + ':' + password))
        /* eslint-disable */
        const data = fetch('http://localhost:7000/api/auth/login', {
          method: 'POST',
          headers: headers,
          cache: 'no-cache'
        }).then(data => data.json())
        .then(data => context.token = data.body)
        /* eslint-enable */
        return data
      } catch (e) {
        throw new Error(e.message)
      }
    }
  }
})

export default loginMachine
