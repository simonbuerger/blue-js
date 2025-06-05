import wrap from '../wrap.js'
import assert from 'node:assert/strict'
import '../../../test/dom-setup.js'
import test from 'node:test'

test('wrap keeps reference to the original node', () => {
  document.body.children = []
  const foo = document.createElement('div')
  foo.className = 'foo'
  document.body.appendChild(foo)
  const div = document.createElement('div')
  wrap(foo, div)
  const foo2 = document.querySelector('.foo')
  assert.strictEqual(foo, foo2)
})

test('wrap replaces outerHTML via function', () => {
  const div = document.createElement('div')
  document.body.appendChild(div)
  div.className = 'foo'
  wrap(div, html => '<div class="test">' + html + '</div>')
  assert.strictEqual(div.parentNode.outerHTML, '<div class="test"><div class="foo"></div></div>')
})

test('wrap with new node', () => {
  const div = document.createElement('div')
  const div2 = document.createElement('div')
  document.body.appendChild(div)
  div.className = 'foo'
  div2.className = 'test'
  wrap(div, div2)
  assert.strictEqual(div.parentNode.outerHTML, '<div class="test"><div class="foo"></div></div>')
})

test('wrap with two strings', () => {
  const div = document.createElement('div')
  document.body.appendChild(div)
  div.className = 'foo'
  wrap(div, '<div class="test">', '</div>')
  assert.strictEqual(div.parentNode.outerHTML, '<div class="test"><div class="foo"></div></div>')
})

test('wrap with single string element', () => {
  const div = document.createElement('div')
  document.body.appendChild(div)
  div.className = 'foo'
  wrap(div, '<div class="test"></div>')
  assert.strictEqual(div.parentNode.outerHTML, '<div class="test"><div class="foo"></div></div>')
})
