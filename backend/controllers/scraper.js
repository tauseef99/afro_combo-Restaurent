// const puppeteer = require('puppeteer');

// exports.scrapeGoogleReviews = async (req, res) => {
//     const businessURL = req.body.url; // Get the URL from the request body
//     try {
//         const browser = await puppeteer.launch({ headless: true });
//         const page = await browser.newPage();

//         // Navigate to the Google Business Profile URL
//         await page.goto(businessURL, { waitUntil: 'networkidle2' });

//         // Wait for the reviews section to load (this may need adjustment if the selector doesn't work)
//         await page.waitForSelector('div[jsname="TErILd"]', { timeout: 20000 });
        
//         // Extract review data
//         const reviews = await page.evaluate(() => {
//             const reviewElements = document.querySelectorAll('div[jsname="TErILd"]');
//             return Array.from(reviewElements).map((review) => ({
//                 name: review.querySelector('.d4r55')?.innerText || 'Anonymous',
//                 text: review.querySelector('.review-snippet')?.innerText || 'No comment provided.',
//                 rating: review.querySelector('span[aria-label]')?.getAttribute('aria-label') || 'No rating',
//             }));
//         });

//         // Close the browser
//         await browser.close();

//         // Respond with the scraped reviews
//         res.json({ reviews });
//     } catch (error) {
//         console.error('Error scraping reviews:', error.message);
//         res.status(500).json({ message: 'Failed to scrape reviews', error: error.message });
//     }
// };
