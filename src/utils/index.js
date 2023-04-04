import React from 'react'

export const useIsInViewport = (
  ref,
  parentRef,
  {min, max} = {},
  shouldLock,
  whenInView,
  shouldLog
) => {
  const [visibility, setVisibility] = React.useState(false)
  const [lock, setLock] = React.useState(false)
  React.useEffect(() => {
    const handleScroll = () => {
      if (!ref) {
        return
      }
      if (lock) {
        return 1
      }
      const {top, bottom, height} = ref.getBoundingClientRect()
      const start = (min || 0) * height
      const end = (max || 1) * height
      const startTrigger = height - (top + start)
      const endTrigger = end - start
      const visible = Math.max(0, Math.min(endTrigger, startTrigger))

      const percentage =
        Math.round((visible / endTrigger + Number.EPSILON) * 100) / 100
      if (percentage === 1 && shouldLock) {
        setLock(true)
      }
      if (percentage === 1 && whenInView) {
        whenInView()
      }
      return setVisibility(percentage)
    }
    const target = parentRef || window
    target?.addEventListener('scroll', handleScroll)
    handleScroll()
    return () => target?.removeEventListener('scroll', handleScroll)
  }, [ref, parentRef, visibility, shouldLock, lock, whenInView])

  return visibility
}

export const isMobile = function () {
  var check = false
  ;(function (a) {
    if (
      /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
        a
      ) ||
      /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
        a.substr(0, 4)
      )
    )
      check = true
  })(navigator.userAgent || navigator.vendor || window.opera)
  return check
}

export const isInBrowser = typeof window !== 'undefined'

export const isSmallScreen = () => {
  return typeof window !== `undefined` && window.innerWidth <= 736
}

export const getTitleCreditText = (
  title,
  credit,
  creditName,
  useShortCredit,
  shouldDisplay = true
) => {
  return `${title}, ${getCreditText(
    credit,
    creditName,
    useShortCredit,
    shouldDisplay
  )}`
}

export const getCreditClientText = (
  client,
  credit,
  creditName,
  useShortCredit,
  shouldDisplay = true
) => {
  return `${getCreditText(
    credit,
    creditName,
    useShortCredit,
    shouldDisplay
  )} for ${client}`
}

export const getCreditText = (
  credit,
  creditName,
  useShortCredit,
  shouldDisplay = true
) => {
  const creditVerb =
    credit &&
    (useShortCredit ? creditVerbsShort : creditVerbs)[credit.toLowerCase()]

  let creditText = shouldDisplay && creditVerb && creditName ? creditVerb : ''
  creditText +=
    shouldDisplay && creditName
      ? `${
          creditVerb ? ' ' : creditVerb ? ', ' : '' + credit + ', '
        }${creditName}`
      : ''

  return `${creditText}`
}

export const creditVerbs = {
  director: 'Directed by',
  producer: 'Produced by',
  ['visual effects']: 'VFX by',
}

export const creditVerbsShort = {
  director: 'Dir. by',
  producer: 'Prod. by',
  ['visual effects']: 'VFX by',
}

export const addPlaceholderZeroes = (num, placeholders) => {
  const zeroes = [...Array(placeholders)].map((_i) => '0').join('')
  const diff = zeroes.length - String(num).length
  return diff > 0 ? zeroes.substr(0, diff) + String(num) : String(num)
}

/**
 * Array.flat() polyfill
 * Adapted from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat#reduce_concat_isArray_recursivity
 */
if (!Array.prototype.flat) {
  Array.prototype.flat = function (depth) {
    'use strict'

    // If no depth is specified, default to 1
    if (depth === undefined) {
      depth = 1
    }

    // Recursively reduce sub-arrays to the specified depth
    var flatten = function (arr, depth) {
      // If depth is 0, return the array as-is
      if (depth < 1) {
        return arr.slice()
      }

      // Otherwise, concatenate into the parent array
      return arr.reduce(function (acc, val) {
        return acc.concat(Array.isArray(val) ? flatten(val, depth - 1) : val)
      }, [])
    }

    return flatten(this, depth)
  }
}

export const splitTextByChar = (text, delimiter = ' ') => {
  return text ? text.split(delimiter) : []
}

export const getCharArray = (text) =>
  [...Array(text.length)].map((_char, i) => text.charAt(i))

export const convertSplitIntoSpans = (
  splitText,
  removeSpaces = false,
  addSpaces = false,
  replacements = []
) => {
  let spans = splitText.filter((string) =>
    removeSpaces ? string !== '' : string
  )
  if (spans.length === 1) {
    spans = getCharArray(spans[0])
  }
  if (addSpaces) {
    let newSpans = [...spans]
    for (let i = 0; i < spans.length; i++) {
      const span = spans[i]
      const index = newSpans.indexOf(span)
      if (i !== spans.length - 1) {
        newSpans.splice(index + 1, 0, ' ')
      }
    }
    spans = newSpans
  }
  spans = spans.map((string, index) => {
    let replacedString = string
    if (replacements) {
      for (let i = 0; i < replacements.length; i++) {
        const replacement = replacements[i]
        replacedString = replacedString.replace(
          new RegExp(replacement.text, 'g'),
          `<span class="${replacement.class}">${replacement.text}</span>`
        )
      }
    }
    return (
      <span key={index} dangerouslySetInnerHTML={{__html: replacedString}} />
    )
  })
  return spans
}

export const onEnterHandler = (callback) => ({
  onKeydown: (e) => {
    if (e.key == 'Enter') {
      callback()
    }
  },
})

export const lastTwoYearDigits = () => {
  const fullYear = new Date().getFullYear().toString()
  return fullYear.slice(fullYear.length - 2, fullYear.length)
}
