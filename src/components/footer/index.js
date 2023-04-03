import {Link} from 'gatsby'
import React, {useState} from 'react'
import {convertSplitIntoSpans} from '../../utils'
import PalLogo from '../../elements/pl-logo'
import './index.scss'

export const Footer = (props) => {
  const {left, middle, right, color, inverted, hideLogo} = props
  const [infoActive, setInfoActive] = useState()
  return (
    <div
      className={`site-footer ${
        inverted ? 'inverted' : ''
      } site-footer--with-text`}
    >
      <div className="site-footer__content">
        {/* <MarqueeComponent inverted={!inverted} /> */}
        <div className="site-footer__content__column column-left">{left}</div>
        <div className={`site-footer__content__column column-center`}>
          {middle ||
            (hideLogo ? (
              ''
            ) : (
              <Link to="/">
                <PalLogo color={color || 'black'} />
              </Link>
            ))}
        </div>
        <div className="site-footer__content__column column-right">
          {right || (
            <div className="company-info">
              <div className="company-info__row">
                {infoEmailLink('info@', infoActive, setInfoActive)}
                <a href="tel:+13235132767">+1 ( 323 ) 513 2767</a>
              </div>
              <div className="company-info__row">
                {infoEmailLink(
                  <p className="span responsive">
                    {convertSplitIntoSpans(['partsandlabour', '.', 'com'])}
                  </p>,
                  infoActive,
                  setInfoActive
                )}
              </div>
              <div className="company-info__row phone-number">
                <p className="body-font normal-case">Los Angeles, CA</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

const infoEmailLink = (text, active, setActive) => {
  return (
    <a
      onMouseOver={() => setActive(true)}
      onMouseOut={() => setActive(false)}
      className={`email-link ${active ? ' email-link--active' : ''}`}
      href="mailto:info@partsandlabour.com"
    >
      {text}
    </a>
  )
}

export default Footer
