import React, { useEffect, useContext } from 'react'
import { useMachine } from '@xstate/react'
import Header from '../../components/Layout/Header'
import loadMachine from '../../machines/fetchMachine'
import './style.css'
import { getFetch } from '../../utils/networkUtils'
import { Context as GeneralContext } from '../../Context'

const DashboardContainer = props => {
  const { getCatalogs } = useContext(GeneralContext)
  const [company, sendToCompanyMachine] = useMachine(loadMachine, {
    services: {
      handleFetch: (context, event) => getFetch('/company'),
      handleSuccess: () => {}
    }
  })

  const [user, sendToUserMachine] = useMachine(loadMachine, {
    services: {
      handleFetch: (context, event) => getFetch('/user/me'),
      handleSuccess: () => {}
    }
  })

  useEffect(() => {
    if (!user.context.data && !company.context.data) {
      sendToCompanyMachine('submit')
      sendToUserMachine('submit')
      getCatalogs()
    }
  }, [])

  return (
    <div className='dashboard'>
      <Header company={company} user={user} />
      <div className='content'>
        {props.children}
      </div>
    </div>
  )
}

export default DashboardContainer
