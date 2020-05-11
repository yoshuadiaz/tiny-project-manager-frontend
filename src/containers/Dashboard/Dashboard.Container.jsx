import React, { useContext, useEffect } from 'react'
import { useMachine } from '@xstate/react'
import Header from '../../components/Layout/Header'
import { Context as GeneralContext } from '../../Context'
import loadMachine from '../../machines/fetchMachine'
import './style.css'
import axios from 'axios'

const DashboardContainer = props => {
  const authContext = useContext(GeneralContext)
  const [company, sendToCompanyMachine] = useMachine(loadMachine, {
    services: {
      handleFetch: () => axios.get('http://localhost:7000/api/company', {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authContext.token}`
        }
      })
        .then(({ data }) => data.body)
    }
  })

  const [user, sendToUserMachine] = useMachine(loadMachine, {
    services: {
      handleFetch: () => axios.get('http://localhost:7000/api/user/me', {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authContext.token}`
        }
      })
        .then(({ data }) => data.body)
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
