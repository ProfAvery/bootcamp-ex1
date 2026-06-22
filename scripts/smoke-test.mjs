import { chromium } from 'playwright';

async function httpCheck() {
    console.log('1) Checking dev server root HTML...')
    const res = await fetch('http://localhost:1234/')
    if (res.status !== 200) throw new Error(`Dev server root returned ${res.status}`)
    console.log('  ✓ dev server responded 200')

    console.log('2) Checking posts endpoint (jsonplaceholder)...')
    const postsRes = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=1')
    if (postsRes.status !== 200) throw new Error('Posts endpoint not reachable')
    const posts = await postsRes.json()
    if (!Array.isArray(posts) || posts.length === 0) throw new Error('No posts returned')
    console.log('  ✓ posts endpoint returned sample post')

    const postId = posts[0].id || 1
    console.log(`3) Checking comments endpoint for post ${postId}...`)
    const commentsRes = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
    if (commentsRes.status !== 200) throw new Error('Comments endpoint not reachable')
    const comments = await commentsRes.json()
    if (!Array.isArray(comments) || comments.length === 0) throw new Error('No comments returned for post')
    console.log('  ✓ comments endpoint returned data')
}

async function browserCheck() {
    console.log('4) Running headless browser checks (Playwright)...')
    const browser = await chromium.launch()
    const page = await browser.newPage()
    await page.goto('http://localhost:1234/', { waitUntil: 'networkidle' })

    // wait for client-rendered articles
    await page.waitForSelector('article', { timeout: 10000 })
    const articleCount = await page.$$eval('article', els => els.length)
    if (articleCount === 0) throw new Error('No articles rendered in client')
    console.log(`  ✓ ${articleCount} article(s) rendered`)

    // open the first details and wait for comments to load
    const details = await page.$('details')
    if (!details) throw new Error('No comments details found')
    await details.evaluate(el => { el.open = true })

    await page.waitForSelector('details aside', { timeout: 10000 })
    const commentCount = await page.$$eval('details aside', els => els.length)
    if (commentCount === 0) throw new Error('No comments rendered after opening details')
    console.log(`  ✓ ${commentCount} comment(s) rendered after opening details`)

    await browser.close()
}

(async () => {
    try {
        await httpCheck()
        await browserCheck()
        console.log('\nSMOKE TESTS PASSED')
        process.exit(0)
    } catch (err) {
        console.error('\nSMOKE TESTS FAILED:', err.message)
        process.exit(1)
    }
})()
