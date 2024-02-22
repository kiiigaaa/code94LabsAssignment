const mongoose = require("mongoose");

var mongoURL = 'mongodb+srv://kishen:kishen@customermanage.utv508z.mongodb.net/Code94LabsAssigment'

mongoose.connect(mongoURL, { useUnifiedTopology: true, useNewUrlParser: true })

var db = mongoose.connection

db.on('connected', () => {
    console.log(`Mongodb Connection Success!`);
})

db.on('error', () => {
    console.log(`Mongodb Connection failed!`);
})

module.exports = mongoose