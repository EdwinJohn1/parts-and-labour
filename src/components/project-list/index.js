import {graphql, Link, StaticQuery} from 'gatsby'
import React from 'react'
import {TransitionGroup} from 'react-transition-group'
import ProjectPage from '../../templates/project-page'
import {
  addPlaceholderZeroes,
  convertSplitIntoSpans,
  getCharArray,
  getCreditClientText,
  getCreditText,
  splitTextByChar,
} from '../../utils'
import ProgressiveVideo from '../../elements/progressive-video'
import TransitionElement from '../../elements/transition-element'
import withModal from '../../hooks/with-modal'
import './index.scss'

const columnLayouts = ['columns', 'columns--hero', 'grid']
const rowLayouts = ['rows', 'rows--centered']

const ProjectList = (props) => {
  const {
    projects,
    inverted,
    reverseLayout,
    layoutType = 'rows',
    metaType,
    metaSubtype,
    startingProjectIndex,
    numberOfProjects,
    dividerTop,
    dividerBottom,
    hideMeta,
    root,
    theme = 'light',
    hideDivider,
    thinDivider,
    slider,
    preloadNext,
    openModal,
    closeModal,
    spacing = 'spacing--large',
  } = props

  const projectsNumber = addPlaceholderZeroes(
    numberOfProjects || projects.length,
    2
  )

  const projectsPerSlide =
    layoutType === 'grid'
      ? 2
      : layoutType === 'columns--hero' ||
        layoutType === '16:9' ||
        layoutType === 'rows'
      ? 1
      : 3

  const [sliderIndex, setSliderIndex] = React.useState(0)

  const getNextSliderIndex = (index) => {
    return (index + 1) * projectsPerSlide >= projects.length ? 0 : index + 1
  }
  React.useEffect(() => {
    let sliderTimeout
    if (slider) {
      const nextSliderIndex = getNextSliderIndex(sliderIndex)

      sliderTimeout = setTimeout(() => {
        setSliderIndex(nextSliderIndex)
      }, 5000)
      return () => {
        clearTimeout(sliderTimeout)
      }
    }
  }, [slider, sliderIndex])

  const projectsToDisplay = slider
    ? [...projects].splice(sliderIndex * projectsPerSlide, projectsPerSlide)
    : projects

  const nextProjectsToDisplay =
    slider &&
    preloadNext &&
    [...projects].splice(
      getNextSliderIndex(sliderIndex) * projectsPerSlide,
      projectsPerSlide
    )

  return (
    <StaticQuery
      query={graphql`
        query {
          allProjectsYaml {
            nodes {
              ...project
            }
          }
        }
      `}
      render={(data) => {
        const renderProject = (project, i) => {
          return (
            <Project
              project={project}
              projectDetail={data.allProjectsYaml.nodes.find(
                ({slug}) => slug === project.slug
              )}
              i={i}
              root={root}
              theme={theme}
              layoutType={layoutType}
              metaType={metaType}
              metaSubtype={metaSubtype}
              spacing={spacing}
              reverseLayout={reverseLayout}
              hideMeta={hideMeta}
              startingProjectIndex={
                slider
                  ? sliderIndex * (projectsPerSlide + 1)
                  : startingProjectIndex
              }
              projectsNumber={projectsNumber}
              isLast={i === projects.length - 1}
              isSlider={slider}
              thinDivider={thinDivider}
              openModal={openModal}
              closeModal={closeModal}
            />
          )
        }
        return (
          <div
            className={`project-list ${
              inverted ? 'project-list--inverted' : null
            } ${theme || ''}`}
          >
            {dividerTop && (
              <div
                className={`spacing ${spacing} line ${theme} ${
                  thinDivider ? 'thin' : ''
                }`}
              />
            )}
            <TransitionGroup
              className={`project-list__projects ${
                columnLayouts.includes(layoutType)
                  ? 'layout__columns'
                  : 'layout__row'
              } layout__${layoutType}`}
            >
              {projectsToDisplay.map((project, i) => {
                return <>{renderProject(project, i)}</>
              })}
              {nextProjectsToDisplay?.map((project, i) => {
                return (
                  <div style={{display: 'none'}}>
                    {renderProject(project, i)}
                  </div>
                )
              })}
            </TransitionGroup>
            {dividerBottom && (
              <div
                className={`spacing ${spacing} line ${theme} ${
                  thinDivider ? 'thin' : ''
                }`}
              />
            )}
          </div>
        )
      }}
    />
  )
}

