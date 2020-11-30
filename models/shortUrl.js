const mongoose = require('mongoose');
const shortid = require('shortid');

const shortUrlStruct = new mongoose.Schema({
    inteira:
    {
        type: String,
        required: true
    },
    encurtada:
    {
        type: String,
        required: true,
        default: shortid.generate
    },
    cliques:
    {
        type: Number,
        required: true,
        default:0
    }
});
module.exports = mongoose.model('UrlEncurtada',shortUrlStruct);