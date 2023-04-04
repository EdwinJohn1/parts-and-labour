import React from 'react'
import {isInBrowser, useIsInViewport} from '../../utils'

export const InViewWrapper = (props) => {
  const ref = React.useRef()
  const [_init, setInit] = React.useState()

  React.useEffect(() => {
    // ensures the proper in view value is set in case
    // element is already in view upon on page load
    setInit(true)
  })

  const isInViewPort = useIsInViewport(
    ref?.current,
    props.root || (isInBrowser ?? window),
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
