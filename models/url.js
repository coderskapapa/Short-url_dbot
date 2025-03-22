const mongoose = require('mongoose');

const urlSchema = mongoose.Schema({
    shortId: {
        type: String,
        required: true,
        unique: true
    },
    redirectURL: {
        type: String,
        required: true,
    },
    visithistory: [ { timestamp:{ type: Number } } ],
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 172800
    }
});

const URL = mongoose.model("url", urlSchema);

module.exports = URL;

