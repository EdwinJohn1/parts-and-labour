import React from 'react'
import ProjectBlock from '../../project-block'

const NewsItem = ({project}) => {
  const {
    date,
    title,
    category,
    year,
    description,
    meta,
    lists,
    region,
    language,
    runtime,
    image,
    link,
  } = project

  return (
    <ProjectBlock image={image} title={title} link={link}>
      <div className="news-item">
        <p className="responsive cursive-font bold news-item__project-date break">
          {date}
        </p>
        <p className="responsive news-item__project-title">
          <span className="body-font-bold">{category || title}</span>
          {year && <span>( {year} )</span>}
        </p>
        {category && title && <p className="responsive">{title},</p>}
        {meta &&
          meta.map((entry, i) => (
            <p
              className={`responsive news-item__project-meta ${
                i === meta.length - 1 ? 'break' : ''
              }`}
              dangerouslySetInnerHTML={{__html: entry}}
            />
          ))}
        <p
          className="responsive break"
          dangerouslySetInnerHTML={{__html: description}}
        />
        {lists &&
          lists.map((list, i) => {
            return (
              <>
                <p className="responsive">
                  {list.titleBold && (
                    <span className="bold">{list.titleBold}</span>
                  )}
                  {list.subtitle && (
                    <span>
                      {list.titleBold && ' '}
                      {list.subtitle}
                    </span>
                  )}
                </p>
                {list.items && (
                  <>
                    {list.items.map((item, n) => {
                      return (
                        <>
                          <p
                            className={`responsive ${
                              (region || i !== lists.length - 1) &&
                              n === list.items.length - 1
                                ? 'break'
                                : ''
                            }`}
                          >
                            {item}
                          </p>
                        </>
                      )
                    })}
                  </>
                )}
              </>
            )
          })}
        {region && <p class="responsive">{region}</p>}
        {language && <p class="responsive">{language}</p>}
        {runtime && <p class="responsive">{runtime}</p>}
      </div>
    </ProjectBlock>
  )
}

export default NewsItem
