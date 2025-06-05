import hasClass from '../hasClass.js'
import assert from 'node:assert/strict'
import '../../../test/dom-setup.js'
import test from 'node:test'

test('hasClass matches a single class', () => {
  Object.defineProperty(window.Element.prototype, 'classList', {
    get () { return null }
  })
  const div = document.createElement('div')
  div.className = 'bar'
  const match = hasClass(div, 'bar')
  assert.strictEqual(match, true)
})

test('hasClass matches multiple instances', () => {
  const div = document.createElement('div')
  div.className = 'bar bar'
  const match = hasClass(div, 'bar')
  assert.strictEqual(match, true)
})

test('hasClass does not match part of compound class', () => {
  const div = document.createElement('div')
  div.className = 'barbar'
  const match = hasClass(div, 'bar')
  assert.strictEqual(match, false)
})
