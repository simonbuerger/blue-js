import getWindowDimensions from '../getWindowDimensions.js'
import assert from 'node:assert/strict'
import '../../../test/dom-setup.js'
import test from 'node:test'

test('getWindowDimensions returns width and height numbers', () => {
  const dimensions = getWindowDimensions()
  assert.equal(typeof dimensions.width, 'number')
  assert.equal(typeof dimensions.height, 'number')
})
