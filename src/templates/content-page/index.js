import React, {useState, useEffect, useContext, useRef} from 'react'
import Page from '../page'

import {HeaderContext, HEADER_POSITIONS} from '../../context/header-context'
import './index.scss'

let lastScrollY

const ContentPage = ({
  logoColor,
  headerBackgroundColor,
  headerVisible,
  scrollHandler,
  render,
  children,
  className,
  style,
}) => {
  const pageRef = useRef(null)
  const {setMenuPosition} = useContext(HeaderContext)
  const [shouldRender, setShouldRender] = useState(false)

  const handlePageScroll = (e) => {
    if (scrollHandler) {
      scrollHandler(pageRef.current.scrollTop, pageRef.current)
    }
    const {scrollTop} = pageRef.current
    const isScrollingUp = scrollTop < lastScrollY

    if (pageRef.current.scrollTop > 50 && (!lastScrollY || !isScrollingUp)) {
      setMenuPosition(HEADER_POSITIONS.HIDDEN)
    } else if (isScrollingUp) {
      setMenuPosition(HEADER_POSITIONS.STICKY)
    }

    lastScrollY = pageRef.current.scrollTop
  }

  const setContentHeight = () => {
    if (pageRef.current) {
      pageRef.current.style.height = window.innerHeight + 'px'
    }
  }

  useEffect(() => {
    setMenuPosition(HEADER_POSITIONS.STICKY)
    pageRef.current?.addEventListener('scroll', handlePageScroll)

    window.addEventListener('resize', setContentHeight)

    handlePageScroll()
    setContentHeight()

    requestAnimationFrame(() => {
      setShouldRender(true)
    })

    return () => {
      pageRef.current?.removeEventListener('scroll', handlePageScroll)
      window.removeEventListener('resize', setContentHeight)
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
      <div className="content" ref={pageRef}>
        <div className="content-container">
          {render && shouldRender && render({parent: pageRef.current})}
          {!render && children}
        </div>
      </div>
    </Page>
  )
}

export default ContentPage
