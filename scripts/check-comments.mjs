import { chromium } from 'playwright';

(async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.goto('http://localhost:1234/', { waitUntil: 'networkidle' });
    await page.waitForSelector('main > article');

    // open first details to render comments
    const details = await page.$('details');
    if (details) await details.evaluate(el => { el.open = true });
    await page.waitForSelector('details aside', { timeout: 10000 });

    const asides = await page.$$eval('details aside', els => els.map(e => {
        const r = e.getBoundingClientRect();
        return { left: r.left, top: r.top };
    }));

    asides.forEach((a, i) => console.log(`aside ${i + 1}: left=${a.left}, top=${a.top}`));

    await browser.close();
})();
