import {Link} from 'gatsby'
import React, {useContext, useEffect, useState} from 'react'
import PalLogo from './pl-logo'

import {HeaderContext, HEADER_STATES} from '../context/header-context'
import '../styles/components/header.scss'
import {isSmallScreen} from '../utils'
import Button from './button'

// TODO: page transitions
// export const pageTween = (target, exiting = false) => {
//   // document.querySelector('.content')

//   TweenMax.set(target, {y: exiting ? 0 : '100%'})
//   TweenMax.to(target, 0.5, {
//     y: '0%',
//     // delay: exiting ? 0 : 0.5,
//     onComplete: () => {
//       document.body.style.overflow = 'initial'
//       requestAnimationFrame(() => {
//         const page = document.querySelector('.page', target)
//         if (page) {
//           // page.style.opacity = 0
//           page.style.opacity = 1
//         }
//       })
//     },
//     ease: Expo.easeOut,
//   })
// }

const navItems = [
  {
    url: '/',
    component: PalLogo,
    id: 'desktop-logo',
  },
  {
    title: 'Projects',
    url: '/projects',
  },
  {
    title: 'Services',
    url: '/services',
  },
  {
    title: 'Case Studies',
    url: '/case-studies',
  },
  {
    title: 'News',
    url: '/news',
  },
  {
    title: '',
    className: 'spacer',
  },
  {
    title: 'Shop',
    url: '/shop',
  },
  {
    title: 'About Us',
    url: '/about',
  },
  {
    title: 'Contact',
    url: '/contact',
  },
]

let transitionTimeout
const HeaderComponent = () => {
  const [transition, setTransition] = useState(false)
  const {menuColor, menuBackground, menuForced, navVisible, menuPosition} =
    useContext(HeaderContext)

  useEffect(() => {
    return () => {
      clearTimeout(transitionTimeout)
    }
  }, [])

  useEffect(() => {
    return () => {
      setTransition(true)
      transitionTimeout = setTimeout(() => {
        clearTimeout(transitionTimeout)
        setTransition(false)
      }, 250)
    }
  }, [navVisible])

  const getLogoColor = () => {
    const black = '#000000'
    const white = '#fffaf0'
    const setColor =
      menuColor === 'black' ? black : menuColor === 'white' ? white : menuColor

    return menuForced && setColor ? setColor : 'black'
  }

  const HeaderLink = (props) => {
    const {color, className, component: Component} = props
    return (
      // TODO: add page transition
      <Link
        to={props.to || '/'}
        activeClassName={props.activeClassName}
        partiallyActive
      >
        {Component && (
          <div className="menu-item">
            <Component color={color} />
          </div>
        )}
        {!Component && (
          <Button
            className={`link-content menu-item ${className ? className : ''}`}
            color={color}
            text={props.text}
            isStatic
          />
        )}
      </Link>
    )
  }

  const NavItem = (props) => {
    const {color, to, text, component, isStatic, className} = props
    return (
      <HeaderLink
        color={color}
        to={to}
        text={text}
        component={component}
        isStatic={isStatic}
        className={className}
        activeClassName={`link_${HEADER_STATES.ACTIVE}`}
      />
    )
  }

  const HeaderItem = (props) => {
    const {color, to, text, component, className} = props
    return (
      <NavItem
        to={to}
        text={text}
        color={color}
        className={className}
        component={component}
      />
    )
  }

  const renderNavItem = (nav, index) => {
    const logoColor = getLogoColor()

    const isDark = logoColor === 'black' || logoColor === '#1e1e1c'

    return (
      <li
        className={`site_header__nav__link ${nav.className || ''} ${
          isDark ? 'is-dark' : undefined
        }`}
        key={index}
        id={nav.id}
      >
        {nav.isExternal && (
          <a
            href={nav.url}
            target="_blank"
            className={`link-content menu-item button button ${
              nav.icon ? 'nav-icon' : ''
            } ${nav.className ? nav.className : ''}`}
          >
            {nav.icon && (
              <div className="site_header__nav__icon">{nav.icon}</div>
            )}
            {nav.text && (
              <div className="text" style={{color: logoColor}}>
                {nav.text}
              </div>
            )}
          </a>
        )}
        {!nav.isExternal && !nav.placeholder && (
          <HeaderItem
            to={nav.url}
            text={nav.title}
            color={logoColor}
            className={nav.className}
            component={nav.component}
          />
        )}
        {nav.placeholder && <div id="nav-placeholder" />}
      </li>
    )
  }

  const renderNavMenu = (navItems) => {
    return (
      <ul className={`site_header__nav menu`}>
        {navItems.map((nav, index) => renderNavItem(nav, index))}
      </ul>
    )
  }

  const renderDesktopNav = () => {
    return (
      <div>
        <nav className="site-header__menu desktop">
          <div
            className={`site-header__menu__top ${
              menuBackground ? menuBackground : ''
            }`}
          >
            {renderNavMenu(navItems)}
            <div
              className="site-header__menu__top__line"
              style={{backgroundColor: getLogoColor()}}
            ></div>
          </div>
        </nav>
      </div>
    )
  }

  return (
    <div
      className={`site-header ${
        navVisible ? 'visible' : 'hidden'
      } ${menuPosition} ${transition ? 'transition' : ''}`}
    >
      {!isSmallScreen() && renderDesktopNav()}
    </div>
  )
}

export default HeaderComponent
