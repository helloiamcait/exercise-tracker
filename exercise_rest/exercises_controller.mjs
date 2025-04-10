import 'dotenv/config';
import express from 'express';
import asyncHandler from 'express-async-handler';
import * as exercises from './exercises_model.mjs';

const app = express();
app.use(express.json())

const PORT = process.env.PORT;

app.listen(PORT, async () => {
  await exercises.connect(false);
  console.log(`Server listening on port ${PORT}...`);
});

app.post('/exercises', asyncHandler(async (req, res) => {
    const name = req.body.name;
    const reps = req.body.reps;
    const weight = req.body.weight;
    const unit = req.body.unit;
    const date = req.body.date;

    const validateReqBody = await exercises.isValidReqBody(name, reps, weight, unit, date);

    if (validateReqBody == false) {
        res.type("json");
        res.status(400).send({ Error: "Invalid request" });
    } else {
        const newExercise = await exercises.createExercise(name, reps, weight, unit, date)
        res.type('json')
        res.status(201).send(newExercise);
    }
}));

app.get('/exercises', asyncHandler(async (req, res) => {
    const getExercises = await exercises.findExercises();
    res.type("json");
    res.status(200).send(getExercises);
}));

app.get('/exercises/:_id', asyncHandler(async (req, res) => {
    const _id = req.params._id
    const getOneExercise = await exercises.findOneExercise(_id)

    if (getOneExercise != undefined && getOneExercise != null) {
        res.type('json')
        res.status(200).send(getOneExercise)
    } else {
        res.type('json')
        res.status(404).send({ Error: "Not found" });
    }
}));

app.put('/exercises/:_id', asyncHandler(async (req, res) => {
  const _id = req.params._id;

  //properties to update
  const name = req.body.name;
  const reps = req.body.reps;
  const weight = req.body.weight;
  const unit = req.body.unit;
  const date = req.body.date;
  
  const validateReqBody = await exercises.isValidReqBody(
    name,
    reps,
    weight,
    unit,
    date
  );

  // return error if req body is invalid
  if (validateReqBody == false) {
    res.type("json");
    res.status(400).send({ Error: "Invalid request" });
  } else {
    // create a dictionary with all properties
    const propertiesToUpadte = {
      name: name,
      reps: reps,
      weight: weight,
      unit: unit,
      date: date,
    };

    // update the defined properties for the user with the given id
    const updateExercise = await exercises.updateOneExercise(
      _id,
      propertiesToUpadte
    );

    // check if the user was found and updated
    if (updateExercise != null) {
      res.type("json");
      res.status(200).send(updateExercise);
    } else {
      res.type("json");
      res.status(404).send({ Error: "Not found" });
    }
  }

}));

app.delete('/exercises/:_id', asyncHandler(async (req, res) => {
    const _id = req.params._id
    // delete the exercise with the given id
    const deleteExercise = await exercises.deleteOneExercise(_id)
    // check if user was deleted
    if (deleteExercise != 0) {
        res.status(204).send()
    } else {
        res.type('json')
        res.status(404).send({ Error: "Not found" });
    }
}));
