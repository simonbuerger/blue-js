import listen from '../listen.js'
import trigger from '../trigger.js'
import assert from 'node:assert/strict'
import '../../../test/dom-setup.js'
import test from 'node:test'

test('trigger a standard event', () => {
  return new Promise(resolve => {
    const link = document.createElement('a')
    listen(link, 'click', () => resolve())
    trigger(link, 'click')
  })
})

test('trigger a custom event', () => {
  return new Promise(resolve => {
    const link = document.createElement('a')
    listen(link, 'Foo:Bar', () => resolve())
    trigger(link, 'Foo:Bar')
  })
})

test('trigger passes data through', () => {
  return new Promise(resolve => {
    const link = document.createElement('a')
    listen(link, 'Foo:Bar', evt => { if (evt.detail.foo === 'bar') resolve() })
    trigger(link, 'Foo:Bar', { foo: 'bar' })
  })
})

test('trigger works without CustomEvent', () => {
  return new Promise(resolve => {
    delete window.CustomEvent
    const link = document.createElement('a')
    listen(link, 'Foo:Bar', evt => { if (evt.detail.foo === 'bar') resolve() })
    trigger(link, 'Foo:Bar', { foo: 'bar' })
  })
})