const Project = ({
  project,
  projectDetail,
  layoutType,
  metaType,
  metaSubtype,
  theme,
  projectsNumber,
  reverseLayout,
  spacing,
  hideMeta,
  startingProjectIndex,
  i,
  isLast,
  isSlider,
  thinDivider,
  root,
  openModal,
  closeModal,
}) => {
  const {
    client: clientLong,
    clientShort,
    credit,
    creditName,
    category,
    type,
    serviceImage,
    imageSquare,
    poster,
    gallery,
    timecode,
    year,
    title,
    titleShort,
    clips,
    preview,
    slug,
    image,
  } = project
  const isRowsCentered = layoutType === 'rows--centered'
  const isColumnHero = layoutType === 'columns--hero'
  const isGridLayout = layoutType === 'grid'
  const isColumnLayout = columnLayouts.includes(layoutType)
  const isRowLayout = rowLayouts.includes(layoutType)
  const numColumns = isGridLayout ? 2 : isColumnHero ? 1 : 3

  const isStandardMeta = metaType === 'standard'
  const isPosterMeta = metaType === 'poster'
  const isPosterAltMeta = metaType === 'poster-alt'
  const isSquareMeta = metaType === 'square'
  const isImageMeta = metaType === 'image'
  const isVideoMeta = isRowLayout || metaType === 'video'
  const isBrandingSubtype = metaSubtype === 'branding'

  const imageToUse = isSquareMeta
    ? imageSquare || image
    : isColumnLayout
    ? poster
    : serviceImage || (gallery && gallery[0])

  const shouldUseTitleShort =
    isColumnLayout && !isColumnHero && !isGridLayout && titleShort
  const shouldUseClientShort =
    isSquareMeta && clientLong.length > 30 && clientShort
  const client = shouldUseClientShort ? clientShort : clientLong
  const titleToUse = (shouldUseTitleShort ? titleShort : title) || ''
  const splitTitle =
    titleToUse.indexOf(' ') > -1 || titleToUse.length > 8
      ? splitTextByChar(titleToUse)
      : getCharArray(titleToUse)
  let splitCredit = splitTextByChar(
    getCreditClientText(client, credit, creditName)
  )
  let creditLong = convertSplitIntoSpans(splitCredit)
  const forIndex = splitCredit.indexOf('for')
  if (forIndex > -1) {
    const indexesAfterForIndex = splitCredit
      .map((_, i) => i)
      .filter((i) => i > forIndex)
    indexesAfterForIndex.forEach(
      (index) =>
        (creditLong[index] = (
          <span key={index} className="italic">
            {splitCredit[index]}
          </span>
        ))
    )
  }

  const splitTimeByColon = splitTextByChar(timecode, ':').join(' . ')
  const splitTime = splitTextByChar(splitTimeByColon)
  // if (isSquareMeta && splitTime.length > 0) {
  //   splitTime.push('MN')
  // }
  const previewVideo =
    ((isVideoMeta && preview) || isRowLayout) && clips && clips[0]
  const index =
    (startingProjectIndex || 0) + (i + (startingProjectIndex ? 0 : 1))
  const isLastInColumn = isColumnLayout && i % numColumns === numColumns - 1

  const creditShort = convertSplitIntoSpans(
    splitTextByChar(getCreditText(credit, creditName, true)),
    false,
    false,
    [
      ...splitTextByChar(creditName).map((name) => ({
        text: name,
        class: 'bold',
      })),
    ]
  )
  const timeCodeSpan = (
    <p className="span responsive">{convertSplitIntoSpans(splitTime)}</p>
  )

  const titleSpan = convertSplitIntoSpans(splitTitle)
  const yearStringArray = ['(', String(year), ')']
  const titleYearSpan = convertSplitIntoSpans([titleToUse, ...yearStringArray])
  const yearSpan = convertSplitIntoSpans(yearStringArray)
  const projectSequenceNumber =
    addPlaceholderZeroes(index, 2) + '/' + projectsNumber

  const projectContent = (
    <>
      {!hideMeta && (
        <div className="project-list__project__meta">
          {isStandardMeta && (
            // for column hero layout
            <>
              <p className="span responsive bold">{titleSpan}</p>
              <p className="span responsive">{creditShort}</p>
            </>
          )}
          {isPosterAltMeta && (
            // for grid layout
            <>
              <p className="span responsive bold">{titleSpan}</p>
              <p className="span responsive">{creditShort}</p>
            </>
          )}
          {isPosterMeta && (
            // for poster meta layout
            <>
              <p className="span responsive">
                {convertSplitIntoSpans(
                  [titleToUse, `( ${year} )`],
                  false,
                  false,
                  [{text: titleToUse, class: 'bold'}]
                )}
              </p>
              <p className="responsive">{creditName}</p>
            </>
          )}
          {isVideoMeta && (
            <>
              <div className="project-list__project__meta__left">
                <p className="span responsive">{titleYearSpan}</p>
                <p className="span responsive">{creditLong}</p>
              </div>
              <div className="project-list__project__meta__right">
                <p className="responsive cursive-font bold">
                  {splitTimeByColon}
                </p>
              </div>
            </>
          )}
          {isSquareMeta && (
            <>
              <div className="project-list__project__meta__left">
                <p className="responsive cursive-font bold">
                  {projectSequenceNumber}
                </p>
              </div>
              <div className="project-list__project__meta__right">
                <p className="span responsive">
                  {convertSplitIntoSpans(
                    [titleToUse, '(', String(year), ')'],
                    false,
                    false,
                    [
                      ...splitTextByChar(titleToUse).map((titlePart) => ({
                        text: titlePart,
                        class: 'bold',
                      })),
                    ]
                  )}
                </p>
                <p className="span responsive">{creditShort}</p>
              </div>
            </>
          )}
        </div>
      )}
      <div
        className={`project-list__project__media ${metaType} ${
          hideMeta ? 'no-meta' : ''
        }`}
      >
        {
          previewVideo ? (
            <ProgressiveVideo
              sources={[
                {
                  src: previewVideo,
                  type: 'video/mp4',
                },
              ]}
              neverTimeout={true}
              loop={true}
            />
          ) : isImageMeta ? (
            <img className="image" src={image} />
          ) : (
            <img />
          ) // <img src={imageToUse && imageToUse.childImageSharp.fluid.src} />
        }
        {/* <VideoClips videos={clips} isActive={true} /> */}
        {isVideoMeta && (
          <>
            <p className="title display responsive">{title}</p>
            {!isRowsCentered && (
              <p className="order display responsive">
                {projectSequenceNumber}
              </p>
            )}
          </>
        )}
      </div>
      {!hideMeta && (
        <div className="project-list__project__meta">
          {isStandardMeta && (
            // hero column layout
            <>
              <p className="responsive centered">( {year} )</p>
              <p className="responsive span">
                {convertSplitIntoSpans(['Brand:', ...splitTextByChar(client)])}
              </p>
              {timeCodeSpan}
            </>
          )}
          {isPosterAltMeta && (
            // for grid layout
            <>
              <p className="span responsive">{yearSpan}</p>
              <p className="responsive span">
                {convertSplitIntoSpans(
                  ['Brand:', ...splitTextByChar(client)],
                  false,
                  false,
                  [
                    ...splitTextByChar(client).map((name) => ({
                      text: name,
                      class: 'italic',
                    })),
                  ]
                )}
              </p>
              {timeCodeSpan}
            </>
          )}
          {isPosterMeta && (
            // column layout
            <>
              <p className="cursive-font responsive centered bold">{year}</p>
              <p className="responsive centered">
                <span className="bold">
                  {category || ''}
                  {category && client ? ', ' : ''}
                </span>
                <span className="italic">{client || ''}</span>
              </p>
            </>
          )}
          {isSquareMeta && (
            <>
              {isBrandingSubtype && (
                <div className="project-list__project__meta__left">
                  <p className="responsive">
                    Branding: <span className="bold">{client}</span>
                  </p>
                </div>
              )}
              <div className="project-list__project__meta__right">
                {isBrandingSubtype ? (
                  <p className="responsive standard right">{category}</p>
                ) : (
                  <>
                    <p
                      className="responsive centered span"
                      style={{display: 'block'}}
                    >
                      {type || 'Brand'}: <span className="bold">{client}</span>
                    </p>
                    {timeCodeSpan}
                  </>
                )}
              </div>
            </>
          )}
        </div>
      )}
    </>
  )

  let ModalComponent = openModal && (
    <ProjectPage
      pageContext={{project: projectDetail, isPage: false}}
      onClose={closeModal}
    />
  )

  const contentParentClassName =
    'project-list__project__section project-list__project__section--left'

  const projectClassName = `project-list__project ${
    isColumnLayout
      ? 'project-list__project--columns'
      : 'project-list__project--row'
  } layout-${layoutType}`

  const ProjectContent = () => (
    <>
      {isColumnHero && (
        <p className="layout__columns--hero__sequence-number responsive cursive-font bold">
          {projectSequenceNumber}
        </p>
      )}
      {root && !isSlider ? (
        <TransitionElement
          className={contentParentClassName}
          root={root}
          threshold="0.2"
          triggerOnce={true}
          delay={i % numColumns}
        >
          {projectContent}
        </TransitionElement>
      ) : (
        <div className={contentParentClassName}>{projectContent}</div>
      )}
    </>
  )
  return (
    <>
      <div
        className={`project-list__project-container ${
          (reverseLayout ? index % 2 === 1 : index % 2 === 0)
            ? 'align-right'
            : 'align-left'
        } ${
          isColumnLayout && !isLastInColumn && !isLast
            ? 'border-right' + ' ' + theme
            : ''
        } ${i % 2 === 0 ? 'even' : 'odd'}`}
      >
        <div className="project-list__project-container__inner">
          <div className="project-list__project-container__content">
            {ModalComponent ? (
              <ProjectWithModal
                className={projectClassName}
                openModal={openModal}
                ModalComponent={ModalComponent}
              >
                <ProjectContent />
              </ProjectWithModal>
            ) : !isImageMeta ? (
              <ProjectLink className={projectClassName} slug={slug}>
                <ProjectContent />
              </ProjectLink>
            ) : (
              <div className={projectClassName}>
                <ProjectContent />
              </div>
            )}
          </div>
        </div>
      </div>
      {!isSlider && isLastInColumn && !isLast && (
        <div
          className={`spacing ${spacing} line ${theme} ${
            thinDivider ? 'thin' : ''
          }`}
        />
      )}
      {isPosterMeta && isLast && <div className="spacing no-top" />}
    </>
  )
}

const ProjectLink = ({className, slug, children}) => {
  return (
    // TODO: animated page transitions
    <Link className={className} to={'/projects/project/' + slug}>
      {children}
    </Link>
  )
}

const ProjectWithModal = ({children, className, openModal, ModalComponent}) => {
  return (
    <div
      className={`${className} 'has-modal'`}
      onClick={() => openModal(ModalComponent)}
    >
      {children}
    </div>
  )
}

export default ProjectList
// export default withModal(ProjectList, {modalRoot: '#project-info'})
