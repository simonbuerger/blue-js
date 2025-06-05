import each from '../each.js'
import assert from 'node:assert/strict'
import '../../../test/dom-setup.js'
import test from 'node:test'

test('each iterates over a collection', () => {
  document.body.children = []
  for (let i = 0; i < 3; i++) {
    const a = document.createElement('a')
    a.innerHTML = String(i)
    document.body.appendChild(a)
  }
  const links = document.querySelectorAll('a')
  each(links, (link, index) => {
    assert.equal(link.innerHTML, String(index))
  })
})

test('each runs against a single element when not iterable', () => {
  const link = document.querySelectorAll('a')[1]
  each(link, (el, index) => {
    assert.equal(el.innerHTML, '1')
    assert.equal(typeof index, 'undefined')
  })
})
