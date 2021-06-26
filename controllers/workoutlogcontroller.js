let Express = require('express');
let router = Express.Router();
let validateJWT = require('../middleware/validate-jwt');
//Import the Workoutlog Model
const { WorkoutlogModel } = require('../models');
const Workoutlog = require('../models/workoutlog');

router.get('/practice', validateJWT, (req, res) => {
  res.send('Hey, this is a practice route');
});
/*
==================
Workout log Create
==================
*/
router.post('/create', validateJWT, async (req, res) => {
  const { description, definition, results } = req.body.workoutlog;
  const { id } = req.user;
  const workoutlogEntry = {
    description,
    definition,
    results,
    owner: id,
  };
  try {
    const newWorkoutlog = await WorkoutlogModel.create(workoutlogEntry);
    res.status(200).json(newWorkoutlog);
  } catch (err) {
    res.status(500).json({ error: err });
  }
  WorkoutlogModel.create(workoutlogEntry);
});

/*
====================
Get all workout logs
====================
*/

router.get('/', async (req, res) => {
  try {
    const entries = await WorkoutlogModel.findAll();
    res.status(200).json(entries);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

/*
=============================
Get Workout logs by user
=============================
*/
router.get('/mine', validateJWT, async (req, res) => {
  const { id } = req.user;
  try {
    const userWorkoutlogs = await WorkoutlogModel.findAll({
      where: {
        owner: id,
      },
    });
    res.status(200).json(userWorkoutlogs);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

/*
==============================
Get Workout logs by description
==============================
*/
router.get('/:description', async (req, res) => {
  const { description } = req.params;
  try {
    const desc = await WorkoutlogModel.findAll({
      where: { description: description },
    });
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

/*
====================
Update a Workout log
====================
*/
router.put('/update/:resultsId', validateJWT, async (req, res) => {
  const { description, definition, results } = req.body.workoutlog;
  const workoutlogId = req.params.resultsId;
  const userId = req.user.id;

  const query = {
    where: {
      id: workoutlogId,
      owner: userId,
    },
  };

  const updatedWorkoutlog = {
    description: description,
    definition: definition,
    results: results,
  };

  try {
    const update = await WorkoutlogModel.update(updatedWorkoutlog, query);
    res.status(200).json(update);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

/*
====================
Delete a Workout log
====================
*/
router.delete('/delete/:id', validateJWT, async (req, res) => {
  const ownerId = req.user.id;
  const workoutlogId = req.params.id;

  try {
    const query = {
      where: {
        id: workoutlogId,
        owner: ownerId,
      },
    };

    await WorkoutlogModel.destroy(query);
    res.status(200).json({ message: 'Workout Entry Removed' });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});
//router.get('/about', (req, res) => {
//res.send('This is the about route');
//});

module.exports = router;
