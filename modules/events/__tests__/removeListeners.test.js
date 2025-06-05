import removeListeners from '../removeListeners.js'
import listenCollection from '../listenCollection.js'
import assert from 'node:assert/strict'
import '../../../test/dom-setup.js'
import test from 'node:test'

test('remove a listener from a single element', async () => {
  let count = 0
  const link = document.createElement('a')
  listenCollection(link, 'click', () => { count++ })
  const evt = new window.Event('click')
  link.dispatchEvent(evt)
  removeListeners(link, 'click')
  link.dispatchEvent(evt)
  await new Promise(r => setTimeout(r, 50))
  assert.equal(count, 1)
})

test('do not remove listener with different name', async () => {
  let count = 0
  const link = document.createElement('a')
  listenCollection(link, 'click', () => { count++ })
  const evt = new window.Event('click')
  link.dispatchEvent(evt)
  removeListeners(link, 'mouseenter')
  link.dispatchEvent(evt)
  await new Promise(r => setTimeout(r, 50))
  assert.equal(count, 2)
})

test('only remove listeners with same name', async () => {
  let count = 0
  const link = document.createElement('a')
  listenCollection(link, 'click mouseenter', () => { count++ })
  const clickEvt = new window.Event('click')
  const mouseEvt = new window.Event('mouseenter')
  link.dispatchEvent(clickEvt)
  link.dispatchEvent(mouseEvt)
  removeListeners(link, 'click')
  link.dispatchEvent(clickEvt)
  link.dispatchEvent(mouseEvt)
  await new Promise(r => setTimeout(r, 50))
  assert.equal(count, 3)
})

test('remove multiple listeners for same event', async () => {
  let count = 0
  const link = document.createElement('a')
  listenCollection(link, 'click', () => { count++ })
  listenCollection(link, 'click', () => { count++ })
  const evt = new window.Event('click')
  link.dispatchEvent(evt)
  removeListeners(link, 'click')
  link.dispatchEvent(evt)
  await new Promise(r => setTimeout(r, 50))
  assert.equal(count, 2)
})

test('remove multiple listeners from multiple elements', async () => {
  let count = 0
  const link1 = document.createElement('a')
  const link2 = document.createElement('a')
  document.body.appendChild(link1)
  document.body.appendChild(link2)
  const links = document.querySelectorAll('a')
  listenCollection(links, 'click mouseenter', e => {
    if (e.target === link1 || e.target === link2) count++
  })
  const clickEvt = new window.Event('click')
  const mouseEvt = new window.Event('mouseenter')
  link1.dispatchEvent(clickEvt)
  link2.dispatchEvent(mouseEvt)
  removeListeners(links, 'click mouseenter')
  link2.dispatchEvent(clickEvt)
  link1.dispatchEvent(mouseEvt)
  link1.dispatchEvent(clickEvt)
  link2.dispatchEvent(mouseEvt)
  await new Promise(r => setTimeout(r, 50))
  assert.equal(count, 2)
})
