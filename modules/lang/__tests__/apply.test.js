import apply from '../apply.js'
import assert from 'node:assert/strict'
import test from 'node:test'

test('apply iterates over any iterable', () => {
  const items = [0, 1, 2, 3]
  apply(items, (item, index) => {
    assert.equal(item, index)
  })
  const foo = '0123'
  apply(foo, (item, index) => {
    assert.equal(item, String(index))
  })
})

test('apply runs against object if not iterable', () => {
  const foo = { text: '123' }
  apply(foo, (item, index) => {
    assert.equal(item.text, '123')
    assert.equal(typeof index, 'undefined')
  })
})

test('apply does nothing for iterable of zero length', () => {
  const items = []
  apply(items, () => {
    assert.fail()
  })
})
