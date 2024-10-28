const express = require('express');
const router = express.Router();
const Person = require('./../models/Person');


router.post('/', async (req, res) => {
  try {
    const data = req.body;  // Assuming the request body contains data

    // create a new Person document using Mongoose Model
    const newPerson = new Person(data);


    // Save New Person to new data base
    const response = await newPerson.save();
    console.log("data saved", response);
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(5000).json({ err: "internal Server error" });
  }



})


// get all information of person

router.get("/", async (req, res) => {
  try {
    const data = await Person.find();
    console.log("data fetched successfully");
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(5000).json({ err: "internal Server error" });
  }
})

router.get("/:workType", async (req, res) => {
  try {
    const workType = req.params.workType;
    // console.log(workType);
    if (workType == 'waiter' || workType == 'chef' || workType == 'manager') {
      const response = await Person.find({ work: workType });
      console.log("Person data fetched ", workType);
      res.status(200).json(response);
    } else {
      res.status(404).json({ error: "Invalid Work Type" });
    }
  } catch (err) {
    console.log(err);
    res.status(5000).json({ err: "internal Server error" });
  }

})

router.put('/:id', async (req, res) => {
  try {
    const personId = req.params.id;  // Extract Id From URL Parameter
    // console.log(personId);
    const updatedPersonData = req.body;
    const response = await Person.findByIdAndUpdate(personId, updatedPersonData, {
      new: true,  //Return The Updated Document
      runValidators: true, // Run Mongoose Validation

    });
    if (!response) {
      return res.status(404).json({ error: "Person Not Found" });

    }
    console.log("Data Updated");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "internal Server error" });
  }
})

router.delete("/:id", async (req, res) => {
  try {
    const personId = req.params.id;
    const response = await Person.findByIdAndDelete(personId)

    if (!response) {
      return res.status(404).json({ error: "Person Not Found" });

    }
    console.log("Data Updated");
    res.status(200).json({ message: 'person deleted successfully' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "internal Server error" });
  }
})

module.exports = router;