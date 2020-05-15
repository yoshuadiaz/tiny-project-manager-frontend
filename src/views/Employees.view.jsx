import React from 'react'
import EmployeesTable from '../components/Employees/EmployeesTable'
import EntityHeadbar from '../components/EntityHeadbar/EntityHeadbar'
import { Button } from 'semantic-ui-react'
import CreateEmployeeModal from '../components/Employees/CreateUpdateEmployeeModal'
const EmployeesView = (props) => {
  const {
    createEmployeeModal,
    closeCreateEmployeeModal,
    onHandleCreateEmployee,
    createEmployeeStatus,
    openCreateEmployeeModal,
    status,
    employees,
    onHandleDelete,
    onHandleUpdate
  } = props
  return (
    <div className='employees dashboard_wrap'>
      <EntityHeadbar
        title='Todos los Empleados'
      >
        <Button onClick={openCreateEmployeeModal} icon='add user' color='blue' />
      </EntityHeadbar>
      {status === 'fetching' && <p>Loading...</p>}
      {status === 'success' && employees && (
        <EmployeesTable
          employees={employees}
          onHandleDelete={onHandleDelete}
          onHandleUpdate={onHandleUpdate}
        />
      )}
      <CreateEmployeeModal
        isOpen={createEmployeeModal}
        onClose={closeCreateEmployeeModal}
        onHandleSubmit={onHandleCreateEmployee}
        createEmployeeStatus={createEmployeeStatus}
      />
    </div>
  )
}

export default EmployeesView
