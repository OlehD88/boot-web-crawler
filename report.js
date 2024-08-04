const printReport = (initPages) => {
  console.log('...REPORT START...')
  const pages = Object.keys(initPages);
  const sortedByValue = pages.sort((a, b) => {
    if (initPages[a] < initPages[b]) {
      return 1
    } else {
      return -1
    }
  })
  sortedByValue.forEach(url => {
    console.log(`Found ${initPages[url]} internal links to ${url}`)
  })
}

module.exports = { printReport }