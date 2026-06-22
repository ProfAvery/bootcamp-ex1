import { chromium } from 'playwright';

(async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    page.on('console', msg => console.log('console:', msg.type(), msg.text()));
    page.on('pageerror', err => console.log('pageerror:', err.message));
    await page.goto('http://localhost:1234/', { waitUntil: 'networkidle' });
    const text = await page.locator('body').innerText();
    console.log(text);
    await browser.close();
})();
