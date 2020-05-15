import React, { useContext } from 'react'
import { Divider, Table, TableCell } from 'semantic-ui-react'
import { UserTableCell, ActionsTableCell } from '../Table/TableCells'
import { Context as GeneralContext } from '../../Context'
const EmployeesTable = props => {
  const { catalogs: { userStatus, workTypes } } = useContext(GeneralContext)
  const headerRow = ['Empleado', 'Salario', 'Estado', 'Acciones']

  const renderBodyRow = (cols) => {
    const getUserStatus = userStatus.data.find(status => status.id === cols.status_id)
    const getUserWorkType = workTypes.data.find(wt => wt.id === cols.work_type_id)

    return {
      key: cols.id,
      cells: [
        (
          <UserTableCell
            key={`employee_fullname_${cols.id}`}
            firstName={cols.first_name}
            lastName={cols.last_name}
            occupation={cols.occupation}
          />
        ),
        (
          <TableCell key={`employee_job_${cols.id}`}>
            {!cols.salary && (<p>Salario sin definir</p>)}
            {cols.salary && Intl.NumberFormat('en', { style: 'currency', currency: cols.currency }).format(cols.salary)}
            <Divider fitted />
            {cols.work_type_id && getUserWorkType.description}
            {!cols.work_type_id && <span>Jornada sin definir</span>}
          </TableCell>
        ),
        (
          <TableCell key={`employee_status_${cols.id}`}>
            {getUserStatus.name}
          </TableCell>
        ),
        (
          <ActionsTableCell
            key={`employee_actions_${cols.id}`}
            onHandleUpdate={() => props.onHandleUpdate(cols)}
            onHandleDelete={() => props.onHandleDelete(cols)}
            hideDelete
          />
        )
      ]
    }
  }

  return (
    <>
      {userStatus.status === 'fetching' && workTypes.status === 'fetching' && (
        <p>Loading...</p>
      )}
      {userStatus.status === 'success' && workTypes.status === 'success' && (
        <Table
          color='blue'
          celled
          compact
          striped
          selectable
          size='small'
          headerRow={headerRow}
          renderBodyRow={renderBodyRow}
          tableData={props.employees}
        />
      )}
    </>
  )
}

export default EmployeesTable
