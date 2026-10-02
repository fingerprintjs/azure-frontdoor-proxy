import { describe, expect, it } from 'vitest'
import { getBrowserCacheControl } from './cacheControl.ts'

describe('getBrowserCacheControl', () => {
  it('removes s-maxage and keeps other directives as they are', () => {
    expect(getBrowserCacheControl('public, max-age=3742, s-maxage=629157')).toBe('public, max-age=3742')
  })

  it('removes s-maxage in any position', () => {
    expect(getBrowserCacheControl('s-maxage=10, public, max-age=600')).toBe('public, max-age=600')
  })

  it('removes s-maxage without whitespace around commas', () => {
    expect(getBrowserCacheControl('public,s-maxage=60,max-age=3600')).toBe('public, max-age=3600')
  })

  it('keeps commas inside quoted values', () => {
    expect(getBrowserCacheControl('public, ext="alpha,s-maxage=999", s-maxage=60, max-age=3600')).toBe(
      'public, ext="alpha,s-maxage=999", max-age=3600'
    )
  })

  it('keeps value without s-maxage unchanged', () => {
    expect(getBrowserCacheControl('no-cache')).toBe('no-cache')
  })
})
