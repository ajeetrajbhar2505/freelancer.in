// room.js
const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Array of user IDs
    relationships: { type: Map, of: String } // Map of user IDs to relationship flags
});


module.exports = mongoose.model('Room', roomSchema);
