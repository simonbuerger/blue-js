import listenCollection from '../listenCollection.js'
import assert from 'node:assert/strict'
import '../../../test/dom-setup.js'
import test from 'node:test'

test('listenCollection listens across multiple elements', () => {
  return new Promise(resolve => {
    let count = 0
    const link1 = document.createElement('a')
    const link2 = document.createElement('a')
    document.body.appendChild(link1)
    document.body.appendChild(link2)
    const links = document.querySelectorAll('a')
    listenCollection(links, 'click', event => {
      if (event.target === link1 || event.target === link2) count++
      if (count === 2) resolve()
    })
    const clickEvt = new window.Event('click')
    link1.dispatchEvent(clickEvt)
    link2.dispatchEvent(clickEvt)
  })
})
