import React, { useContext, useEffect } from 'react'
import { useMachine } from '@xstate/react'
import Header from '../../components/Layout/Header'
import { Context as GeneralContext } from '../../Context'
import loadMachine from '../../machines/fetchMachine'
import './style.css'
import { getFetch } from '../../utils/networkUtils'

const DashboardContainer = props => {
  const authContext = useContext(GeneralContext)
  const [company, sendToCompanyMachine] = useMachine(loadMachine, {
    services: {
      handleFetch: getFetch('/company', authContext.token)
    }
  })

  const [user, sendToUserMachine] = useMachine(loadMachine, {
    services: {
      handleFetch: getFetch('/user/me', authContext.token)
    }
  })

  useEffect(() => {
    sendToCompanyMachine('submit')
    sendToUserMachine('submit')
  }, [company])

  return (
    <div className='dashboard'>
      <Header company={company} user={user} />
      <div className='content'>
        <div className='dashboard_wrap'>
          {props.children}
        </div>
      </div>
    </div>
  )
}

export default DashboardContainer
