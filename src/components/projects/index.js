import {graphql, Link, StaticQuery, useStaticQuery} from 'gatsby'
import React from 'react'
// import artbox from '../images/projects/artbox/billboard.jpg'
// import gotbox from '../images/projects/got/box.png'
import ContentBlock from '../content-block'
import InViewWrapper from '../../elements/in-view-wrapper'
import NewsItems from '../news-items'
// import Reel from './reel'
import Footer from '../footer'
import ProjectList from '../project-list'
import TransitionElement from '../../elements/transition-element'
import placeholder from '../../images/placeholder-pixel.jpg'

import SectionTitle from '../section-title'
import LogoMarquee from '../logo-marquee'
import './index.scss'
import CaseStudies from '../case-studies'

const components = {
  ['project-list']: ProjectList,
  ['news-items']: NewsItems,
}

const numberOfProjects = 28
const getDefaultData = (defaultData) => {
  const {
    got,
    motorsport,
    morningShow,
    buddy,
    bnice,
    nbn,
    zoe,
    opera,
    lg,
    moms,
    runthis,
    dancer,
    grande,
    elgallo,
    boundless,
    sepia,
    meta,
    amos,
    quatrieme,
    devlin,
    eady,
    gates,
    pen,
    pal,
    jm,
    magnesium,
    soma,
    bmwCaseStudy,
    gotCaseStudy,
    amazonCaseStudy,
    buddyCaseStudy,
    bniceCaseStudy,
    twelveCaseStudy,
    mlfpCaseStudy,
    penCaseStudy,
  } = defaultData
  const directors = [sepia, meta, amos, quatrieme, devlin, eady]
  return [
    {
      component: (root, i) => (
        <div key={i}>
          <SectionTitle title="Client Roster" />
          <LogoMarquee root={root} />
          <div className="spacing no-top" />
          <div className="spacing line spacing-bottom--medium" />
          <ContentBlock
            summary={`
              FILM, BRANDED ENTERTAINMENT, PRINT, <br/>
              VFX, VR, SOCIAL <span class="subscript">and</span> WEB DESIGN – WE <br/>
              <span class="standard bold">‘SPEAK’</span> THEM ALL.

          `}
            smallerFont
            noJustify
          />
          <div className="spacing spacing--small line no-bottom" />
        </div>
      ),
    },

    {
      component: (root) => (
        <>
          <SectionTitle title="360/VR, VISUAL FX & MOTION DESIGN" />
          <ProjectList
            projects={[got, motorsport, morningShow]}
            layoutType={'columns'}
            metaType="poster"
            dividerBottom={true}
            shouldLog
            // thinDivider
          />
        </>
      ),
    },
    {
      component: 'project-list',
      layoutType: 'grid',
      metaType: 'square',
      metaSubtype: 'branding',
      projects: [bnice, buddy],
      hasModal: false,
      startingProjectIndex: 4,
      numberOfProjects,
      spacing: 'lg',
    },
    {
      component: (root) => (
        <div className="projects__section padding-lg">
          <InViewWrapper
            className="fullbleed-block"
            root={root}
            lock={true}
            min={0}
            max={0.75}
            shouldLog={true}
            render={(visibility) => {
              return (
                <>
                  <div className="spacing line" />
                  <div style={{position: 'relative'}}>
                    <img
                      src={placeholder} //gotbox}
                      style={{
                        width: `${65 + 35 * visibility}%`,
                        aspectRatio: `1920 / 1080`,
                      }}
                    />

                    <p className="responsive title">
                      <span className="cursive-font bold">360</span>
                      VR
                    </p>
                  </div>
                  <div className="spacing line no-bottom" />
                </>
              )
            }}
          />
        </div>
      ),
    },

    {
      component: (root) => (
        <div className="director-profiles">
          <SectionTitle title="P&L Roster" />

          <div className="director-profiles__profiles">
            {directors.map(({name, titles, image, url}, i) => {
              return (
                <Link to={url} className="director-profile">
                  <TransitionElement
                    className="director-profile__container"
                    threshold={0.2}
                    root={root}
                    triggerOnce={true}
                    delay={i % 3}
                  >
                    <div className="director-profile__image">
                      {image && (
                        <img
                          src={
                            placeholder // image.childImageSharp.fluid.src
                          }
                        />
                      )}
                    </div>
                    <p className="responsive">
                      <span className="bold">{name}</span>
                      {titles &&
                        titles.map((title, i) => (
                          <span>
                            {titles.length > 1 ? (
                              i !== titles.length - 1 ? (
                                ', ' + title
                              ) : (
                                <>
                                  <span className="cursive-font bold"> & </span>{' '}
                                  {title}
                                </>
                              )
                            ) : (
                              ', ' + title
                            )}
                            .
                          </span>
                        ))}
                    </p>
                  </TransitionElement>
                </Link>
              )
            })}
          </div>
          <div className="spacing line no-bottom" />
        </div>
      ),
    },
    {
      component: (root) => (
        <>
          <SectionTitle title="FILM PROD./BRANDED ENTMT" />
          <ProjectList
            projects={[lg, moms]}
            layoutType="grid"
            metaType="square"
            startingProjectIndex={7}
            numberOfProjects={numberOfProjects}
          />
          <div className="spacing line" />
          <NewsItems data={[opera]} />
        </>
      ),
    },

    {
      component: (root) => (
        <>
          <div className="spacing line" />
          <div className="spacing no-top" />
          <ProjectList
            projects={[zoe, nbn, boundless]}
            layoutType="columns"
            metaType="poster"
          />
          <div className="spacing line" />
          <div className="spacing no-top" />
        </>
      ),
    },
    {
      component: 'project-list',
      layoutType: 'grid',
      dividerBottom: true,
      metaType: 'square',
      projects: [runthis, dancer],
      startingProjectIndex: 13,
      numberOfProjects,
    },
    {
      component: 'news-items',
      data: [gates],
    },

    {
      component: (root) => (
        <>
          <div className="spacing line" />
          <div className="spacing no-top" />
          <ProjectList
            projects={[elgallo, grande, boundless]}
            layoutType="columns"
            metaType="poster"
          />
          <div className="spacing line no-bottom" />
        </>
      ),
    },

    {
      component: (root) => (
        <>
          <SectionTitle title="Print/BRANDED IDENTITY" />
          <ProjectList
            projects={[pen, pal]}
            layoutType="grid"
            metaType="square"
            metaSubtype="branding"
            startingProjectIndex={19}
            numberOfProjects={numberOfProjects}
            // hasModal={false}
          />
          <div className="spacing line" />
        </>
      ),
    },

    {
      component: 'news-items',
      data: [jm],
    },

    {
      component: 'project-list',
      layoutType: 'grid',
      dividerTop: true,
      metaType: 'square',
      metaSubtype: 'branding',
      hasModal: false,
      projects: [magnesium, soma],
      startingProjectIndex: 22,
      numberOfProjects,
    },
    {
      component: () => (
        <>
          <div className="spacing line no-bottom" />
          <TransitionElement
            className="projects__content-block"
            threshold={0.2}
            triggerOnce={true}
          >
            <SectionTitle heading="Latest" title="CASE STUDIES" />
            <div className="spacing " />
            <div className="spacing line spacing-bottom--medium" />

            <ContentBlock
              summary={`
                PLEASE <span class="standard">‘CHECK OUT’</span> THE CASE STUDIES
    BELOW FOR A <span class="standard bold">T A S T E</span> OF <span class="cursive-font bold normal-case">Where</span> we
    PLAY, <span class="cursive-font bold normal-case">How</span> WE WORK AND <span class="cursive-font bold normal-case">Who</span> WE
    WORK FOR.
              `}
              divider
              smallSpacing
              smallerFont
              noJustify
            />
            <CaseStudies
              caseStudies={[
                bmwCaseStudy,
                gotCaseStudy,
                amazonCaseStudy,
                buddyCaseStudy,
                bniceCaseStudy,
                twelveCaseStudy,
                mlfpCaseStudy,
                penCaseStudy,
              ]}
            />
          </TransitionElement>
        </>
      ),
    },
  ]
}

