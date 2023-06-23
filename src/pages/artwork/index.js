import {graphql, useStaticQuery} from 'gatsby'
import React from 'react'
import ContentBlock from '../../components/content-block'
import Footer from '../../components/footer'
import SEO from '../../elements/seo'
import ContentPage from '../../templates/content-page'
import {lastTwoYearDigits} from '../../utils'
import './index.scss'

const ShopPage = () => {
  const {shops} = useStaticQuery(graphql`
    query {
      shops: allShopYaml {
        edges {
          node {
            ...shop
          }
        }
      }
    }
  `)
  const shopItems = shops?.edges.map(({node}) => node)
  const allShopItems = [
    ...new Set(shopItems.map(({products}) => products).flat()),
  ]
  return (
    <ContentPage
      className="shop-page"
      logoColor={'black'}
      headerBackgroundColor={'royalBlue'}
    >
      <SEO
        title="Parts & Labour: Shop"
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

      <ContentBlock
        altTitleFont
        title={`AW/${lastTwoYearDigits()} Shop`}
        smallSpacing
      />
      <div className="spacing line small spacing--medium width--fullscreen" />
      <img src='/image/image_1.png'/>
      <Footer />
    </ContentPage>
  )
}

const ShopItems = ({title, products}) => {
  return (
    <ContentBlock
      className="shop__category"
      // expanded={this.state.allOpen}
      accordion
      title={title}
      smallSpacing
    >
      <div className="shop__products">
        {products.map((product) => {
          // const Modal = (
          //   <ShopItem
          //     {...product}
          //     closeModal={this.props.closeModal}
          //   />
          // )
          return (
            <p
              className="display"
              // onClick={() => {
              //   this.props.openModal(Modal)
              // }}
              style={{cursor: 'pointer'}}
              tabIndex={0}
            >
              {product.name}
            </p>
          )
        })}
        <div className="spacing spacing--medium line"></div>
      </div>
    </ContentBlock>
  )
}

export default ShopPage
