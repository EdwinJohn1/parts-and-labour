import React, {useEffect, useState} from 'react'
import ReactDOM from 'react-dom'
import {isInBrowser} from '../../utils'

import './index.scss'

const Modal = ({
  modalRoot,
  onClose,
  className,
  type = 'slide',
  isOpen,
  children,
}) => {
  const [portalRoot, setPortalRoot] = useState()
  useEffect(() => {
    if (isInBrowser) {
      setPortalRoot(document.querySelector(modalRoot || '#modal-container'))
    }
  }, [modalRoot])

  const modal = (
    <div
      className={`modal modal--${type} ${className || ''} ${
        isOpen ? 'is-open' : 'is-closed'
      }`}
    >
      <div className="modal__background" onClick={() => onClose()}></div>
      <div className="modal__content">{children}</div>
    </div>
  )
  return portalRoot ? ReactDOM.createPortal(modal, portalRoot) : <div />
}

export default Modal
