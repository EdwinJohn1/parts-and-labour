import {Link} from 'gatsby'
import React from 'react'
import TransitionElement from '../../elements/transition-element'
import ImageModal from '../image-modal'
import withModal from '../../hooks/with-modal'
import placeholder from '../../images/placeholder-pixel.jpg'
import './index.scss'

const ProjectBlock = ({
  image,
  title,
  link,
  gallery,
  children,
  root,
  openModal,
  closeModal,
  modal,
  className,
}) => {
  const isGifImg = image && !image.childImageSharp && image.extension === 'gif'

  const ModalComponent = modal || (
    <ImageModal
      images={gallery}
      active={0}
      handleCloseClick={() => {
        closeModal()
        // if (modalCloseRedirect) {
        //     navigate(modalCloseRedirect)
        // }
      }}
    />
  )

  const imgEl = image && (
    <img
      className={`project-block__image ${isGifImg ? 'square' : 'billboard'} ${
        gallery ? 'has-gallery' : ''
      }`}
      src={placeholder}
      // src={isGifImg ? image.publicURL : image.childImageSharp.fluid.src}
      alt={`Image for news item ${title || ''}`}
      onClick={() => {
        if (modal || gallery) {
          openModal(ModalComponent)
        }
      }}
    />
  )

  // console.log(title, imgEl)

  return (
    <TransitionElement
      className={`project-block ${className || ''}`}
      root={root}
      threshold="0.2"
      triggerOnce={true}
    >
      <div className="project-block__project two-column-section">
        <div className="section section--left project-block__project-description">
          {children}
        </div>
        <div className="divider"></div>
        <div className="section section--right">
          {link ? (
            <div className="project-block__link">
              <Link to={link}>{imgEl}</Link>{' '}
            </div>
          ) : (
            imgEl
          )}
        </div>
      </div>
    </TransitionElement>
  )
}

export default withModal(ProjectBlock)
