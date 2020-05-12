import React from 'react'
import './Idle.css'

const Idle = props => {
  return (
    <div className='idle'>
      <img
        className='idle_cover'
        src={props.src}
        alt={props.entityName}
      />
      <p
        className='idle_message'
      >
        {props.message}
      </p>
    </div>
  )
}

export default Idle
