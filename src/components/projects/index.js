import {graphql, StaticQuery, useStaticQuery} from 'gatsby'
// import TransitionLink from 'gatsby-plugin-transition-link'
import React from 'react'
// import artbox from '../images/projects/artbox/billboard.jpg'
// import gotbox from '../images/projects/got/box.png'
import ContentBlock from '../content-block'
// import {pageTween} from './header'
// import InViewWrapper from './in-view-wrapper'
// import NewsItems from './news-items'
// import Reel from './reel'
import Footer from '../footer'
import ProjectList from '../project-list'
// import Services, {ServicesCallout} from './services'
import TransitionElement from '../../elements/transition-element'
// import placeholder from '../images/placeholder-pixel.jpg'

import SectionTitle from '../section-title'
import LogoMarquee from '../logo-marquee'
// import PageTitle from './page-title'
import './index.scss'

const slideshow1 =
  'https://storage.cloud.google.com/pal-assets/photogallery/b-nice-t_packshot_cherry.png'
const slideshow2 =
  'https://storage.cloud.google.com/pal-assets/photogallery/b-n-t_billboard_2.png'
const slideshow3 =
  'https://storage.cloud.google.com/pal-assets/photogallery/b-n-t_letterhead.png'
const slideshow4 =
  'https://storage.cloud.google.com/pal-assets/photogallery/b-nice-t_stationary.png'
const slideshow5 =
  'https://storage.cloud.google.com/pal-assets/photogallery/b-nice-t_business-cards.png'
const slideshow6 =
  'https://storage.cloud.google.com/pal-assets/photogallery/b-nice-t_multi-packshot_cherry.png'
const slideshow7 =
  'https://storage.cloud.google.com/pal-assets/photogallery/b-nice-t_billboard-3.png'
const slideshow8 =
  'https://storage.cloud.google.com/pal-assets/photogallery/b-nice-t_card-box.png'
const slideshow9 =
  'https://storage.cloud.google.com/pal-assets/photogallery/b-nice-t_tape.png'

const slideshow = [
  {image: slideshow1},
  {image: slideshow2},
  {image: slideshow3},
  {image: slideshow4},
  {image: slideshow5},
  {image: slideshow6},
  {image: slideshow7},
  {image: slideshow8},
  {image: slideshow9},
]

const components = {
  ['project-list']: ProjectList,
  // ['news-items']: NewsItems,
}

const numberOfProjects = 28
const getDefaultData = (defaultData) => {
  const {
    got,
    motorsport,
    morningShow,
    zoe,
    // boundless,
    // nbn,
    // buddy,
    // bnice,
    // gatesNews,
    // grande,
    // opera,
    // lg,
    // moms,
    // runThis,
    // jm,
    // sepia,
    // meta,
    // amos,
    // elGallo,
    // quatrieme,
    // devlin,
    // eady,
    // dancer,
    // penBranding,
    // palBranding,
    // magnesiumBranding,
    // somaBranding,
    // voyageCaseStudy,
    // buddyCaseStudy,
    // gotCaseStudy,
    // penCaseStudy,
    // somaCaseStudy,
  } = defaultData
  // const directors = [sepia, meta, amos, quatrieme, devlin, eady]
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
    /*  {
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
          component: root => (
            <div className="projects__section padding-lg">
              <InViewWrapper
                className="fullbleed-block"
                root={root}
                lock={true}
                min={0}
                max={0.75}
                render={visibility => {
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
          component: root => (
            <div className="director-profiles">
              <SectionTitle title="P&L Roster" />

              <div className="director-profiles__profiles">
                {directors.map(({name, titles, image, url}, i) => {
                  return (
                    <TransitionLink
                      to={url}
                      className="director-profile"
                      exit={{
                        length: 1,
                      }}
                      entry={{
                        length: 1,
                        trigger: ({entry, node}) => {
                          pageTween(node)
                        },
                      }}
                    >
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
                    </TransitionLink>
                  )
                })}
              </div>
              <div className="spacing line no-bottom" />
            </div>
          ),
        },
        {
          component: root => (
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
          component: root => (
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
          projects: [runThis, dancer],
          startingProjectIndex: 13,
          numberOfProjects,
        },
        {
          component: 'news-items',
          data: [gatesNews],
        },
        {
          component: root => (
            <>
              <div className="spacing line" />
              <div className="spacing no-top" />
              <ProjectList
                projects={[elGallo, grande, boundless]}
                layoutType="columns"
                metaType="poster"
              />
              <div className="spacing line no-bottom" />
            </>
          ),
        },
        {
          component: root => (
            <>
              <SectionTitle title="Print/BRANDED IDENTITY" />
              <ProjectList
                projects={[penBranding, palBranding]}
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
          projects: [magnesiumBranding, somaBranding],
          startingProjectIndex: 22,
          numberOfProjects,
        },
        {
          component: root => (
            <TransitionElement
              className="projects__content-block"
              threshold={0.2}
              root={root}
              triggerOnce={true}
            >
              <>
                <div className="spacing line spacing-top--large spacing-bottom--medium" />
                <ContentBlock
                  summary={`
                PLEASE <span class="standard">‘CHECK OUT’</span> THE CASE STUDIES
    BELOW FOR A <span class="standard bold">T A S T E</span> OF <span class="cursive-font bold normal-case">Where</span> we
    PLAY, <span class="cursive-font bold normal-case">How</span> WE WORK AND <span class="cursive-font bold normal-case">Who</span> WE
    WORK FOR.

              `}
                  smallerFont
                  noJustify
                />
                <div className="spacing line spacing--medium no-bottom" />
              </>
            </TransitionElement>
          ),
        },
        {
          component: () => (
            <>
              <SectionTitle heading="Latest" title="CASE STUDIES" />
              <NewsItems
                data={[
                  voyageCaseStudy,
                  buddyCaseStudy,
                  gotCaseStudy,
                  penCaseStudy,
                  somaCaseStudy,
                ]}
                startingProjectIndex={23}
                numberOfProjects={numberOfProjects}
              />
              <div className="spacing line spacing-top--medium" />
            </>
          ),
        },
        */
  ]
}

const Projects = ({projectSections, root}) => {
  const data = useStaticQuery(graphql`
    query {
      content: pagesYaml(yamlId: {eq: "projects"}) {
        id
        summary
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
      zoe: projectsYaml(slug: {eq: "zoe"}) {
        ...project
      }
    }
  `)
  const {content} = data
  const sections = projectSections || getDefaultData(data)
  return (
    <div className="projects">
      {/* <div className="fullbleed-block" style={{position: 'relative'}}>
              <ProjectList
                projects={slideshow}
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
            */}
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
      {/* <div className="projects__section padding-lg">
              <InViewWrapper
                className="fullbleed-block"
                root={root}
                lock={true}
                min={0}
                max={0.75}
                render={(visibility) => {
                  return (
                    <>
                      <img
                        src={placeholder} //artbox}
                        style={{
                          width: `${65 + 35 * visibility}%`,
                          aspectRatio: `1920 / 1080`,
                        }}
                      />
                      <p className="responsive title">
                        <span className="cursive-font bold lowercase">
                          shop
                        </span>
                        Box
                      </p>
                    </>
                  )
                }}
              />
            </div>

            <div
              className="services-section"
              style={{marginTop: showProjects ? '-0.45em' : '-0.25em'}}
            >
              <div ref={(ref) => (this.lastProjectBlock = ref)} />
              <div className="spacing spacing--tiny no-top" />
              <div className="spacing spacing--small-alt no-top" />
              <Services hideFooter root={root} />
            </div>
            */}
      <Footer />
    </div>
  )
}

export default Projects
