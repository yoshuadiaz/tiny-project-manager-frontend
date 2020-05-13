import React from 'react'
import './EntityHeadbar.css'
const EntityHeadbar = props => {
  return (
    <div className={`entityHeadbar ${props.className}`}>
      <div className='entityHeadbar_title'>
        <h2>{props.title}</h2>
      </div>
      <div className='entityHeadbar_actions'>
        {props.children}
      </div>
    </div>
  )
}

export default EntityHeadbar
