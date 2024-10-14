const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    item_id : { type: String, required: true },
    name: { type: String, required: true },
    category: String,
    quantity: Number,
    godown_id: { type: String, required: true },
    price: Number,
    status: String,
    brand: String,
    attributes: Object,
    image_url: String,
});

module.exports = mongoose.model('Item', itemSchema);