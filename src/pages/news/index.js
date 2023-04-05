import React from 'react'
import SEO from '../../elements/seo'
import ContentPage from '../../templates/content-page'
import NewsItems from '../../components/news-items'
import Footer from '../../components/footer'
import ContentBlock from '../../components/content-block'
import PageTitle from '../../components/page-title'
// import Reel from '../../components/reel'
import {graphql, useStaticQuery} from 'gatsby'

const NewsPage = () => {
  const {content, news} = useStaticQuery(graphql`
    query {
      content: pagesYaml(yamlId: {eq: "news"}) {
        ...page
      }
      news: allNewsYaml {
        edges {
          node {
            ...news
          }
        }
      }
    }
  `)
  const newsItems = news?.edges.map(({node}) => node)
  return (
    <>
      <SEO
        title="Parts & Labour: News"
        description="A multi-platform content company based in LA NYC and Toronto"
        keywords={[
          `Parts`,
          `Labour`,
          `agency`,
          `multi-platform`,
          `nyc`,
          `los angeles`,
          `Toronto`,
        ]}
      />

      <ContentPage
        className="news-page"
        logoColor={'black'}
        headerBackgroundColor={'forestGreen'}
      >
        {/* <TitleBackButton title="News:" /> */}
        <ContentBlock
          summary={<PageTitle title={content.title} />}
          smallSpacing
        />
        <ContentBlock
          summary={content.summary}
          noJustify
          smallerFont
          smallSpacing
          divider
        />
        {/* <div style={{display: 'block', width: '100%'}}>
                <Reel />
                <div className="spacing line spacing--medium" />
              </div> */}
        <NewsItems data={newsItems} showLastLine={true} />
        <Footer />
      </ContentPage>
    </>
  )
}

export default NewsPage
