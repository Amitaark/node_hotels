const express = require('express')
const app = express();
const db = require('./db');

// const Person = require('./models/Person');

// const MenuItem = require('./models/MenuItem');

const bodyParser = require('body-parser');
app.use(bodyParser.json());







// import routes files
const personRoutes = require('./routes/personRoutes');
const menuItemRoutes = require('./routes/menuItemRoutes');


// use Routes
app.use("/person", personRoutes);
app.use("/menu", menuItemRoutes);





app.listen(3000, () => {
  console.log("Server Is Running On Port 3000");
});