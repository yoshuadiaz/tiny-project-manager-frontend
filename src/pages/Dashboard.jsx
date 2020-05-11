import React from 'react'
import DashboardContainer from '../containers/Dashboard/Dashboard.Container'

const Dashboard = props => (
  <div>
    <DashboardContainer {...props}>
      {props.children}
    </DashboardContainer>
  </div>
)

export default Dashboard
