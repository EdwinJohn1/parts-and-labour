import {Link, navigate} from 'gatsby'
import React, {useEffect, useLayoutEffect, useRef, useState} from 'react'
import arrowWhite from '../../images/icons/arrow-white.svg'
import arrow from '../../images/icons/arrow.svg'
import {onEnterHandler} from '../../utils'

import './index.scss'

let expandCallback

const ContentBlock = ({
  expanded,
  className,
  altTitleFont,
  onExpandChange,
  titleDivider,
  noPeriodSpace,
  persistAccordionContent,
  accordion,
  backButton,
  title,
  summary,
  divider,
  noDividerSpacingBottom,
  noJustify,
  smallerFont,
  link,
  linkText,
  isDark,
  smallSpacing,
  thinDivider,
  thickDivider,
  children,
}) => {
  const contentRef = useRef()
  const containerRef = useRef()
  const [expand, setExpand] = useState(expanded)
  const [renderContent, setRenderContent] = useState(
    !accordion || persistAccordionContent
  )
  const canExpand = accordion

  useLayoutEffect(() => {
    requestAnimationFrame(() => {
      if (canExpand) {
        if (expand) {
          if (!persistAccordionContent) {
            setRenderContent(true)
          }
          requestAnimationFrame(() => {
            if (contentRef.current && containerRef.current) {
              containerRef.current.style.height =
                contentRef.current.offsetHeight + 'px'
            }
            if (expandCallback) {
              requestAnimationFrame(expandCallback)
              expandCallback = undefined
            }
          })
        } else if (!expand && containerRef.current) {
          containerRef.current.style.height = '0px'
          if (!persistAccordionContent) {
            setTimeout(() => {
              setRenderContent(false)
            }, 500)
          }
          if (expandCallback) {
            requestAnimationFrame(expandCallback)
            expandCallback = undefined
          }
        }
      }
    })
  }, [expand, accordion, canExpand])

  useEffect(() => {
    if (expanded !== expand) {
      setExpand(expanded)
    }
  }, [expanded])
  const manualSetExpand = (newExpand) => {
    setExpand(newExpand)
    if (onExpandChange) {
      expandCallback = () => onExpandChange(newExpand)
    }
  }
  const summaryIsString = typeof summary === 'string'
  let summaryText = summaryIsString ? summary : undefined
  if (
    !noPeriodSpace &&
    summaryText &&
    summaryText[summaryText.length - 1] === '.' &&
    summaryText[summaryText.length - 2] != ' '
  ) {
    summaryText = summaryText.slice(0, summaryText.length - 1) + ' .'
  }
  let summaryEl = summaryIsString ? (
    <p
      className={`display responsive ${!noJustify ? 'justify' : ''} ${
        smallerFont ? 'smaller-font' : ''
      }`}
      dangerouslySetInnerHTML={{__html: summaryText}}
    />
  ) : (
    summary
  )

  if (link && summaryText) {
    const fullReelLink = (
      // TODO: add page transitions
      <Link to={link}>
        {linkText && (
          <span className="cursive-font bold normal-case">{linkText}</span>
        )}
      </Link>
    )

    const lastWordRegex = /\b(\w+)\W*$/.exec(summary)
    const lastWord = lastWordRegex[1]

    summaryEl = (
      <p
        className={`display responsive ${!noJustify ? 'justify' : ''} ${
          smallerFont ? 'smaller-font' : ''
        }`}
      >
        <span
          dangerouslySetInnerHTML={{
            __html: summaryText.slice(0, lastWordRegex.index),
          }}
        />{' '}
        <span>
          <span>
            {lastWord} {fullReelLink}
          </span>
        </span>{' '}
        .
      </p>
    )
  }

  const onExpandHandler = () => accordion && manualSetExpand(!expand)
  let spacingClass = smallSpacing ? 'spacing spacing--medium' : 'spacing'
  if (thinDivider) {
    spacingClass += ' thin'
  }
  if (thickDivider) {
    spacingClass += ' thick'
  }
  return (
    <div
      className={`content-block ${canExpand ? 'accordion' : ''} ${
        isDark ? 'inverted' : ''
      } ${className ? className : ''}`}
    >
      <div className="content-block__heading">
        {title && (
          <div className="content-block__heading__title">
            {backButton && (
              <div className="back-button">
                <p
                  className="close"
                  onClick={(e) => {
                    e.preventDefault()
                    navigate(-1)
                  }}
                />
              </div>
            )}
            <h1
              onClick={onExpandHandler}
              className={`display responsive heading-1--size-2 ${
                altTitleFont ? 'alt' : ''
              }`}
              dangerouslySetInnerHTML={{__html: title}}
            />
          </div>
        )}
        {canExpand && (
          <>
            <div
              tabIndex={0}
              onClick={onExpandHandler}
              {...onEnterHandler(onExpandHandler)}
              className={`expand-btn expand-btn--${
                expand ? 'expanded' : 'collapsed'
              }`}
            >
              <img src={isDark ? arrowWhite : arrow} />
            </div>
          </>
        )}
      </div>
      {(canExpand || titleDivider) && (
        <div
          className={`${spacingClass} line ${
            canExpand ? 'expand-divider' : ''
          }`}
        ></div>
      )}
      <div className="content-block__container" ref={containerRef}>
        <div className="content-block__content" ref={contentRef}>
          {renderContent && (
            <>
              {summaryEl}
              {divider && (
                <div
                  className={`${spacingClass} line ${
                    noDividerSpacingBottom && 'no-bottom'
                  }`}
                />
              )}
              {children && (
                <div className="content-block__content__children">
                  {children}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default ContentBlock
