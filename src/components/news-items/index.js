import React from 'react'
import {addPlaceholderZeroes} from '../../utils'
import NewsItem from './news-item'
import './index.scss'

const NewsItems = ({
  data,
  root,
  openModal,
  closeModal,
  startingProjectIndex,
  numberOfProjects,
  showLastLine,
}) => {
  return (
    <div className="news-items">
      {data.map((news, i) => {
        const isLast = i !== data.length - 1
        return (
          <>
            <NewsItem
              index={i}
              project={news}
              root={root}
              openModal={openModal}
              closeModal={closeModal}
              projectIndex={addPlaceholderZeroes(
                (startingProjectIndex || 0) + i + 1,
                2
              )}
              numberOfProjects={addPlaceholderZeroes(numberOfProjects, 2)}
            />
            {(isLast || showLastLine) && (
              <div className={`spacing spacing--medium line`} />
            )}
          </>
        )
      })}
    </div>
  )
}

export default NewsItems
