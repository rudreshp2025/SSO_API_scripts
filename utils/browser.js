  const { chromium } = require('@playwright/test');
 


class browser{

async launchurl(url){

  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({storageState: undefined}); // incognito page
  const page = await context.newPage();

  await page.goto(url,{timeout: 60000,});

  await page.waitForURL(/token=/, { timeout: 60000 });

  const currenturl = page.url();

  await browser.close();

 return currenturl;

}


}
module.exports = new browser();