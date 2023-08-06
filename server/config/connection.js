const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://bambitheb:$BriDan0293?@cluster0.e1eyore.mongodb.net");

module.exports = mongoose.connection;
