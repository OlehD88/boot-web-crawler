const { argv } = require('node:process');
const { crawlPage } = require('./crawl')
const { printReport } = require('./report')

const main = async () => {
  if (argv.length < 3) {
    console.log('Pleae provide proper URL for carwling')
    return
  } else if (argv.length > 3) {
    console.log('Too much arguments')
    return
  }

  const baseUrl = argv[2]
  console.log(`Start crawling ${baseUrl}`)
  const pages = await crawlPage(baseUrl);
  printReport(pages)
}

main();