const shortid = require('shortid');
const validator = require('validator');

const URL = require('../models/url');

async function handleGenerateNewUrl(req, res) {
    const { url, customShortId } = req.body;
    if (!url) return res.status(400).json({ success: false, message: 'URL is required' });

    let shortID = customShortId || shortid.generate();

    // Validate the URL
    if (!validator.isURL(url)) {
        return res.status(400).json({ success: false, message: "Invalid URL" });
    }
    
    // Validate custom short ID
    if (customShortId) {
        if (!validator.isAlphanumeric(customShortId) || customShortId.length > 10) {
            return res.status(400).json({ success: false, message: "Only alphanumeric characters are allowed and the length should not exceed 10 characters." });
        }
    }

    const existingUrl = await URL.findOne({ shortId: shortID });
    if (existingUrl) return res.status(400).json({ success: false, message: 'Custom short ID is already in use' });

    await URL.create({
        shortId: shortID,
        redirectURL: url,
        visithistory: [],
        createdAt: Date.now()
    });

  return res.json({ success: true, shortUrl: `https://shatty.onrender.com/${shortID}` });
}

async function handleGetAnalytics(req, res) {
    const shortId = req.params.shortId;
    const result = await URL.findOne({ shortId });
    res.json({
        No_of_visits: result.visithistory.length,
        Visithistory: result.visithistory
    });
}

async function handleDeleteUrl(req, res) {
    const shortId = req.params.shortId;
    await URL.deleteOne({ shortId });
    res.redirect("/");
}

module.exports = { handleGenerateNewUrl, handleGetAnalytics, handleDeleteUrl };
