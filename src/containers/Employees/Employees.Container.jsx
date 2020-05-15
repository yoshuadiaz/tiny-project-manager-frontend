import React, { useEffect, useState } from 'react'
import { useMachine } from '@xstate/react'
import loadMachine from '../../machines/fetchMachine'
import { getFetch, sendPost } from '../../utils/networkUtils'
import '../../components/Employees/Employees.css'
import EmployeesView from '../../views/Employees.view'
const EmployeesContainer = () => {
  const [employees, sendToEmployeesMachine] = useMachine(loadMachine, {
    services: {
      handleFetch: (context, event) => getFetch('/user'),
      handleSuccess: () => {}
    }
  })
  const [createEmployee, sendToCreateEmployeeMachine] = useMachine(loadMachine, {
    services: {
      handleFetch: (context, event) => sendPost('/auth/addUser', { ...event.payload }),
      handleSuccess: () => {
        closeCreateEmployeeModal()
        sendToEmployeesMachine('refresh')
      }
    }
  })
  const [createEmployeeModal, setCreateEmployeeModal] = useState(false)
  const closeCreateEmployeeModal = () => setCreateEmployeeModal(false)
  const openCreateEmployeeModal = () => setCreateEmployeeModal(true)
  const onHandleCreateEmployee = (payload) => {
    console.log(payload)

    sendToCreateEmployeeMachine('submit', { payload })
  }
  const onHandleDelete = (data) => console.log('Will delete', data)
  const onHandleUpdate = (data) => console.log('Will update', data)

  useEffect(() => {
    sendToEmployeesMachine('submit')
  }, [])
  return (
    <EmployeesView
      onHandleCreateEmployee={onHandleCreateEmployee}
      status={employees.value}
      employees={employees.context.data}
      onHandleDelete={onHandleDelete}
      onHandleUpdate={onHandleUpdate}
      // Create employee
      createEmployeeStatus={createEmployee.value}
      createEmployeeModal={createEmployeeModal}
      closeCreateEmployeeModal={closeCreateEmployeeModal}
      openCreateEmployeeModal={openCreateEmployeeModal}
    />
  )
}

export default EmployeesContainer
