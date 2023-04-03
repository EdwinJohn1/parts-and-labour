import React from 'react'
import {useInView} from 'react-intersection-observer'
import './index.scss'

export const TransitionElement = ({
  className,
  children,
  threshold,
  root,
  triggerOnce,
  delay,
}) => {
  const {ref, inView, entry} = useInView({
    /* Optional options */
    threshold: threshold || 0,
    root,
    triggerOnce,
  })

  return (
    <div
      ref={ref}
      className={`transition-element ${className ? className : ''} ${
        inView ? 'transition-element--in-view' : ''
      }`}
      data-delay={delay || 0}
    >
      {children}
    </div>
  )
}

export default TransitionElement
