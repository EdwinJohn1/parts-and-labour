import {graphql, useStaticQuery} from 'gatsby'
import {GatsbyImage, getImage} from 'gatsby-plugin-image'
import {TweenMax} from 'gsap'
import React, {useEffect, useRef, useState} from 'react'
import InViewWrapper from '../../elements/in-view-wrapper'
import './index.scss'

let scrollTween, dragStart, tweenStartTime, lastDrag, dragVelo

const LogoMarquee = ({root}) => {
  const marquee = useRef(null)
  // const [scroll, shouldScroll] = useState(true)

  const {allLogosYaml} = useStaticQuery(graphql`
    query {
      allLogosYaml {
        edges {
          node {
            image {
              ...logoImage
            }
          }
        }
      }
    }
  `)
  const logos = allLogosYaml.edges.map(({node}) => getImage(node.image))
  useEffect(() => {
    scrollTween = TweenMax.to(marquee.current, logos.length * 5, {
      x: '-100%',
      ease: 'linear',
      repeat: -1,
    })
    scrollTween.pause()
  }, [])

  const startDrag = (e) => {
    dragStart = e.clientX || e.touches[0]?.clientX
    tweenStartTime = scrollTween.time()
    scrollTween.pause()
  }

  const handleDrag = (e) => {
    if (dragStart) {
      const drag = ((e.clientX || e.touches[0]?.clientX) - dragStart) / 1.5
      if (lastDrag) {
        dragVelo = lastDrag - drag
      }
      lastDrag = drag
      const duration = logos.length * 5
      const percent = drag / marquee.current.offsetWidth
      scrollTween.seek(tweenStartTime - duration * percent)
    }
  }

  const stopDrag = (e) => {
    const duration = logos.length * 5
    const velocity = {val: dragVelo}

    TweenMax.to(velocity, Math.abs(dragVelo) / 60, {
      val: 0,
      ease: 'Expo.easeOut',
      onUpdate: () => {
        const percent = velocity.val / marquee.current.offsetWidth

        if (Math.abs(velocity.val) < 1.75) {
          if (scrollTween.paused()) {
            scrollTween.play()
          }
        } else {
          scrollTween.seek(scrollTween.time() + duration * percent)
        }
      },
      onComplete: () => {
        scrollTween.play()
      },
    })

    dragStart = undefined
    lastDrag = undefined
    dragVelo = undefined
  }

  const renderLogos = (logos, duplicate, key) => {
    return (
      <div className={`logos__container ${duplicate ? 'duplicate' : ''}`}>
        {logos.map((logo, i) => {
          return (
            <>
              <div key={i + key + 'logo'} className="logos__logo">
                <div className="logos__logo__container">
                  {/* <img src={logo} /> */}
                  <img
                    srcSet={logo.images.sources[0].srcSet}
                    src={logo.placeholder.fallback}
                  />
                </div>
              </div>
              <div key={i + key + 'divider'} className="logos__divider"></div>
            </>
          )
        })}
      </div>
    )
  }

  return (
    <div className={`marquee inline active visible`}>
      <InViewWrapper
        root={root}
        min={-0.5}
        max={-0.45}
        from="top"
        whenInView={() => scrollTween.play()}
        lock
        render={() => (
          <div className="marquee__container">
            <div
              onMouseDown={startDrag}
              onMouseUp={stopDrag}
              onMouseMove={handleDrag}
              onTouchStart={startDrag}
              onTouchMove={handleDrag}
              onTouchEnd={stopDrag}
              ref={marquee}
              className={`logos`}
              style={{
                width: `calc(((50% * ${logos.length})) + ${
                  logos.length * 0.5
                }em)`,
              }}
            >
              {renderLogos(logos, false, 'a')}
              {renderLogos(logos, true, 'b')}
            </div>
          </div>
        )}
      />
    </div>
  )
}

export default LogoMarquee
