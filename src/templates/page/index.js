import React, {useContext, useEffect} from 'react'
import {HeaderContext} from '../../context/header-context'
import './index.scss'

const Page = ({
  logoColor,
  headerBackgroundColor,
  shouldShowLogo,
  className,
  style,
  children,
  ref,
}) => {
  const {
    setForcedLogoColor,
    menuBackground,
    setLogoFixed,
    setLogoVisibility,
    setMenuBackground,
  } = useContext(HeaderContext)

  useEffect(() => {
    if (shouldShowLogo !== undefined) {
      setLogoFixed(shouldShowLogo)
      setLogoVisibility(shouldShowLogo)
    }
  }, [])

  useEffect(() => {
    if (logoColor) {
      requestAnimationFrame(() => setForcedLogoColor(logoColor))
    }
  }, [logoColor])

  useEffect(() => {
    setMenuBackground(headerBackgroundColor)
  }, [headerBackgroundColor])

  return (
    <div
      className={`page ${className ? className : ''} ${
        menuBackground ? menuBackground : ''
      }`}
      style={style}
    >
      {children}
    </div>
  )
}

export default Page
