import React from 'react'
import {useIsInViewport} from '../../utils'

export const InViewWrapper = (props) => {
  const ref = React.useRef()

  const isInViewPort = useIsInViewport(
    ref?.current,
    props.root,
    {min: props.min, max: props.max},
    props.lock,
    props.whenInView
  )

  return (
    <div className={props.className} ref={ref}>
      {props.render(isInViewPort)}
    </div>
  )
}

export default InViewWrapper
