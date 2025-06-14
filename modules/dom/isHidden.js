import isVisible from './isVisible.js'

/**
Check whether an element is hidden
@param {HTMLElement} el The dom node
@returns {Boolean} True if `el` is visibly hidden, otherwise false
@memberof module:blue
@alias .isHidden
@function
*/
export default function isHidden (el) {
  return !isVisible(el)
}
