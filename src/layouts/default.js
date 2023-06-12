import React from 'react'
import HeaderComponent from '../components/header'
import {HeaderProvider} from '../context/header-context'
import '../styles/app.scss'

const DefaultLayout = ({children}) => {
  return (
    <HeaderProvider>
      {/* TEMP Placeholder Content */}
      {/* <HeaderComponent /> */}
      {children}
    </HeaderProvider>
  )
}

export default DefaultLayout
