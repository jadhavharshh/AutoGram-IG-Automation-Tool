import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import { Request, Response, NextFunction } from "express";

puppeteer.use(StealthPlugin());

export const scrapeFunction = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
  const MAX_PROFILES = 100; // Maximum profiles to scrape
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  await page.setUserAgent(
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
  );
  await page.setViewport({ width: 1280, height: 800 });

  try {
    console.log('🔍 Navigating to Instagram login page...');
    await page.goto('https://www.instagram.com/accounts/login/', { waitUntil: 'networkidle2' });

    console.log('🔐 Entering credentials...');
    await page.type('input[name="username"]', 'satxnishere', { delay: 100 });
    await page.type('input[name="password"]', 'TrialAccHarsh@1', { delay: 100 });
    console.log('🚀 Submitting login form...');
    await page.click('button[type="submit"]');
    await page.waitForNavigation({ waitUntil: 'networkidle2' });

    console.log('✅ Logged in successfully!');
    const hashtag = 'realestateagent';
    const hashtagUrl = `https://www.instagram.com/explore/tags/${hashtag}`;

    console.log(`➡️ Navigating to hashtag page: ${hashtagUrl}`);
    await page.goto(hashtagUrl, { waitUntil: 'networkidle2' });

    let profiles: string[] = [];
    let previousHeight: number;

    while (profiles.length < MAX_PROFILES) {
      console.log(`🔄 Scraping profiles... Current count: ${profiles.length}`);

      // Find all visible posts on the page
      const postLinks = await page.$$eval('article a', (anchors) =>
        anchors.map((a) => a.href).filter((href) => href.includes('/p/'))
      );

      for (const postLink of postLinks) {
        if (profiles.length >= MAX_PROFILES) break;

        try {
          console.log(`🖱️ Clicking on post: ${postLink}`);
          await page.goto(postLink, { waitUntil: 'networkidle2' });

          // Extract the username from the post modal
          const username = await page.evaluate(() => {
            const usernameElement = document.querySelector('a[role="link"][href*="/"]');
            return usernameElement ? usernameElement.getAttribute('href')?.split('/')[1] : null;
          });

          if (username && !profiles.includes(username)) {
            console.log(`🆕 Found username: @${username}`);
            profiles.push(username);
          }
        } catch (postError) {
          console.error(`❌ Error processing post ${postLink}:`, postError);
        }

        // Go back to the hashtag page
        await page.goto(hashtagUrl, { waitUntil: 'networkidle2' });
      }

      // Scroll to load more posts
      previousHeight = await page.evaluate(() => document.body.scrollHeight);
      console.log('⬇️ Scrolling to load more posts...');
      await page.evaluate('window.scrollTo(0, document.body.scrollHeight)');
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const currentHeight = await page.evaluate(() => document.body.scrollHeight);
      if (currentHeight === previousHeight) {
        console.log('🚫 No more content to load. Exiting scroll loop.');
        break;
      }
    }

    console.log(`🎉 Finished scraping. Total profiles collected: ${profiles.length}`);
    response.json({ profiles });

  } catch (error) {
    console.error('❌ An error occurred during scraping:', error);
    next(error);
  } finally {
    await browser.close();
    console.log('🛑 Browser closed.');
  }
};
