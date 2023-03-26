import React, {useState} from 'react'

import Modal from '../elements/modal'

let modalTimeout

export const withModal = (
  WrappedComponent,
  {type, className, modalRoot = '#modal-container', shouldLog} = {}
) => {
  return (props) => {
    const [content, setContent] = useState()
    const [active, setActive] = useState(false)

    const openModal = (content) => {
      setContent(content)
      setActive(true)
      document.body.style = 'overflow: hidden'
    }

    const closeModal = () => {
      setActive(false)
      modalTimeout = setTimeout(() => {
        modalTimeout = null
        setContent(null)
        document.body.style = 'overflow: initial'
      }, 500)
    }

    const ModalComponent = content

    return (
      <div>
        <WrappedComponent
          openModal={openModal}
          closeModal={closeModal}
          modalActive={active}
          {...props}
        />
        <Modal
          className={className}
          isOpen={active}
          type={type}
          onClose={closeModal}
          modalRoot={modalRoot}
        >
          {ModalComponent}
        </Modal>
      </div>
    )
  }
}

export default withModal
