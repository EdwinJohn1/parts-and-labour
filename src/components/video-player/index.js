import React, {useEffect, useRef, useState} from 'react'
import './index.scss'

if (typeof window !== `undefined`) {
  // from https://stackoverflow.com/a/31196707
  Object.defineProperty(HTMLMediaElement.prototype, 'playing', {
    get: function () {
      return !!(
        this.currentTime > 0 &&
        !this.paused &&
        !this.ended &&
        this.readyState > 2
      )
    },
  })
}

let updateRequest

const VideoPlayer = (props) => {
  const {
    active,
    play,
    onPlay,
    onPause,
    onVideoEnd,
    hideControls,
    allowKeyPressWhileInactive,
  } = props
  const videoRef = useRef(null)
  const progressRef = useRef(null)
  const scrubberRef = useRef(null)
  const [canPlay, setCanPlay] = useState(false)

  const isActive = active !== undefined ? active : true

  useEffect(() => {
    videoRef.current.addEventListener('canplay', handlePlayerStart)
    videoRef.current.addEventListener('ended', handlePlayerEnd)
    progressRef.current.addEventListener('click', handleProgressClick)
    document.addEventListener('keypress', handleKeyPress)

    return () => {
      if (updateRequest) {
        window.cancelAnimationFrame(updateRequest)
      }
      videoRef.current?.removeEventListener('canplay', handlePlayerStart)
      videoRef.current?.removeEventListener('ended', handlePlayerEnd)
      progressRef.current?.removeEventListener('click', handleProgressClick)
      document.removeEventListener('keypress', handleKeyPress)
    }
  }, [])

  useEffect(() => {
    if (!videoRef.current) return
    if (!play && videoRef.current.playing) {
      videoRef.current.pause()
    } else if (play && !videoRef.current.playing) {
      videoRef.current.play()
    }
  }, [play])

  const handlePlayerStart = (e) => {
    setCanPlay(true)
    positionScrubber()
  }

  const handlePlayerEnd = (e) => {
    window.cancelAnimationFrame(updateRequest)
    if (onVideoEnd) {
      onVideoEnd()
    }
  }

  const positionScrubber = () => {
    if (!videoRef.current) return
    const percentComplete =
      (videoRef.current.currentTime / videoRef.current.duration) * 100
    scrubberRef.current.style.transform = `translate3d(${percentComplete}%, 0, 0)`
    updateRequest = requestAnimationFrame(positionScrubber)
  }

  const handleKeyPress = (e) => {
    if (!isActive && !allowKeyPressWhileInactive) {
      return e
    }
    e.preventDefault()
    const {which} = e
    if (which === 32) {
      togglePause()
    }
  }

  const togglePause = () => {
    if (!videoRef.current) return
    if (!canPlay) return
    if (videoRef.current.paused) {
      videoRef.current.play()
      onPlay && onPlay()
    } else {
      videoRef.current.pause()
      onPause && onPause()
    }
  }

  const handleProgressClick = (e) => {
    if (!videoRef.current) return
    const {width} = progressRef.current.getBoundingClientRect()

    const progress = e.layerX / width
    const time = progress * videoRef.current.duration
    if (!isNaN(time)) {
      videoRef.current.currentTime = time
    }
    videoRef.current.play()
  }

  return (
    <div className="video-player">
      <div className="video-player__player">
        <video ref={videoRef} {...props} onClick={() => togglePause()} />
      </div>
      <div
        ref={progressRef}
        className={`video-player__progress-bar ${
          hideControls ? 'hidden' : 'visible'
        }`}
      >
        <div className="video-player__progress-bar__bar" />
        <div ref={scrubberRef} className="video-player__progress-bar__scrubber">
          <div className="video-player__progress-bar__scrubber__dot" />
        </div>
      </div>
    </div>
  )
}

export default VideoPlayer
