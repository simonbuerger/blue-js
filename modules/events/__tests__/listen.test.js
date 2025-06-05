import listen from '../listen.js'
import assert from 'node:assert/strict'
import '../../../test/dom-setup.js'
import test from 'node:test'

test('listen for an event', t => {
  return new Promise(resolve => {
    const link = document.createElement('a')
    listen(link, 'click', () => resolve())
    const evt = new window.Event('click')
    link.dispatchEvent(evt)
  })
})

test('listener remove function removes the handler', async () => {
  const link = document.createElement('a')
  let count = 0
  const listener = listen(link, 'click', () => { count++ })
  const evt = new window.Event('click')
  link.dispatchEvent(evt)
  listener.remove()
  link.dispatchEvent(evt)
  await new Promise(r => setTimeout(r, 50))
  assert.equal(count, 1)
})

test('listen handles multiple events', t => {
  return new Promise(resolve => {
    const link = document.createElement('a')
    let count = 0
    listen(link, 'click mouseenter', () => {
      count++
      if (count === 2) resolve()
    })
    link.dispatchEvent(new window.Event('click'))
    link.dispatchEvent(new window.Event('mouseenter'))
  })
})
