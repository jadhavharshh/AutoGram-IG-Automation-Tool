import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import { Request, Response, NextFunction } from 'express';

// Use the stealth plugin to reduce detection.
puppeteer.use(StealthPlugin());

// Helper delay function.
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const scrapeFunction = async (request: Request, response: Response, next: NextFunction): Promise<void> => {

  // Launch browser (set headless: false for debugging)
  const browser = await puppeteer.launch({ headless: false, args: ['--no-sandbox'] });
  const page = await browser.newPage();

  try {
    // 1. Navigate to Instagram login page and log in.
    await page.goto('https://www.instagram.com/accounts/login/', { waitUntil: 'networkidle2' });
    await page.waitForSelector('input[name="username"]', { timeout: 15000 });
    await page.type('input[name="username"]', 'satxnishere', { delay: 100 });
    await page.type('input[name="password"]', 'TrialAccHarsh@1', { delay: 100 });
    await page.click('button[type="submit"]');
    await page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 20000 });
    
    // (Optional) Dismiss any pop-ups if needed.

    // 2. Navigate to the hashtag page.
    await page.goto('https://www.instagram.com/explore/tags/realestateagents/', { waitUntil: 'networkidle2' });
    await page.waitForSelector('a._a6hd[href*="/p/"]', { timeout: 15000 });
    
    // Get the list of posts from the grid.
    let posts = await page.$$('a._a6hd[href*="/p/"]');
    console.log(`Found ${posts.length} posts on the grid.`);
    
    // 3. Loop through each post.
    for (let i = 0; i < posts.length; i++) {
      // Re-fetch post elements to avoid stale references.
      posts = await page.$$('a._a6hd[href*="/p/"]');
      if (i >= posts.length) break;
      const post = posts[i];
      
      // Scroll the post into view and click to open the modal.
      await post.evaluate(el => el.scrollIntoView());
      await post.click();
      console.log(`Clicked post ${i + 1}`);
      
      // Delay to allow modal content to load.
      await delay(2000);
      
      // Wait for the modal dialog to appear.
      await page.waitForSelector('div[role="dialog"]', { timeout: 15000 });
      
      // Wait for the username element to appear inside the modal.
      await page.waitForSelector(
        'div[role="dialog"] a[href^="/"]:not([href*="/p/"])',
        { timeout: 15000 }
      );
      
      // Poll for the username until it is nonempty or max retries reached.
      let username = '';
      const maxRetries = 10;
      for (let j = 0; j < maxRetries; j++) {
        try {
          username = await page.$eval(
            'div[role="dialog"] a[href^="/"]:not([href*="/p/"])',
            el => (el as HTMLElement).textContent?.trim() || ''
          );
        } catch (e) {
          username = '';
        }
        if (username !== '') break;
        await delay(500);
      }
      console.log(`Username from post ${i + 1}: ${username}`);
      
      // Close the modal by pressing Escape.
      await page.keyboard.press('Escape');
      // Wait briefly before processing the next post.
      await delay(2000);
    }
  } catch (error) {
    console.error('An error occurred during scraping:', error);
  } finally {
    await browser.close();
  }
}
