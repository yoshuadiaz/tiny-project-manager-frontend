import React from 'react'
import { Divider, Table, TableCell } from 'semantic-ui-react'
import { UserTableCell, ActionsTableCell } from '../Table/TableCells'
const EmployeesTable = props => {
  const headerRow = ['Empleado', 'Salario', 'Estado', 'Acciones']
  const renderBodyRow = (cols) => ({
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
          {cols.work_type_id && cols.work_type_id}
          {!cols.work_type_id && <span>Jornada sin definir</span>}
        </TableCell>
      ),
      cols.status_id,
      (
        <ActionsTableCell
          key={`employee_actions_${cols.id}`}
          onHandleUpdate={() => props.onHandleUpdate(cols)}
          onHandleDelete={() => props.onHandleDelete(cols)}
          hideDelete
        />
      )
    ]
  })

  return (
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
  )
}

export default EmployeesTable
