const express = require('express');
const router = express.Router();
const { handleGenerateNewUrl, handleGetAnalytics, handleDeleteUrl } = require('../controllers/url')

router.post("/", handleGenerateNewUrl)

router.get("/analytics/:shortId", handleGetAnalytics)

router.post("/delete/:shortId", handleDeleteUrl);

module.exports = router;
