const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://bambitheb:$BriDan0293?@cluster0.e1eyore.mongodb.net');

module.exports = mongoose.connection;