const Projects = ({projectSections, root}) => {
  const data = useStaticQuery(graphql`
    query {
      content: pagesYaml(yamlId: {eq: "projects"}) {
        id
        summary
      }
      reel: projectsYaml(slug: {eq: "pal-reel"}) {
        ...project
      }
      got: projectsYaml(slug: {eq: "got"}) {
        ...project
      }
      motorsport: projectsYaml(slug: {eq: "motorsport"}) {
        ...project
      }
      morningShow: projectsYaml(slug: {eq: "morning-show"}) {
        ...project
      }
      bnice: projectsYaml(slug: {eq: "bnice"}) {
        ...project
      }
      buddy: projectsYaml(slug: {eq: "buddy"}) {
        ...project
      }
      lg: projectsYaml(slug: {eq: "lg"}) {
        ...project
      }
      nbn: projectsYaml(slug: {eq: "nbn"}) {
        ...project
      }
      zoe: projectsYaml(slug: {eq: "zoe"}) {
        ...project
      }
      boundless: projectsYaml(slug: {eq: "boundless"}) {
        ...project
      }
      moms: projectsYaml(slug: {eq: "moms"}) {
        ...project
      }
      runthis: projectsYaml(slug: {eq: "run-this"}) {
        ...project
      }
      dancer: projectsYaml(slug: {eq: "dancer"}) {
        ...project
      }
      grande: projectsYaml(slug: {eq: "grande"}) {
        ...project
      }
      boundless: projectsYaml(slug: {eq: "boundless"}) {
        ...project
      }
      elgallo: projectsYaml(slug: {eq: "el-gallo"}) {
        ...project
      }
      pen: projectsYaml(slug: {eq: "pen"}) {
        ...project
      }
      pal: projectsYaml(slug: {eq: "pal"}) {
        ...project
      }
      magnesium: projectsYaml(slug: {eq: "magnesium"}) {
        ...project
      }
      soma: projectsYaml(slug: {eq: "soma"}) {
        ...project
      }
      sepia: directorsYaml(slug: {eq: "sepia"}) {
        ...director
      }
      meta: directorsYaml(slug: {eq: "meta-productions"}) {
        ...director
      }
      amos: directorsYaml(slug: {eq: "amos-leblanc"}) {
        ...director
      }
      quatrieme: directorsYaml(slug: {eq: "quatrieme-etage"}) {
        ...director
      }
      devlin: directorsYaml(slug: {eq: "devlin-prager"}) {
        ...director
      }
      eady: directorsYaml(slug: {eq: "josh-eady"}) {
        ...director
      }
      opera: newsYaml(slug: {eq: "opera"}) {
        ...news
      }
      gates: newsYaml(slug: {eq: "gates"}) {
        ...news
      }
      jm: newsYaml(slug: {eq: "jm"}) {
        ...news
      }
      bmwCaseStudy: caseStudiesYaml(slug: {eq: "bmw"}) {
        ...caseStudy
      }
      gotCaseStudy: caseStudiesYaml(slug: {eq: "got"}) {
        ...caseStudy
      }
      amazonCaseStudy: caseStudiesYaml(slug: {eq: "amazon"}) {
        ...caseStudy
      }
      buddyCaseStudy: caseStudiesYaml(slug: {eq: "buddy"}) {
        ...caseStudy
      }
      bniceCaseStudy: caseStudiesYaml(slug: {eq: "bnice"}) {
        ...caseStudy
      }
      twelveCaseStudy: caseStudiesYaml(slug: {eq: "twelve"}) {
        ...caseStudy
      }
      mlfpCaseStudy: caseStudiesYaml(slug: {eq: "mlfp"}) {
        ...caseStudy
      }
      penCaseStudy: caseStudiesYaml(slug: {eq: "pen"}) {
        ...caseStudy
      }
    }
  `)

  const {content, reel} = data
  const sections = projectSections || getDefaultData(data)

  return (
    <div className="projects">
      <div className="fullbleed-block" style={{position: 'relative'}}>
        <ProjectList
          projects={reel.gallery.map((image) => ({image}))}
          metaType="image"
          layoutType="16:9"
          hideMeta
          shouldLog
          slider
          preloadNext
        />
        <p className="responsive title align-top">
          <span
            className="cursive-font bold lowercase"
            style={{paddingRight: 0}}
          >
            2022
          </span>
          Reel
        </p>
      </div>

      <div className="spacing line spacing--medium" />

      <TransitionElement
        className="projects__content-block"
        threshold={0.2}
        root={root}
        triggerOnce={true}
      >
        <ContentBlock
          summary={content.summary}
          smallerFont
          smallSpacing
          noJustify
        />
      </TransitionElement>
      <div className="spacing line spacing--small no-bottom" />
      {sections.map((props, i) => {
        const Component = components[props.component]
        return props.component && !Component ? (
          props.component(root, i)
        ) : (
          <TransitionElement
            key={i}
            className={`projects__section ${
              props.spacing
                ? `section-spacing section-spacing--${props.spacing}`
                : ''
            }`}
            threshold={0.2}
            root={root}
            triggerOnce={true}
          >
            <Component key={i + '_component'} {...props} root={root} />
          </TransitionElement>
        )
      })}
      <Footer />
    </div>
  )
}

export default Projects
