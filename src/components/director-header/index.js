import React from 'react'
import Bio from '../director-bio'
import withModal from '../../hooks/with-modal'
import './index.scss'

const DirectorHeader = ({
  director,
  headline,
  subheadline,
  openModal,
  closeModal,
  onBioOpen,
  onBioClose,
}) => {
  const BioModal = (
    <div key={director.name} className="director-page__bio">
      <Bio
        {...director}
        handleCloseClick={() => {
          closeModal && closeModal()
          onBioClose && onBioClose()
        }}
      />
    </div>
  )
  const bioButton = (
    <p
      className="cursive-font bold normal-case display"
      tabIndex={0}
      style={{cursor: 'pointer'}}
      onClick={() => {
        openModal && openModal(BioModal)
        onBioOpen && onBioOpen()
      }}
    >
      Bio.
    </p>
  )

  return (
    <>
      <div className="director__header flex-container">
        <div className="flex-container__left">
          <div className="spacing spacing--small-alt no-top"></div>
          <h1 className="heading-1--size-2">
            <span className="name-block--outer">
              <span className="name-block--inner">
                {headline || director.name}
              </span>
            </span>
          </h1>
        </div>
        <div className="flex-container__center"></div>
        <div className="flex-container__right"></div>
      </div>
      <div className="spacing spacing--tiny spacing-top--small-alt line"></div>
      <div className="spacing spacing--tiny no-top"></div>
      <div className="flex-container">
        <div className="flex-container__left">
          <h2
            className="responsive standard normal-case heading-1--size-3"
            style={{display: 'inline-block'}}
          >
            {subheadline || director.role}
          </h2>
        </div>
        <div className="flex-container__center"></div>
        <div className="flex-container__right">{bioButton}</div>
      </div>
      <div className="spacing spacing--medium line"></div>
    </>
  )
}

export default withModal(DirectorHeader, {
  className: 'align-top',
  shouldLog: true,
})
