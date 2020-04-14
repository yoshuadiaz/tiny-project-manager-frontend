import { Machine } from 'xstate'

const fetchMachine = Machine({
  id: 'fetchMachine',
  initial: 'idle',
  context: {
    data: null
  },
  states: {
    idle: {
      on: {
        submit: 'fetching'
      }
    },
    fetching: {
      invoke: {
        src: 'handleFetch',
        onDone: 'success',
        onError: 'failure'
      }
    },
    success: {
      invoke: {
        src: 'handleSuccess'
      },
      entry: (context, event) => {
        context.data = event.data
      },
      on: {
        refresh: 'fetching'
      }
    },
    failure: {
      on: {
        retry: 'fetching'
      }
    }
  }
})

export default fetchMachine
