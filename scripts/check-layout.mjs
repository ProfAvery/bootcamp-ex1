import { chromium } from 'playwright';

(async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.goto('http://localhost:1234/', { waitUntil: 'networkidle' });
    await page.waitForSelector('article');

    const results = await page.$$eval('article', els => els.map(e => {
        const rect = e.getBoundingClientRect();
        const style = window.getComputedStyle(e);
        return {
            left: rect.left,
            marginLeft: style.marginLeft,
            paddingLeft: style.paddingLeft,
            display: style.display
        };
    }));

    results.forEach((r, i) => {
        console.log(`Article ${i + 1}: left=${r.left}, marginLeft=${r.marginLeft}, paddingLeft=${r.paddingLeft}, display=${r.display}`);
    });

    await browser.close();
})();
