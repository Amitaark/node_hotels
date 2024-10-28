const express = require('express');
const router = express.Router();
const MenuItem = require('../models/MenuItem');


//  Post Method to add a menu Item
router.post('/', async (req, res) => {
  try {
    // Assuming that req.body contains data
    const data = req.body;
    console.log(data);
    // create a new MeunItem document using Mongoose Model
    const newMenuItem = new MenuItem(data);
    // Save New MenuItem to new data base
    const response = await newMenuItem.save();
    console.log("Data Saved");
    res.status(200).json(response);

  } catch (err) {
    console.log(err);
    res.status(5000).json({ err: "Internal Server error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const ListMenuItem = await MenuItem.find();
    console.log("ListMenuItem fetched successfully");
    res.status(200).json(ListMenuItem);
  } catch (err) {
    console.log(err);
    res.status(5000).json({ err: "internal Server error" });
  }
});


router.get("/:tastetype", async (req, res) => {
  try {
    const tasteType = req.params.tastetype;
    // console.log(workType);
    if (tasteType == 'sweet' || tasteType == 'spicy' || tasteType == 'sour') {
      const response = await MenuItem.find({ taste: tasteType });
      console.log("Person data fetched ", tasteType);
      res.status(200).json(response);
    } else {
      res.status(404).json({ error: "Invalid Work Type" });
    }
  } catch (err) {
    console.log(err);
    res.status(5000).json({ err: "internal Server error" });
  }

})
// comments added for testing purpose
module.exports = router;