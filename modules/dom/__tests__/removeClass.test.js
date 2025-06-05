import removeClass from '../removeClass.js'
import assert from 'node:assert/strict'
import '../../../test/dom-setup.js'
import test from 'node:test'

test('removeClass removes a class from the element', () => {
  Object.defineProperty(window.Element.prototype, 'classList', { get: () => null })
  const div = document.createElement('div')
  div.className = 'foo bar'
  removeClass(div, 'bar')
  assert.strictEqual(div.className, 'foo')
})

test('removeClass removes multiple instances', () => {
  const div = document.createElement('div')
  div.className = 'bar foo foo foo bar foo foo '
  removeClass(div, 'foo')
  assert.strictEqual(div.className, 'bar bar')
})

test('removeClass trims whitespace', () => {
  const div = document.createElement('div')
  div.className = '   foo foo foo bar foo foo  '
  removeClass(div, 'foo')
  assert.strictEqual(div.className, 'bar')
})

test('removeClass does not remove part of a compound class', () => {
  const div = document.createElement('div')
  div.className = 'foobar foo'
  removeClass(div, 'foo')
  assert.strictEqual(div.className, 'foobar')
})
