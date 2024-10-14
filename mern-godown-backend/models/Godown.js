const mongoose = require('mongoose');

const godownSchema = new mongoose.Schema({
    godown_id: { type: String, required: true },
    name: { type: String, required: true },
    parent_godown: { type: String }
});

module.exports = mongoose.model('Godown', godownSchema);