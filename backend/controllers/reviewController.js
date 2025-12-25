// const { scrapeGoogleReviews } = require('../controllers/scraper'); // Adjust the path based on where scraper.js is located

// exports.scrapeGoogleReviews = async (req, res) => {
//     const businessURL = req.body.url; // Expecting URL in the request body

//     if (!businessURL) {
//         return res.status(400).json({ message: 'Business URL is required' });
//     }

//     try {
//         const reviews = await scrapeGoogleReviews(businessURL);
//         res.json({ reviews });
//     } catch (error) {
//         console.error('Error scraping reviews:', error.message);
//         res.status(500).json({ message: 'Failed to scrape reviews', error: error.message });
//     }
// };
