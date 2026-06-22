import { chromium } from 'playwright';

(async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.goto('http://localhost:1234/', { waitUntil: 'networkidle' });
    await page.waitForSelector('.posts');
    const col = await page.$eval('.posts', s => window.getComputedStyle(s).columnCount || window.getComputedStyle(s).getPropertyValue('column-count'));
    console.log('computed column-count:', col);
    await browser.close();
})();
