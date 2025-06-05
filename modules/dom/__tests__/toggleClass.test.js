import toggleClass from '../toggleClass.js'
import assert from 'node:assert/strict'
import '../../../test/dom-setup.js'
import test from 'node:test'

test('toggleClass turns a present class off', () => {
  Object.defineProperty(window.Element.prototype, 'classList', { get: () => null })
  const div = document.createElement('div')
  div.className = 'bar'
  toggleClass(div, 'bar')
  assert.strictEqual(div.className, '')
})

test('toggleClass turns a missing class on', () => {
  const div = document.createElement('div')
  div.className = 'foo'
  toggleClass(div, 'bar')
  assert.strictEqual(div.className, 'foo bar')
})
