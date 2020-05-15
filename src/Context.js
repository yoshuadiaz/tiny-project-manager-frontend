import React, { createContext } from 'react'
import { useMachine } from '@xstate/react'
import { sendPost, getFetch } from './utils/networkUtils'

import AuthContextMachine from './machines/authContextMachine'
import LoadMachine from './machines/fetchMachine'

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

  const [genders, sendGenderFetchMachine] = useMachine(LoadMachine, {
    services: {
      handleFetch: (context, event) => getFetch('/catalog/gender'),
      handleSuccess: (context, event) => {}
    }
  })
  const [projectStatus, sendProjectStatusMachine] = useMachine(LoadMachine, {
    services: {
      handleFetch: (context, event) => getFetch('/catalog/project_status'),
      handleSuccess: (context, event) => {}
    }
  })
  const [userStatus, sendUserStatusMachine] = useMachine(LoadMachine, {
    services: {
      handleFetch: (context, event) => getFetch('/catalog/user_status'),
      handleSuccess: (context, event) => {}
    }
  })
  const [workTypes, sendWorkTypesMachine] = useMachine(LoadMachine, {
    services: {
      handleFetch: (context, event) => getFetch('/catalog/work_type'),
      handleSuccess: (context, event) => {}
    }
  })

  const getCatalogs = () => {
    sendGenderFetchMachine('submit')
    sendProjectStatusMachine('submit')
    sendUserStatusMachine('submit')
    sendWorkTypesMachine('submit')
  }

  const catalogs = {
    genders: {
      status: genders.value,
      data: genders.context.data
    },
    projectStatus: {
      status: projectStatus.value,
      data: projectStatus.context.data
    },
    userStatus: {
      status: userStatus.value,
      data: userStatus.context.data
    },
    workTypes: {
      status: workTypes.value,
      data: workTypes.context.data
    }
  }

  const value = {
    ...authState.context,
    catalogs,
    sendToAuthMachine: sendToAuthMachine,
    state: authState.value,
    getCatalogs
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
