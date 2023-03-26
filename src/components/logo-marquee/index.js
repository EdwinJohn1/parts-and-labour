import {TweenMax} from 'gsap'
import React, {useEffect, useRef, useState} from 'react'
import InViewWrapper from '../../elements/in-view-wrapper'
import './index.scss'

const logo1 = 'https://storage.cloud.google.com/pal-assets/client-logos/bmw.png'
const logo12 =
  'https://storage.cloud.google.com/pal-assets/client-logos/dazn.png'
const logo7 =
  'https://storage.cloud.google.com/pal-assets/client-logos/esquire.png'
const logo11 =
  'https://storage.cloud.google.com/pal-assets/client-logos/fortnite.png'
const logo14 =
  'https://storage.cloud.google.com/pal-assets/client-logos/gatorade.png'
const logo10 =
  'https://storage.cloud.google.com/pal-assets/client-logos/hbo.png'
const logo15 =
  'https://storage.cloud.google.com/pal-assets/client-logos/icm.png'
const logo3 = 'https://storage.cloud.google.com/pal-assets/client-logos/lg.png'
const logo5 = 'https://storage.cloud.google.com/pal-assets/client-logos/nbc.png'
const logo9 =
  'https://storage.cloud.google.com/pal-assets/client-logos/nike.png'
const logo8 =
  'https://storage.cloud.google.com/pal-assets/client-logos/north-face.png'
const logo13 =
  'https://storage.cloud.google.com/pal-assets/client-logos/outside.png'
const logo2 =
  'https://storage.cloud.google.com/pal-assets/client-logos/shopify.png'
const logo4 = 'https://storage.cloud.google.com/pal-assets/client-logos/wme.png'
const logo6 =
  'https://storage.cloud.google.com/pal-assets/client-logos/zappos.png'

const logos = [
  logo1,
  logo2,
  logo3,
  logo4,
  logo5,
  logo6,
  logo7,
  logo8,
  logo9,
  logo10,
  logo11,
  logo12,
  logo13,
  logo14,
  logo15,
]

let scrollTween, dragStart, tweenStartTime, lastDrag, dragVelo

const LogoMarquee = ({root}) => {
  const marquee = useRef(null)
  // const [scroll, shouldScroll] = useState(true)

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
                  <img src={logo} />
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
