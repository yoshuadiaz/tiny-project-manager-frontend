import React from 'react'
import './Sidebar.css'
const Sidebar = props => {
  return (
    <div className='sidebar'>
      {props.state === 'fetching' && <p>Loading...</p>}
      {props.state === 'success' && (
        <div className='sidebar_content'>
          <h2 className='sidebar_content_entityName'>{props.entityName}</h2>
          <ul>
            {props.items.map(item => (
              <li
                onClick={() => {
                  props.onHandleSelectItem(item)
                }} className='sidebar_content_item'
                key={item.id}
              >
                {item.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default Sidebar
