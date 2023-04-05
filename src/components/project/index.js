import {graphql, useStaticQuery} from 'gatsby'
import React from 'react'
import DirectorHeader from '../director-header'
import Footer from '../footer'
import VideoPlayerModal from '../video-player-modal'
import withModal from '../../hooks/with-modal'
import {getCreditText} from '../../utils'
import ContentBlock from '../content-block'
import TitleBackButton from '../title-back-button'
import VideoClips from '../video-clips'
import SectionTitle from '../section-title'
import ProjectList from '../project-list'
import './index.scss'

const Project = (props) => {
  const {
    root,
    content,
    director,
    relatedProjects,
    openModal,
    closeModal,
    includeFooter,
    type,
    videos,
    onClose,
    modalActive,
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
    year,
    gallery,
    video,
    clips,
    galleryAspectRatio,
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
      }}
    />
  )
  const creditText = getCreditText(credit, creditName)
  const aspectRatio = galleryAspectRatio || 'widescreen'

  const rolesByCredit = {
    producer: 'Producing',
    director: 'Direction',
  }
  const allRoles = [
    ...new Set(
      relatedProjects.map(({credit}) => {
        return rolesByCredit[credit.toLowerCase()] || credit
      })
    ),
  ]

  const directorExists = director && director !== ''

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
          {!onClose && directorExists && (
            <DirectorHeader
              director={director}
              headline={title}
              subheadline={`
                  <span class="bold">${director.name}</span>
                  ${
                    (credit || category) &&
                    `<span> | ${credit || category}</span>`
                  }
                `}
              linkToBio={false}
            />
          )}

          <ContentBlock
            isDark={isDark}
            summary={synopsis}
            link={director?.url}
            linkText={!hideDirector && `{ ${creditName}'s Reel }`}
            smallerFont
            smallSpacing
            noJustify
            divider={!clips}
          />
        </div>

        {clips && (
          <div
            className="project__reel"
            onClick={() => openModal(ModalComponent)}
            onKeyDown={(e) => {
              if ((e.key = 'Enter')) {
                openModal(ModalComponent)
              }
            }}
            tabIndex="0"
          >
            <div className="spacing line spacing--small spacing-bottom--large"></div>
            <VideoClips videos={clips} isActive={!modalActive} />
            <div className="spacing spacing--small no-top"></div>
          </div>
        )}

        {directorExists && (
          <div>
            <DirectorHeader
              director={director}
              linkToBio={true}
              subheadline={`
              <span class="bold">${director.name}</span>
              <span> | Showreel</span>
            `}
            />

            <div className="spacing spacing--tiny" />
            <ContentBlock
              isDark={isDark}
              summary={`
              Check below <span class="subscript">and</span> <span class="standard bold">D I S C O V E R</span>
              ${
                director.first || director.name
              }’s latest <span class="cursive-font bold normal-case">Work</span>
              <span class="subscript">and</span> <span class="cursive-font bold normal-case">Achievements</span>.
            `}
              noJustify
            />
            <div className="spacing spacing--tiny" />
            <div className="spacing line spacing--small no-bottom" />
            <SectionTitle title={`${director.name}, ${allRoles.join('/')}`} />

            <ProjectList
              projects={relatedProjects}
              layoutType="grid"
              metaType="square"
              inverted={isDark}
              dividerBottom
            />
          </div>
        )}
        {/*
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
              const gatsbyImage = getImage(image)

              return (
                <div key={i} className="project__images__image">
                  <TransitionElement
                    threshold={i == 0 ? 0.1 : 0.33}
                    root={root}
                    triggerOnce={true}
                  >
                     <GatsbyImage image={gatsbyImage} />
                    <div
                      className={`spacing spacing-medium${
                        i === gallery.length - 1 ? '' : ' no-top'
                      }`}
                    />
                  </TransitionElement>
                </div>
              )
            })}
        </div> */}
        {includeFooter && <Footer inverted={isDark} />}
      </div>
    </div>
  )
}

export default withModal(Project, {type: 'fade'})
