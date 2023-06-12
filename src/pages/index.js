import React, {useState} from 'react'
import PalLogoAnim from '../elements/pl-logo-anim'
import MissionStatement from '../components/mission-statement'
import Projects from '../components/projects'
import SEO from '../elements/seo'
import ContentPage from '../templates/content-page'
import './index/index.scss'
import {isInBrowser} from '../utils'
import Footer from '../components/footer'

const IndexPage = () => {
  useState(() => {
    if (!isInBrowser) return
    const headerLogo = document.querySelector('.site-header #desktop-logo')
    if (headerLogo) {
      const resetPage = (e) => {
        requestAnimationFrame(() => {
          const pageEl = document.querySelector('.content-page .content')
          if (pageEl) {
            pageEl.scrollTo(0, 0)
          }
        })
      }
      headerLogo.addEventListener('click', resetPage)
      return () => {
        headerLogo.removeEventListener('click', resetPage)
      }
    }
  })
  return (
    <ContentPage
      logoColor="black"
      headerBackgroundColor="eggshell"
      className={'home'}
      headerVisible={true}
    >
      <SEO
        title="Parts & Labour: Home"
        keywords={[
          `Parts`,
          `Labour`,
          `agency`,
          `multi-platform`,
          `nyc`,
          `los angeles`,
          `Toronto`,
        ]}
        description="A multi-platform content company based in LA NYC and Toronto"
      />
      {/* <div className="container splash-section__container">
        <div className="splash-section">
          <div className="home-splash">
            <PalLogoAnim />
            <div className="mission-statement">
              <div className="spacing spacing--medium line"></div>
              <MissionStatement />
              <div className="spacing spacing--medium line"></div>
            </div>
          </div>
        </div>
      </div> */}
      {/* <div className="container list-section">
        <div className="list-section__projects">
          <Projects />
        </div>
      </div> */}
      {/* TEMP Coming Soon Content */}
      <div className="container splash-section__container">
        <div className="splash-section">
          <div className="home-splash">
            <PalLogoAnim />
            <div className="mission-statement">
              <div className="spacing spacing--medium line"></div>
              <MissionStatement />
              <div className="spacing spacing--medium line"></div>
            </div>
          </div>
        </div>
      </div>
      <Footer left={<p className="responsive">2023, Coming Soon</p>} />
    </ContentPage>
  )
}

export default IndexPage
