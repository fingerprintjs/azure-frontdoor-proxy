import { describe, expect, it } from 'vitest'
import { getValidRegion, Region } from './region.ts'

describe('getValidRegion', () => {
  it.each(Object.values(Region))('returns valid region as is: %s', (region) => {
    expect(getValidRegion(region)).toBe(region)
  })

  it.each(['invalid', 'US', ''])('falls back to US for unknown region: %s', (region) => {
    expect(getValidRegion(region)).toBe(Region.us)
  })

  it.each(['toString', 'constructor', 'hasOwnProperty', '__proto__'])(
    'falls back to US for object prototype key: %s',
    (region) => {
      expect(getValidRegion(region)).toBe(Region.us)
    }
  )
})
