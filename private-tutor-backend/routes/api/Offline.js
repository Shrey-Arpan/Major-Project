const express = require('express');
const app = express();
const TutorLogDB = require('../../models/TutorLogDB');
const StudDB = require('../../models/StudentLogDB');
const offSearch = express.Router();
app.use(express.json());

offSearch.post('/add-tutor', async (req, res) => {
  try {
    
    const { studentId, ...tutorData } = req.body;

    const student = await StudDB.findById(studentId);

    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }
    const tutorExists = student.tutors.some(tutor => tutor._id.toString() === tutorData._id);

    if (tutorExists) {
      return res.status(400).json({ message: 'Tutor is already added' });
    }
    console.log(tutorExists)
    
    student.tutors.push(tutorData);

    await student.save();

    res.status(200).json({ message: 'Tutor added successfully' });
  } catch (error) {
    console.error('Error occurred during adding tutor:', error);
    res.status(500).json({ error: 'An error occurred during adding tutor' });
  }
});



offSearch.post('/findUsers', async (req, res) => {
  try {

    const { postal, category, specialization, city, section } = req.body;
    // console.log({postal, category, specialization, city, section})
    let searchQuery = {
      subjects: category,
      method: { $in: [section] },
    };

    if (specialization !== "") {
      searchQuery.specialization = specialization;
    }
    if (postal !== "") {
      searchQuery.postal = postal;
    }
    if (city !== "") {
      searchQuery.city = city;
    }

    const searchResults = await TutorLogDB.find(searchQuery);

    res.json({ searchResults, search: "yes" });
    // console.log(searchResults)
  } catch (error) {
    console.error('Error occurred during search:', error);
    res.status(500).json({ error: 'An error occurred during search' });
  }
});

module.exports = offSearch;