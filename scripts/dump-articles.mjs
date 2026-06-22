import { chromium } from 'playwright';

(async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.goto('http://localhost:1234/', { waitUntil: 'networkidle' });
    await page.waitForSelector('article');
    const articles = await page.$$eval('article', els => els.map(e => e.outerHTML));
    articles.forEach((html, i) => {
        console.log(`--- ARTICLE ${i + 1} ---`);
        console.log(html);
    });
    await browser.close();
})();
