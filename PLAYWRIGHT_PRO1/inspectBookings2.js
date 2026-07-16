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
  const heading = await page.$$eval('h1,h2,h3,h4,h5,h6', els => els.map(el => el.innerText.trim()).filter(Boolean));
  const cancelHtml = await page.$eval('button#cancel-booking-btn', el => el.outerHTML);
  console.log('HEADINGS=' + JSON.stringify(heading, null,2));
  console.log('CANCEL_HTML=' + cancelHtml);
  await browser.close();
})();
