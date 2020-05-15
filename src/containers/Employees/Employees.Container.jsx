import React, { useEffect, useState } from 'react'
import { useMachine } from '@xstate/react'
import loadMachine from '../../machines/fetchMachine'
import { getFetch, sendPost, sendPut } from '../../utils/networkUtils'
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

  const [updateEmployee, sendToUpdateEmployeeMachine] = useMachine(loadMachine, {
    services: {
      handleFetch: (context, event) => sendPut(`/user/${selectedEmployee.id}`, { ...event.payload }),
      handleSuccess: () => {
        closeUpdateEmployeeModal()
        sendToEmployeesMachine('refresh')
      }
    }
  })

  const [createEmployeeModal, setCreateEmployeeModal] = useState(false)
  const [updateEmployeeModal, setUpdateEmployeeModal] = useState(false)
  const [selectedEmployee, setSelectedEmployee] = useState(null)
  const closeCreateEmployeeModal = () => setCreateEmployeeModal(false)
  const openCreateEmployeeModal = () => setCreateEmployeeModal(true)
  const closeUpdateEmployeeModal = () => setUpdateEmployeeModal(false)
  const openUpdateEmployeeModal = (data) => {
    setSelectedEmployee(data)
    setUpdateEmployeeModal(true)
  }
  const onHandleCreateEmployee = (payload) => {
    sendToCreateEmployeeMachine('submit', { payload })
  }
  const onHandleDeleteEmployee = (data) => console.log('Will delete', data)
  const onHandleUpdateEmployee = (payload) => {
    sendToUpdateEmployeeMachine('submit', { payload })
  }

  useEffect(() => {
    sendToEmployeesMachine('submit')
  }, [])
  return (
    <EmployeesView
      status={employees.value}
      employees={employees.context.data}
      // CUD Operations
      onHandleCreateEmployee={onHandleCreateEmployee}
      onHandleDeleteEmployee={onHandleDeleteEmployee}
      onHandleUpdateEmployee={onHandleUpdateEmployee}
      // Create employee
      createEmployeeStatus={createEmployee.value}
      createEmployeeModal={createEmployeeModal}
      closeCreateEmployeeModal={closeCreateEmployeeModal}
      openCreateEmployeeModal={openCreateEmployeeModal}
      // Update employee
      selectedEmployee={selectedEmployee}
      updateEmployeeStatus={updateEmployee.value}
      updateEmployeeModal={updateEmployeeModal}
      closeUpdateEmployeeModal={closeUpdateEmployeeModal}
      openUpdateEmployeeModal={openUpdateEmployeeModal}
    />
  )
}

export default EmployeesContainer
