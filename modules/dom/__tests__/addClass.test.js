import addClass from '../addClass.js'
import assert from 'node:assert/strict'
import '../../../test/dom-setup.js'
import test from 'node:test'

test('addClass should add a class to the current class', () => {
  Object.defineProperty(window.Element.prototype, 'classList', {
    get () {
      return null
    }
  })
  const div = document.createElement('div')
  div.className = 'foo bar '
  addClass(div, 'baz')
  assert.equal(div.className, 'foo bar baz')
})

test('addClass should not add an existing class', () => {
  const div = document.createElement('div')
  div.className = 'foo bar'
  addClass(div, 'bar')
  assert.equal(div.className, 'foo bar')
})
