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
    // Login to Instagram
    await page.goto('https://www.instagram.com/accounts/login/', {
      waitUntil: 'networkidle2',
    });

    await page.type('input[name="username"]', 'codewithsatxn', { delay: 100 });
    await page.type('input[name="password"]', 'HarshJ@123', { delay: 100 });
    await page.click('button[type="submit"]');
    await page.waitForNavigation({ waitUntil: 'networkidle2' });

    console.log('Logged in successfully!');
    const hashtag = 'realestateagent';
    const hashtagUrl = `https://www.instagram.com/explore/tags/${hashtag}`;

    // Navigate to hashtag page
    await page.goto(hashtagUrl, { waitUntil: 'networkidle2' });
    console.log(`Navigated to hashtag page: ${hashtagUrl}`);

    const usernames = new Set<string>(); // Store unique usernames

    let previousHeight = 0;
    let retries = 0;

    while (usernames.size < MAX_PROFILES) {
      // Wait for posts to load
      await page.waitForSelector('article a[href*="/p/"]', { visible: true });

      // Get links to posts
      const postLinks = await page.$$eval('article a[href*="/p/"]', (anchors) =>
        anchors.map((a) => a.href)
      );

      console.log(`Found ${postLinks.length} post links on this load.`);

      // Visit each post to extract usernames
      for (const link of postLinks) {
        if (usernames.size >= MAX_PROFILES) break;

        try {
          await page.goto(link, { waitUntil: 'networkidle2' });
          const username = await page.$eval('header a[href^="/"]', (el) => el.textContent?.trim());
          if (username) {
            usernames.add(username);
            console.log(`Extracted username: ${username}`);
          }
        } catch (err) {
          console.warn(`Failed to extract username for post: ${link}`);
        }
      }

      // Scroll to load more posts
      previousHeight = await page.evaluate(() => document.body.scrollHeight);
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await new Promise(resolve => setTimeout(resolve, 2000)); // Wait for new posts to load

      const newHeight = await page.evaluate(() => document.body.scrollHeight);
      if (newHeight === previousHeight) {
        retries++;
        console.log('No more content to load. Retrying...');
        if (retries > 3) break; // Exit if retries exceed 3 attempts
      } else {
        retries = 0; // Reset retries if new content loads
      }
    }

    console.log('Scraping complete. Total usernames:', usernames.size);
    response.status(200).json({ usernames: Array.from(usernames) });
  } catch (error) {
    console.error('Error:', error);
    response.status(500).json({ error: 'An error occurred during scraping.' });
  } finally {
    await browser.close();
  }
};
