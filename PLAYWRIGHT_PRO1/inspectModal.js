const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('https://eventhub.rahulshettyacademy.com/login');
  await page.fill('#email','dummydol@yahoo.com');
  await page.fill('#password','Hyderabad@12345');
  await page.click('#login-btn');
  await page.waitForLoadState('networkidle');
  await page.goto('https://eventhub.rahulshettyacademy.com/bookings');
  await page.waitForLoadState('networkidle');
  const before = await page.$$eval('button#cancel-booking-btn', els => els.length);
  console.log('BEFORE=' + before);
  if (before > 0) {
    await page.click('button#cancel-booking-btn');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);
    const modals = await page.$$eval('div, section, dialog', els => els.filter(el => window.getComputedStyle(el).display !== 'none' && el.innerText.trim().length > 0).map(el => ({tag: el.tagName, text: el.innerText.trim().slice(0,200), id: el.id, class: el.className})).slice(0,30));
    console.log('MODALS=' + JSON.stringify(modals, null,2));
    const buttons = await page.$$eval('button, a', els => els.map(el => ({tag: el.tagName, text: el.innerText.trim(), id: el.id, class: el.className})).filter(x => x.text));
    console.log('BUTTONS=' + JSON.stringify(buttons.slice(0,80), null,2));
    const bodyText = await page.textContent('body');
    console.log('BODY_SNIPPET=' + bodyText.slice(0,1000).replace(/\n/g,' '));
  }
  await browser.close();
})();
