import {getImage} from 'gatsby-plugin-image'
import React from 'react'
import arrowWhite from '../../images/icons/arrow-white.svg'
import './index.scss'

const ImageModal = ({images, active, handleCloseClick}) => {
  const [activeImage, setActiveImage] = React.useState(active)
  const [transition, setTransition] = React.useState()
  const [transitionTimeout, setTransitionTimeout] = React.useState()
  const [imageIsFullscreen, setImageIsFullscreen] = React.useState(false)

  React.useEffect(() => {
    document.addEventListener('keyup', handleKeyPress)

    return () => document.removeEventListener('keyup', handleKeyPress)
  })

  const handleKeyPress = (e) => {
    console.log('key press')
    if (imageIsFullscreen) {
      return e
    }
    e.preventDefault()
    const {which} = e
    if (which === 38) {
      prevClick()
    } else if (which === 40) {
      nextClick()
    }
  }

  // Update active image if externally changed
  React.useEffect(() => {
    setActiveImage(active)
  }, [active])

  // Clear transition timeout if it still exists;
  React.useEffect(() => {
    return () => transitionTimeout && clearTimeout(transitionTimeout)
  })

  const prevClick = (e) => {
    const prev = activeImage === images.length - 1 ? 0 : activeImage + 1
    setTransition('prev')
    setActiveImage(prev)
    // handlePrevClick(true);
  }

  const nextClick = (e) => {
    const next = activeImage === 0 ? images.length - 1 : activeImage - 1
    setActiveImage(next)

    // setActiveImage(next);
    // handleNextClick(true)
  }

  const onClose = (e) => {
    if (!imageIsFullscreen) {
      handleCloseClick()
    } else {
      setImageIsFullscreen(false)
    }
  }

  return (
    <div className="image-player-modal">
      <div
        className={`image-player-modal__carousel ${
          transition
            ? 'image-player-modal__carousel--transition image-player-modal__carousel--transition-' +
              transition
            : ''
        }`}
        onWheel={(e) => {
          if (e.deltaY < -50) {
            nextClick()
          } else if (e.deltaY > 50) {
            prevClick()
          }
        }}
      >
        <div className={`image-player-modal__slide`}>
          <div
            className={`image-player-modal__slide__container ${
              !imageIsFullscreen && !transition
                ? 'image-player-modal__slide__container--can-bounce'
                : ''
            }`}
            onMouseEnter={(e) => {
              !imageIsFullscreen &&
                !transition &&
                e.currentTarget.classList.add(
                  'image-player-modal__slide__container--bounce'
                )
            }}
            onMouseLeave={(e) => {
              e.currentTarget.classList.remove(
                'image-player-modal__slide__container--bounce'
              )
            }}
          >
            <ImagePanel
              index={activeImage}
              isActiveImage={!transition}
              image={images[activeImage]}
              handleFullscreenChange={(isFullscreen) =>
                setImageIsFullscreen(isFullscreen)
              }
              externallySetFullscreen={imageIsFullscreen}
            />
          </div>
        </div>
      </div>
      <div className="image-player-modal__ui">
        <button className={`close`} onClick={onClose} tabIndex="0" />
        {!imageIsFullscreen && images.length > 0 && (
          <button onClick={prevClick} className={`nav-btn nav-btn--left`}>
            <img src={arrowWhite} />
          </button>
        )}

        {!imageIsFullscreen && images.length > 0 && (
          <button onClick={nextClick} className={`nav-btn nav-btn--right`}>
            <img src={arrowWhite} />
          </button>
        )}
      </div>
    </div>
  )
}

const ImagePanel = ({
  image,
  handleFullscreenChange,
  externallySetFullscreen,
  isActiveImage,
}) => {
  const [fullscreen, setFullscreen] = React.useState(externallySetFullscreen)

  React.useEffect(() => {
    setFullscreen(externallySetFullscreen)
  }, [externallySetFullscreen])

  const hideFullScreen = () => {
    setFullscreen(false)

    handleFullscreenChange && handleFullscreenChange(false)
  }
  const showFullScreen = () => {
    setFullscreen(true)
    handleFullscreenChange && handleFullscreenChange(true)
  }

  // const isGifImg = !src.childImageSharp && src.extension === 'gif'
  const gatsbyImage = getImage(image)
  return (
    <div
      className={`image-panel ${isActiveImage ? 'image-panel--active' : ''} ${
        fullscreen ? 'image-panel--fullscreen' : 'image-panel--shrink'
      }`}
      onClick={() => {
        if (!isActiveImage) {
          return
        }
        fullscreen ? hideFullScreen() : showFullScreen()
      }}
    >
      <div
        className={`image-panel__image ${
          fullscreen
            ? 'image-panel__image--active'
            : 'image-panel__image--hidden'
        }`}
      >
        <img
          srcSet={gatsbyImage.images.sources[0].srcSet}
          src={gatsbyImage.placeholder.fallback}
        />
        {/* <img
          src={isGifImg ? src.publicURL : src?.childImageSharp?.fluid?.src}
        /> */}
      </div>
    </div>
  )
}

export default ImageModal
