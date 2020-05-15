import React from 'react'
import EmployeesTable from '../components/Employees/EmployeesTable'
import EntityHeadbar from '../components/EntityHeadbar/EntityHeadbar'
import { Button } from 'semantic-ui-react'
import CreateUpdateEmployeeModal from '../components/Employees/CreateUpdateEmployeeModal'
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

    updateEmployeeModal,
    openUpdateEmployeeModal,
    closeUpdateEmployeeModal,
    onHandleUpdateEmployee,
    updateEmployeeStatus,
    selectedEmployee
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
          onHandleUpdate={openUpdateEmployeeModal}
          hideDelete
        />
      )}
      <CreateUpdateEmployeeModal
        isOpen={createEmployeeModal}
        onClose={closeCreateEmployeeModal}
        onHandleSubmit={onHandleCreateEmployee}
        status={createEmployeeStatus}
      />
      <CreateUpdateEmployeeModal
        isOpen={updateEmployeeModal}
        onClose={closeUpdateEmployeeModal}
        onHandleSubmit={onHandleUpdateEmployee}
        status={updateEmployeeStatus}
        isUpdate
        initialValues={selectedEmployee}
      />
    </div>
  )
}

export default EmployeesView
