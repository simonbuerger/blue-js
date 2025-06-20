import apply from '../lang/apply.js'

/**
Iterate over a dom NodeList

@param {NodeList} els The NodeList (created using `getElementsByTagName` or `getElementsByClassName` or `querySelectorAll`) to loop over
@param {Function} fn The function to run against each element. Arguments passed are the same as Array.forEach
@memberof module:blue
@alias .each
@function
*/
export default function each (els, fn) {
  apply(els, fn)
}
