import { test, expect } from '@jest/globals'
import { getURLsFromHTML, normalizeURL } from './crawl'

test('Normalize URL', () => {
  const firstUrl = 'https://blog.boot.dev/path/'
  const expectedOutputUrl = 'blog.boot.dev/path'
  expect(normalizeURL(firstUrl)).toEqual(expectedOutputUrl)
  
  const seconUrl = 'https://blog.boot.dev/path'
  expect(normalizeURL(seconUrl)).toEqual(expectedOutputUrl)

  const thirdUrl = ''
  expect(normalizeURL(thirdUrl)).toEqual("")

  const httpUrl = 'http://blog.boot.dev/path'
  expect(normalizeURL(httpUrl)).toEqual(expectedOutputUrl)
})

test('Get URLS from HTML', () => {
  const baseUrl = "https://blog.boot.dev"
  const html = `<html>
    <body>
        <a href="https://blog.boot.dev/absolute-path"><span>Go to Boot.dev</span></a>
        <a href="/some-relative-path"><span>Go to Boot.dev</span></a>
        <a href="https://blog.boot.dev/second-path"><span>Go to Boot.dev</span></a>
        <a href="/second-relative-path"><span>Go to Boot.dev</span></a>
    </body>
  </html>`;
  const exptededUrls = [
    "https://blog.boot.dev/absolute-path",
    "https://blog.boot.dev/some-relative-path",
    "https://blog.boot.dev/second-path",
    "https://blog.boot.dev/second-relative-path"
  ]
  const urls = getURLsFromHTML(html, baseUrl)
  expect(urls.length).toEqual(exptededUrls.length)
  
  urls.forEach((url, i) => {
    expect(url).toEqual(exptededUrls[i])
  })
})