import React from 'react'
import './styles.scss'

const contentWrapper = ({children}) => {
  return (
    <div
    className='contentWrapper'>{children}</div>
  )
}

export default contentWrapper