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
    await page.waitForTimeout(1000);
    const after = await page.$$eval('button#cancel-booking-btn', els => els.length);
    const paragraph = await page.$$eval('p', ps => ps.map(p => p.innerText.trim()).filter(Boolean));
    console.log('AFTER=' + after);
    console.log('P_TEXT=' + JSON.stringify(paragraph, null,2));
  }
  await browser.close();
})();
