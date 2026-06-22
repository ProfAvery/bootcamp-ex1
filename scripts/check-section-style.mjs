import { chromium } from 'playwright';
(async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.goto('http://localhost:1234/', { waitUntil: 'networkidle' });
    await page.waitForSelector('.posts');
    const style = await page.$eval('.posts', s => {
        const cs = window.getComputedStyle(s);
        return {
            display: cs.display,
            flexWrap: cs.flexWrap,
            columnCount: cs.columnCount || cs.getPropertyValue('column-count'),
            width: cs.width,
            columnGap: cs.columnGap
        };
    });
    console.log(style);
    await browser.close();
})();
