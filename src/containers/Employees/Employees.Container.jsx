import React, { useEffect } from 'react'

import { useMachine } from '@xstate/react'
import loadMachine from '../../machines/fetchMachine'
import { getFetch } from '../../utils/networkUtils'
import '../../components/Employees/Employees.css'
import EmployeesTable from '../../components/Employees/EmployeesTable'
import EntityHeadbar from '../../components/EntityHeadbar/EntityHeadbar'
import { Button } from 'semantic-ui-react'

const EmployeesContainer = () => {
  const [employees, sendToEmployeesMachine] = useMachine(loadMachine, {
    services: {
      handleFetch: (event, context) => getFetch('/user'),
      handleSuccess: () => {}
    }
  })
  const onHandleCreate = () => console.log('Will create')
  const onHandleDelete = (data) => console.log('Will delete', data)
  const onHandleUpdate = (data) => console.log('Will update', data)

  useEffect(() => {
    sendToEmployeesMachine('submit')
  }, [])
  return (
    <div className='employees dashboard_wrap'>
      {/* ToDo: Add Bar for add Employees */}
      <EntityHeadbar
        title='Todos los Empleados'
      >
        <Button onClick={onHandleCreate} icon='add user' color='blue' />
      </EntityHeadbar>
      {employees.value === 'fetching' && <p>Loading...</p>}
      {employees.value === 'success' && employees.context.data && (
        <EmployeesTable
          employees={employees.context.data}
          onHandleDelete={onHandleDelete}
          onHandleUpdate={onHandleUpdate}
        />
      )}
    </div>
  )
}

export default EmployeesContainer
