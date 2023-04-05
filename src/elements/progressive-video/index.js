import React, {useRef, useEffect, useState} from 'react'
import {isInBrowser} from '../../utils'
import './index.scss'

class ProgressiveVideo extends React.Component {
  constructor(props) {
    super(props)
    this.handleVideoStart = this.handleVideoStart.bind(this)
    this.handleComplete = this.handleComplete.bind(this)
  }
  componentDidMount() {
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
      // console.log('promises supported:', noPromise)
      // console.log('little motion preferred:', userPrefersLittleMotion)
      // console.log('slow connection:', speedToSlow)
      return
    }

    // this.loadVideo()

    // const imageFade = TweenMax.to(this.image, 1, {
    //   opacity: 0.25,
    //   repeat: -1,
    //   yoyo: true,
    // })
  }

  componentWillUnmount() {
    this.video.removeEventListener('play', this.handleVideoStart)
    this.video.removeEventListener('ended', this.handleComplete)
    if (!this.hasLoaded) {
      this.cancelLoad()
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.pause !== this.props.pause) {
      if (nextProps.pause) {
        this.video.pause()
      } else {
        this.video.play()
      }
    }
  }

  loadVideo() {
    this.setSource()
    // Reload the video with the new sources added.
    this.video.load()
    this.checkLoadTime()
  }

  /**
   * Find the children of the video that are <source> tags.
   * Set the src attribute for each <source> based on the
   * data-src attribute.
   *
   * @param {DOM Object} video
   */
  setSource() {
    let children = Array.from(this.video.children)
    children.forEach((child) => {
      if (
        child.tagName === 'SOURCE' &&
        typeof child.dataset.src !== 'undefined'
      ) {
        child.setAttribute('src', child.dataset.src)
      }
    })
  }

  checkLoadTime() {
    // Create a promise that resolves when the
    // video.canplaythrough event triggers.
    let videoLoad = new Promise((resolve) => {
      this.video.addEventListener('canplaythrough', () => {
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

    if (!this.props.neverTimeout) {
      promises.push(videoTimeout)
    }
    // Race the promises to see which one resolves first.
    Promise.race(promises).then((data) => {
      if (!this || !this.video) return
      if (data === 'can play') {
        this.hasLoaded = true
        if (this.props.onLoaded) {
          this.props.onLoaded()
        }
        this.video.pause()
        this.video.addEventListener('play', this.handleVideoStart)
        if (!this.props.pause) {
          this.video.play()
        }

        this.video.addEventListener('ended', this.handleComplete)
      } else {
        this.cancelLoad()
      }
    })
  }
  /**
   * Cancel the video loading by removing all
   * <source> tags and then triggering video.load().
   *
   * @param {DOM object} video
   */

  cancelLoad() {
    // console.log('canceling video load')
    let children = Array.from(this.video.children)
    children.forEach((child) => {
      if (
        child.tagName === 'SOURCE' &&
        typeof child.dataset.src !== 'undefined'
      ) {
        child.parentNode.removeChild(child)
      }
    })
    this.videoContainer.classList.add('cancelled-load')

    this.video.load()
  }

  handleVideoStart = () => {
    // console.log('handle video start')
    if (this.videoContainer) {
      this.videoContainer.classList.add('is-loaded')
    }
    if (this.props.onStart) {
      requestAnimationFrame(() => {
        this.props.onStart()
      })
    }
  }

  handleComplete = () => {
    this.video.pause()
    this.video.currentTime = this.video.duration

    if (this.props.onComplete) {
      this.props.onComplete()
    }
  }

  render() {
    const {sources, image, onComplete, fadeIn, loop} = this.props
    return (
      <div
        key={JSON.stringify(sources)}
        className={`progressive-video ${
          fadeIn !== undefined && !fadeIn ? 'no-fade' : 'fade'
        }`}
        ref={(ref) => (this.videoContainer = ref)}
      >
        <video
          playsInline={true}
          muted
          loop={loop}
          ref={(ref) => (this.video = ref)}
        >
          {sources.map((source, index) => {
            const {src, type} = source
            return <source key={index} data-src={src} type={type} />
          })}
        </video>
        {image && (
          <div className="progressive-video__image">
            <img src={image} ref={(ref) => (this.image = ref)} />
          </div>
        )}
      </div>
    )
  }
}

export default ProgressiveVideo
