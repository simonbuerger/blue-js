import { filterClass } from '../utils/classlist.js'
/**
Remove a class from an element

@param {HTMLElement} el The dom node
@param {String} cls The class to remove
@memberof module:blue
@alias .removeClass
@function
*/
export default function removeClass (el, cls) {
  if (el.classList && typeof el.classList.remove === 'function') return el.classList.remove(cls)
  el.className = filterClass(el.className, cls)
}
