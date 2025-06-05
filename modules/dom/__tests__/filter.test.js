import filter from '../filter.js'
import assert from 'node:assert/strict'
import test from 'node:test'

test('filter returns items that pass the predicate', () => {
  const items = [1, 2, 2, 2, 3]
  const filtered = filter(items, item => item === 2)
  assert.deepEqual(filtered, [2, 2, 2])
})

test('filter returns a new array', () => {
  const items = [1, 2, 2, 2, 3]
  const filtered = filter(items, item => item !== 2)
  assert.notStrictEqual(filtered, items)
})
