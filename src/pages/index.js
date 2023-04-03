import React, {useState} from 'react'
<<<<<<< HEAD
import PalLogoAnim from '../components/pl-logo-anim'
import ProjectIntro from '../components/project-intro'
// import Projects from '../components/projects'
import SEO from '../components/seo'
import '../styles/pages/home.scss'
import ContentPage from '../templates/content-page'
=======
import PalLogoAnim from '../elements/pl-logo-anim'
import MissionStatement from '../components/mission-statement'
import Projects from '../components/projects'
import SEO from '../elements/seo'
import ContentPage from '../templates/content-page'
import './index/index.scss'
>>>>>>> feature/gatsby6

const IndexPage = () => {
  useState(() => {
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
<<<<<<< HEAD

=======
>>>>>>> feature/gatsby6
  return (
    <ContentPage
      logoColor="black"
      headerBackgroundColor="eggshell"
      className={'home'}
      headerVisible={true}
<<<<<<< HEAD
      render={({parent}) => (
        <>
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
          <div className="container splash-section__container">
            <div className="splash-section">
              <div className="home-splash">
                <div className="pal-logo-animation">
                  <PalLogoAnim />
                </div>
                <div>
                  <div className="spacing spacing--medium line"></div>
                  <ProjectIntro />
                  <div className="spacing spacing--medium line"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="container list-section">
            <div className="list-section__projects">
              {/* <Projects
                root={parent}
                showProjects={true}
                onRemoveProjects={() =>
                  this.setState({projectsRemoved: true})
                }
              /> */}
            </div>
          </div>
        </>
      )}
    />
=======
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
      <div className="container splash-section__container">
        <div className="splash-section">
          <div className="home-splash">
            <div className="pal-logo-animation">
              <PalLogoAnim />
            </div>
            <div>
              <div className="spacing spacing--medium line"></div>
              <MissionStatement />
              <div className="spacing spacing--medium line"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="container list-section">
        <div className="list-section__projects">
          <Projects
            showProjects={true}
            onRemoveProjects={() => this.setState({projectsRemoved: true})}
          />
        </div>
      </div>
    </ContentPage>
>>>>>>> feature/gatsby6
  )
}

export default IndexPage
