import {graphql, StaticQuery} from 'gatsby'
import React from 'react'
import DirectorHeader from '../director-header'
import Footer from '../footer'
import VideoPlayerModal from '../video-player-modal'
import withModal from '../../hooks/with-modal'
import {getCreditText} from '../../utils'
import ContentBlock from '../content-block'
import TitleBackButton from '../title-back-button'
import TransitionElement from '../../elements/transition-element'
import './index.scss'

const aspectRatios = ['2.39 / 1', '4 / 3', '16 / 9']
const randomIntFromInterval = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min)

const Project = (props) => {
  const {
    root,
    content,
    openModal,
    closeModal,
    includeFooter,
    type,
    compact,
    videos,
    onClose,
    isDark,
    hideDirector,
  } = props

  const {
    title,
    client,
    credit,
    creditName,
    creditSlug,
    category,
    synopsis,
    partners,
    awards,
    year,
    month,
    gallery,
    galleryAspectRatio,
    video,
    clips,
    timecode,
    isBranding,
  } = content
  const modalVideos = videos
    ? videos.edges.map((videoNode) =>
        Object.assign({}, videoNode.node, {
          src: videoNode.node.video,
        })
      )
    : [
        {
          src: video,
          clips: clips,
          client,
          title,
          credit,
          creditName,
          creditSlug,
          category,
          year,
        },
      ]

  const ModalComponent = (
    <VideoPlayerModal
      videos={modalVideos}
      active={modalVideos.findIndex((video) => video.title === title)}
      autoplay
      autoclose
      handleCloseClick={() => {
        closeModal()
        // if (modalCloseRedirect) {
        //     navigate(modalCloseRedirect)
        // }
      }}
    />
  )
  const creditText = getCreditText(credit, creditName)
  const [aspectRatio, setAspectRatio] = React.useState()
  React.useEffect(() => {
    setAspectRatio(randomIntFromInterval(0, 2))
  }, [])

  return (
    <StaticQuery
      query={graphql`
        query {
          directors: allDirectorsYaml {
            edges {
              node {
                ...director
              }
            }
          }
        }
      `}
      render={({directors}) => {
        const director = directors.edges
          .map(({node}) => node)
          .find((node) => node.slug === creditSlug)

        return (
          <div>
            <div
              className={`project ${props.background ? props.background : ''} ${
                isDark ? 'dark' : 'light'
              } ${type}`}
            >
              <div className="project__section">
                {onClose && (
                  <TitleBackButton
                    title={title}
                    onClose={onClose}
                    inverted={isDark}
                  />
                )}
                {!onClose && director && (
                  <DirectorHeader
                    director={director}
                    headline={title}
                    subheadline={`${
                      (credit || category) && (credit || category) + ' | '
                    }${director.name}`}
                  />
                )}

                <ContentBlock
                  isDark={isDark}
                  summary={synopsis}
                  link={director?.url}
                  linkText={!hideDirector && `{ ${creditName}'s Reel }`}
                  smallerFont
                  smallSpacing
                  divider={true}
                />
              </div>

              <div
                className="project__images"
                onClick={() => openModal(ModalComponent)}
                onKeyDown={(e) => {
                  if ((e.key = 'Enter')) {
                    openModal(ModalComponent)
                  }
                }}
                tabIndex="0"
              >
                <TransitionElement
                  className="project__images__headline"
                  threshold={0.5}
                  root={root}
                  triggerOnce={true}
                >
                  <div className="spacing spacing--medium no-top"></div>
                  <p className="responsive centered">Selected Frames</p>
                  <div className="spacing spacing--medium no-top"></div>
                </TransitionElement>
                {gallery &&
                  gallery.map((image, i) => {
                    return (
                      <div key={i} className="project__images__image">
                        <TransitionElement
                          threshold={i == 0 ? 0.1 : 0.33}
                          root={root}
                          triggerOnce={true}
                        >
                          <img
                            style={{
                              aspectRatio: aspectRatios[aspectRatio],
                            }}
                            // src={image.childImageSharp.fluid.src}
                          />
                          <div
                            className={`spacing spacing-medium${
                              i === gallery.length - 1 ? '' : ' no-top'
                            }`}
                          />
                        </TransitionElement>
                      </div>
                    )
                  })}
              </div>
              {includeFooter && <Footer inverted={isDark} />}
            </div>
          </div>
        )
      }}
    />
  )
}

export default withModal(Project, {type: 'fade'})
