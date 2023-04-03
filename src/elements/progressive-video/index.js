import React, {useRef, useEffect, useState} from 'react'
import './index.scss'

const ProgressiveVideo = ({
  pause,
  onLoaded,
  onStart,
  onComplete,
  sources,
  image,
  fadeIn,
  loop,
  neverTimeout,
}) => {
  const videoRef = useRef(null)
  const imageRef = useRef(null)
  const videoContainerRef = useRef(null)
  const [hasLoaded, setHasLoaded] = useState(false)

  useEffect(() => {
    let connectionType
    if (window && window.navigator && window.navigator.connection) {
      connectionType = window.navigator.connection.effectiveType
    }

    const noPromise = typeof Promise === 'undefined'
    const userPrefersLittleMotion = window.matchMedia(
      '(prefers-reduced-motion)'
    ).matches

    const speedToSlow =
      connectionType === 'slow-2g' ||
      connectionType === '2g' ||
      connectionType === '3g'

    // Abort when:
    //  - The browser does not support Promises.
    //  - If the user prefers reduced motion.
    //  - Device is mobile.
    if (noPromise || userPrefersLittleMotion || speedToSlow) {
      return
    }
    loadVideo()

    return () => {
      videoRef.current.removeEventListener('play', handleVideoStart)
      videoRef.current.removeEventListener('ended', handleComplete)
      if (!hasLoaded) {
        cancelLoad()
      }
    }
  }, [])

  useEffect(() => {
    if (pause) {
      videoRef.current.pause()
    } else {
      videoRef.current.play()
    }
  }, [pause])

  const loadVideo = () => {
    setSource()
    // Reload the video with the new sources added.
    videoRef.current.load()
    checkLoadTime()
  }

  const setSource = () => {
    let children = Array.from(videoRef.current.children)
    children.forEach((child) => {
      if (
        child.tagName === 'SOURCE' &&
        typeof child.dataset.src !== 'undefined'
      ) {
        child.setAttribute('src', child.dataset.src)
      }
    })
  }

  const checkLoadTime = () => {
    // Create a promise that resolves when the
    // video.canplaythrough event triggers.
    let videoLoad = new Promise((resolve) => {
      videoRef.current.addEventListener('canplaythrough', () => {
        resolve('can play')
      })
    })

    // Create a promise that resolves after a
    // predetermined time (2sec)
    let videoTimeout = new Promise((resolve) => {
      setTimeout(() => {
        resolve('The video timed out.')
      }, 7500)
    })

    const promises = [videoLoad]

    if (!neverTimeout) {
      promises.push(videoTimeout)
    }
    // Race the promises to see which one resolves first.
    Promise.race(promises).then((data) => {
      if (!this || !videoRef.current) return
      if (data === 'can play') {
        setHasLoaded(true)
        if (onLoaded) {
          onLoaded()
        }
        videoRef.current.pause()
        videoRef.current.addEventListener('play', handleVideoStart)
        if (!pause) {
          videoRef.current.play()
        }

        videoRef.current.addEventListener('ended', handleComplete)
      } else {
        cancelLoad()
      }
    })
  }

  const cancelLoad = () => {
    let children = Array.from(videoRef.current.children)
    children.forEach((child) => {
      if (
        child.tagName === 'SOURCE' &&
        typeof child.dataset.src !== 'undefined'
      ) {
        child.parentNode.removeChild(child)
      }
    })
    videoContainerRef.current.classList.add('cancelled-load')
    videoRef.current.load()
  }

  const handleVideoStart = () => {
    if (videoContainerRef.current) {
      videoContainerRef.current.classList.add('is-loaded')
    }
    if (onStart) {
      requestAnimationFrame(() => {
        onStart()
      })
    }
  }

  const handleComplete = () => {
    videoRef.current.pause()
    videoRef.current.currentTime = videoRef.current.duration

    if (onComplete) {
      onComplete()
    }
  }

  return (
    <div
      key={JSON.stringify(sources)}
      className={`progressive-video ${
        fadeIn !== undefined && !fadeIn ? 'no-fade' : 'fade'
      }`}
      ref={videoContainerRef}
    >
      <video playsInline={true} muted loop={loop} ref={videoRef}>
        {sources.map((source, index) => {
          const {src, type} = source
          return <source key={index} data-src={src} type={type} />
        })}
      </video>
      {image && (
        <div className="progressive-video__image">
          <img src={image} ref={imageRef} />
        </div>
      )}
    </div>
  )
}

export default ProgressiveVideo
