import React, {useEffect, useRef, useState} from 'react'
import ProgressiveVideo from '../../elements/progressive-video'
import './index.scss'

const VideoClips = ({isActive, videos}) => {
  const prevIsActive = useRef()
  const [activeVideo, setActiveVideo] = useState(0)
  const [queuedVideo, setQueuedVideo] = useState()
  const [videoAActive, setVideoAActive] = useState(true)
  const onlyOneVideo = videos.length === 1

  useEffect(() => {
    if (prevIsActive.current && isActive && !prevIsActive?.current) {
      let randomVideo
      if (videoAActive) {
        randomVideo = getRandomVideo(activeVideo)
        setActiveVideo(randomVideo || videos[0])
      } else {
        randomVideo = getRandomVideo(queuedVideo)
        setQueuedVideo(randomVideo)
      }
    }
    prevIsActive.current = isActive
  }, [isActive, videos, queuedVideo, videoAActive, activeVideo])

  const getRandomVideo = (currentVideo) => {
    if (onlyOneVideo) {
      return
    }
    const videosNotIncludingActive = videos
      .map((_, index) => index)
      .filter((id) => id !== currentVideo)

    const max = videosNotIncludingActive.length
    const randomIndex = Math.floor(Math.random() * max)

    return videosNotIncludingActive[randomIndex]
  }

  const setRandomVideoB = () => {
    const randomVideo = getRandomVideo(activeVideo)
    setQueuedVideo(randomVideo)
  }

  const setRandomVideoA = () => {
    const randomVideo = getRandomVideo(queuedVideo)
    setActiveVideo(randomVideo)
  }

  const makeVideoAActive = (active) => {
    requestAnimationFrame(() => {
      setVideoAActive(active)
      // requestAnimationFrame(() => {
      //     if (active) {
      //         this.setState({
      //             queuedVideo: undefined
      //         })
      //     } else {
      //         this.setState({
      //             activeVideo: undefined
      //         })
      //     }
      // })
    })
  }

  return (
    <div className="video-clips">
      <div
        key={activeVideo}
        style={{zIndex: videoAActive ? 1 : 0}}
        className={`video-clips__content__video ${
          videoAActive ? 'active' : 'inactive'
        }`}
      >
        <ProgressiveVideo
          sources={[
            {
              src: videos[activeVideo],
              type: 'video/mp4',
            },
          ]}
          pause={!isActive || !videoAActive}
          neverTimeout={true}
          loop={onlyOneVideo}
          fadeIn={false}
          onComplete={() => {
            if (!onlyOneVideo) {
              makeVideoAActive(false)
            }
          }}
          onStart={() => {
            if (!onlyOneVideo) {
              setRandomVideoB()
            }
          }}
          // image={image ? image.childImageSharp.fluid.src : {}}
        />
      </div>
      {queuedVideo !== undefined && (
        <div
          key={queuedVideo}
          style={{zIndex: videoAActive ? 0 : 1}}
          className={`video-clips__content__video ${
            !videoAActive ? 'active' : 'inactive'
          }`}
        >
          <ProgressiveVideo
            sources={[
              {
                src: videos[queuedVideo],
                type: 'video/mp4',
              },
            ]}
            pause={!isActive || videoAActive}
            neverTimeout={true}
            loop={false}
            fadeIn={false}
            onComplete={() => {
              makeVideoAActive(true)
            }}
            onStart={() => {
              setRandomVideoA()
            }}
            // image={image ? image.childImageSharp.fluid.src : {}}
          />
        </div>
      )}
    </div>
  )
}

export default VideoClips
