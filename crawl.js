const { JSDOM } = require('jsdom');

const normalizeURL = (url) => {
  if (!url || url === "") return ""
  const { host, pathname } = new URL(url)
  let properPathname = pathname
  if (properPathname.charAt(pathname.length - 1) === '/') {
    properPathname = pathname.slice(0, -1)
  }
  return host + properPathname 
}

const getURLsFromHTML = (htmlBody, baseUrl) => {
  const dom = new JSDOM(htmlBody)
  const links = Array.from(dom.window.document.querySelectorAll('a'));
  const linksUrls = links.map(link => link.getAttribute('href'))

  return linksUrls.map(link => {
    if (link.includes('http')) return link;
    return baseUrl + link
  });
}

const getHTMLfromURL = async (url) => {
  try {
    const response = await fetch(url)
    if (response.status >= 400) {
      console.log('Looks like there was a problem. Status Code: ' + response.status);
      return;
    }
    if (!response.headers.get('Content-Type').includes('text/html')) {
      console.log('The resource is not an html page')
      return
    }
    const htmlBody = await response.text()
    return htmlBody;
  } catch(err) {
    console.log(err.message)
  }
}

const crawlPage = async (baseUrl, currentUrl = baseUrl, pages = {}) => {
  const sameDomain = new URL(baseUrl).host === new URL(currentUrl).host;
  if (!sameDomain) return pages
  const normalizedUrl = normalizeURL(currentUrl)
  if (pages[normalizedUrl]) {
    pages[normalizedUrl] += 1
    return pages
  }
  pages[normalizedUrl] = 1
  const htmlBody = await getHTMLfromURL(currentUrl)
  const urls = getURLsFromHTML(htmlBody, baseUrl)
  urls.forEach(url => crawlPage(baseUrl, url, pages))
  return pages
}

module.exports = { normalizeURL, getURLsFromHTML, crawlPage  }