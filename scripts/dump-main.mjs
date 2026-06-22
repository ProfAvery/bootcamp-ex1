import { chromium } from 'playwright';

(async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.goto('http://localhost:1234/', { waitUntil: 'networkidle' });
    await page.waitForSelector('main');
    const html = await page.$eval('main', e => e.innerHTML);
    console.log(html);
    await browser.close();
})();
