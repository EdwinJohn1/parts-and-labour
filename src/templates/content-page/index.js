import React, {useState, useEffect, useContext, useRef} from 'react'
import Page from '../page'

import {HeaderContext, HEADER_POSITIONS} from '../../context/header-context'
import './index.scss'

let lastScrollY

const ContentPage = ({
  logoColor,
  headerBackgroundColor,
  headerVisible,
  children,
  className,
  style,
}) => {
  // const pageRef = useRef(null)
  const {setMenuPosition} = useContext(HeaderContext)

  const handlePageScroll = (e) => {
    const {scrollY} = window

    const isScrollingUp = scrollY < lastScrollY

    if (window.scrollY > 50 && (!lastScrollY || !isScrollingUp)) {
      setMenuPosition(HEADER_POSITIONS.HIDDEN)
    } else if (isScrollingUp) {
      setMenuPosition(HEADER_POSITIONS.STICKY)
    }

    lastScrollY = window.scrollY
  }

  useEffect(() => {
    setMenuPosition(HEADER_POSITIONS.STICKY)
    window.addEventListener('scroll', handlePageScroll)

    handlePageScroll()

    return () => {
      window.removeEventListener('scroll', handlePageScroll)
    }
  }, [])

  const showHeader = headerVisible !== undefined ? headerVisible : true

  return (
    <Page
      headerBackgroundColor={headerBackgroundColor}
      logoColor={logoColor}
      className={`content-page ${className ? className : ''} ${
        showHeader ? null : 'content-page--no-header'
      }`}
      style={style}
    >
      <div className="content-container">{children}</div>
    </Page>
  )
}

export default ContentPage
