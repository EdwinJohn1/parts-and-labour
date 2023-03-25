import React from 'react'

import '../styles/components/button.scss'

const Button = (props) => {
  const {className, isStatic, text, color, onMouseEnter, onMouseLeave} = props
  return (
    <div
      className={`button ${className ? className : ''} ${
        isStatic ? 'static' : 'animates'
      }`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div style={{color}} className="">
        <div className="text">{text}</div>
      </div>
    </div>
  )
}
export default Button
