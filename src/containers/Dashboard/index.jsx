import React from 'react'
import { Link } from '@reach/router'
import { Button } from 'semantic-ui-react'
import Header from '../../components/Layout/Header'
import './style.css'

const DashboardContainer = props => {
  return (
    <div className='dashboard'>
      <Header />

      <div className='content'>
        <div className='dashboard_wrap'>
          <div className='dashboard_header'>
            <h3 className='dashboard_header_sectionTitle'>Título de sección</h3>

            <div className='dashboard_header_sectionActions'>
              <Button primary>Agregar</Button>
            </div>
          </div>
          <nav className='dashboard_sidebar'>
            <section className='dashboard_sidebar_projectList'>
              <p>Todos los empleados</p>

              <nav>
                <h4>Entidad</h4>
                <ul className='dashboard_sidebar_options'>
                  <li>
                    <Link className='dashboard_sidebar_item' to='/'>Item 1</Link>
                  </li>
                  <li>
                    <Link className='dashboard_sidebar_item' to='/'>Item 2</Link>
                  </li>
                  <li>
                    <Link className='dashboard_sidebar_item' to='/'>Item 3</Link>
                  </li>
                  <li>
                    <Link className='dashboard_sidebar_item' to='/'>Item 4</Link>
                  </li>
                  <li>
                    <Link className='dashboard_sidebar_item' to='/'>Item 5</Link>
                  </li>
                </ul>
              </nav>
            </section>
          </nav>

          <section className='dashboard_content'>
            <div className='entity_content'>
              <div className='entity_header'>
                <span>
                  <input type='checkbox' />
                </span>
                <span>header 2</span>
                <span>header 3</span>
                <span>header 4</span>
                <span>header 5</span>
              </div>
              <article className='entity_item'>
                <span>
                  <input type='checkbox' />
                </span>
                <span>
                  IMAGEN
                </span>
                <span>header 3</span>
                <span>header 4</span>
                <span>header 5</span>
              </article>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default DashboardContainer
