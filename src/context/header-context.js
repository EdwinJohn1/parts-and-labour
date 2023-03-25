import React, {useState, createContext, useContext} from 'react'

export const HEADER_POSITIONS = {
  STICKY: 'sticky',
  HIDDEN: 'unsticky',
}

export const HEADER_STATES = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  GOING_INACTIVE: 'going-inactive',
}

const initialState = {
  showLogo: false,
  navVisible: true,
  cancelLogoAnimation: true,
  position: HEADER_POSITIONS.STICKY,
}

export const HeaderContext = createContext(initialState)

export const HeaderProvider = ({children}) => {
  const [menuBackground, setMenuBackground] = useState()
  const [menuPosition, setMenuPosition] = useState(HEADER_POSITIONS.STICKY)
  const [logoToggled, toggleLogo] = useState(false)
  const [navVisible, toggleNavVisibility] = useState(true)
  const [logoFixed, toggleLogoFixed] = useState()
  const [forcedLogoColor, setForcedLogoColor] = useState()
  const [modalActive, setModalActive] = useState(false)

  const value = React.useMemo(
    () => ({
      menuBackground,
      menuPosition,
      logoToggled,
      navVisible,
      logoFixed,
      forcedLogoColor,
      modalActive,
      setMenuBackground,
      setMenuPosition,
      toggleLogo,
      toggleNavVisibility,
      toggleLogoFixed,
      setForcedLogoColor,
      setModalActive,
    }),
    [
      menuBackground,
      menuPosition,
      logoToggled,
      navVisible,
      logoFixed,
      modalActive,
    ]
  )

  return (
    <HeaderContext.Provider
      value={{
        ...value,
      }}
    >
      {children}
    </HeaderContext.Provider>
  )
}
