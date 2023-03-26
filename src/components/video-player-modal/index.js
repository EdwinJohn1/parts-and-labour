import {graphql, StaticQuery} from 'gatsby'
import React from 'react'
import VideoPlayer from '../video-player'
import './index.scss'

const VideoCarousel = ({
  videos,
  active,
  handleCloseClick,
  autoplay,
  autoclose,
}) => {
  const [activeVideo, setActiveVideo] = React.useState(active)
  const [transition, setTransition] = React.useState()
  const [transitionTimeout, setTransitionTimeout] = React.useState()
  const [videoIsFullscreen, setVideoIsFullscreen] = React.useState(autoplay)

  // Update active video if externally changed
  React.useEffect(() => {
    setActiveVideo(active)
  }, [active])

  // Clear transition timeout if it still exists;
  React.useEffect(() => {
    return () => transitionTimeout && clearTimeout(transitionTimeout)
  })

  const onClose = (e) => {
    if (!videoIsFullscreen) {
      handleCloseClick()
    } else {
      setVideoIsFullscreen(false)
    }
  }

  return (
    <div className="video-player-modal">
      <div
        className={`video-player-modal__carousel ${
          transition
            ? 'video-player-modal__carousel--transition video-player-modal__carousel--transition-' +
              transition
            : ''
        }`}
      >
        <div
          className={`video-player-modal__slide ${
            transition
              ? 'video-player-modal__slide--transition ' + transition
              : ''
          }`}
        >
          <div
            className={`video-player-modal__slide__container ${
              videoIsFullscreen
                ? 'video-player-modal__slide__container--enabled'
                : ''
            }`}
          >
            <VideoPanel
              key={activeVideo}
              isActiveVideo={!transition}
              video={videos[activeVideo]}
              onClose={onClose}
              handleFullscreenChange={(isFullscreen) =>
                setVideoIsFullscreen(isFullscreen)
              }
              externallySetFullscreen={videoIsFullscreen}
              autoplay={autoplay}
              autoclose={autoclose}
              handleCloseClick={handleCloseClick}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

const VideoPanel = ({
  video,
  onClose,
  handleFullscreenChange,
  externallySetFullscreen,
  isActiveVideo,
  autoplay,
  autoclose,
  handleCloseClick,
}) => {
  const [hideUi, setHideUi] = React.useState(true)
  const [hidePlayer, setHidePlayer] = React.useState(!autoplay)
  const [fullscreen, setFullscreen] = React.useState(externallySetFullscreen)
  let uiTimer

  React.useEffect(() => {
    if (uiTimer) {
      clearTimeout(uiTimer)
    }
    if (!hideUi && fullscreen) {
      uiTimer = setTimeout(() => {
        uiTimer = undefined
        setHideUi(true)
      }, 5000)
    } else if (!fullscreen) {
      setHideUi(true)
    }

    return () => {
      clearTimeout(uiTimer)
    }
  }, [hideUi, fullscreen])

  React.useEffect(() => {
    setFullscreen(externallySetFullscreen)
  }, [externallySetFullscreen])

  const hideFullScreen = () => {
    if (!autoplay) {
      setFullscreen(false)

      handleFullscreenChange && handleFullscreenChange(false)
    }
  }
  const showFullScreen = () => {
    if (!autoplay) {
      setFullscreen(true)
      setHideUi(false)
      handleFullscreenChange && handleFullscreenChange(true)
      if (hidePlayer) {
        setHidePlayer(false)
      }
    }
  }

  const {
    src,
    title,
    category,
    client,
    cover,
    billboard,
    creditName,
    creditSlug,
    year,
  } = video

  return (
    <StaticQuery
      query={graphql`
        query {
          allDirectorsYaml {
            edges {
              node {
                slug
                name
                bio
              }
            }
          }
        }
      `}
      render={(directorsData) => {
        const directors = directorsData.allDirectorsYaml.edges.map(
          (director) => director.node
        )
        const director = directors.find(
          (director) => director.slug === creditSlug
        )
        const coverImage = (cover || billboard)?.childImageSharp.fluid.src // || tempImage;
        return (
          <>
            <div
              className={`video-panel__header ${
                fullscreen && hideUi ? 'hidden' : 'visible'
              }`}
            >
              <div className="video-panel__header__left">
                <p className="responsive">
                  <span className="bold">{title}</span>{' '}
                  <span className="small">By</span> {director.name}
                </p>
                <p className="responsive">
                  <span className="small">For</span>{' '}
                  <span className="italic">{client}</span>
                  {category ? `, ${category} ` : ' '}
                  {year && (
                    <>
                      ( <span className="cursive-font bold">{year}</span> )
                    </>
                  )}
                </p>
              </div>
              <div className="video-panel__header__center"></div>
              <div className="video-panel__header__right"></div>
            </div>
            <div
              className={`video-panel ${
                isActiveVideo ? 'video-panel--active' : ''
              } ${
                fullscreen ? 'video-panel--fullscreen' : 'video-panel--shrink'
              }`}
            >
              <div
                className="video-panel__scrim"
                onClick={() => {
                  if (autoplay) {
                    handleCloseClick && handleCloseClick()
                  } else {
                    fullscreen && hideFullScreen()
                  }
                }}
              ></div>
              <div
                className={`video-panel__video ${
                  fullscreen
                    ? 'video-panel__video--active'
                    : 'video-panel__video--hidden'
                }`}
                onPointerMove={() => fullscreen && setHideUi(false)}
                onClick={() => {
                  !fullscreen && showFullScreen(true)
                }}
              >
                <div
                  className={`video-panel__player ${
                    hidePlayer
                      ? 'video-panel__player--hidden'
                      : 'video-panel__player--active'
                  }`}
                >
                  <VideoPlayer
                    src={src}
                    onVideoEnd={hideFullScreen}
                    autoPlay={autoplay}
                    play={isActiveVideo && fullscreen}
                    hideControls={hideUi}
                    active={isActiveVideo && fullscreen}
                    onPause={hideFullScreen}
                    onPlay={showFullScreen}
                    allowKeyPressWhileInactive={true}
                  />
                  {!fullscreen && (
                    <div
                      className={`video-panel__cover ${
                        !fullscreen
                          ? 'video-panel__cover--active'
                          : 'video-panel__cover--hidden'
                      } ${coverImage ? 'video-panel__cover--has-cover' : ''}`}
                    >
                      {hidePlayer && coverImage && <img src={coverImage} />}
                      <div
                        className={`video-panel__meta ${
                          isActiveVideo ? 'video-panel__meta--display' : ''
                        }`}
                      >
                        <div className="video-panel__meta__text">
                          <p className="responsive">
                            {title} - {client}
                          </p>
                        </div>
                        <div className="video-panel__meta__text">
                          <p className="responsive">{creditName}</p>
                        </div>
                        <div className="video-panel__meta__text">
                          <p className="responsive">( {year} )</p>
                        </div>
                        <div className="video-panel__meta__text">
                          <p className="responsive">
                            <br />
                            Play
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
        )
      }}
    />
  )
}

export default VideoCarousel
