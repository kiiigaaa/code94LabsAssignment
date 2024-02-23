const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const item = require('./models/itemModel')
const Admin = require('./models/adminModel')
const path = require('path');




const app = express();
const db = require('./db')
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());




const itemRoute = require('./routes/itemsRoute')
const adminRoute = require('./routes/adminRoute')


app.use('/api/items/', itemRoute)
app.use('/api/admins/', adminRoute)
app.use('/images', express.static(path.join(__dirname, 'images')));


app.get("/", (req, res) => {

    res.send("Server Working!");

});


const port = process.env.PORT || 8070;

app.listen(port, () => `Server is up and running on port number: ${port}`);