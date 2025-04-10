import mongoose from 'mongoose';
import 'dotenv/config';

const EXERCISE_DB_NAME = "exercise_db";
const EXERCISE_COLLECTION = "exercises";
const EXERCISE_CLASS = 'Exercise'

let connection = undefined;
let Exercise = undefined

/**
 * Connect to MongoDB server, drop EXERCISE_COLLECTION if asked to
 * do so, and create a model class for the exercise schema.
 * @param {Boolean} dropCollection If true, drop EXERCISE_COLLECTION
 */
async function connect(dropCollection){
  try{
    connect = await createConnection();
    console.log("Successfully connected to MongoDB using Mongoose!");
    if(dropCollection){
      await connection.db.dropCollection(EXERCISE_COLLECTION);
    }
    Exercise = createModel();
  } catch(err){
    console.log(err)
    throw Error(`Could not connect to MongoDB ${err.message}`)
  }
}

/**
 * Connect to the MongoDB server for the connect string in .env file
 * @returns A connection to the server
 */
async function createConnection(){
  await mongoose.connect(process.env.MONGODB_CONNECT_STRING,
    {dbName: EXERCISE_DB_NAME});
  return mongoose.connection;
}

/**
 * Define a schema for the exercise collection, compile a model and return the model.
 * @returns A model object for the exerciseSchema
 */
function createModel(){
    const exerciseSchema = mongoose.Schema({
      name: { type: String, required: true },
      reps: { type: Number, required: true },
      weight: { type: Number, required: true },
      unit: { type: String, required: true },
      date: { type: String, required: true }
    });
    return mongoose.model(EXERCISE_CLASS, exerciseSchema)
}

/**
 * Create a new exercise with the given parameters.
 * @param {string} name 
 * @param {number} reps 
 * @param {number} weight 
 * @param {string} unit 
 * @param {string} date 
 * @returns true if all valid parameters, false if any invalid parameters
 */
const isValidReqBody = async (name, reps, weight, unit, date) => {
    if (name == undefined || typeof name != 'string' || name.length < 1) {
        return false
    } else if (reps == undefined || typeof reps != 'number' || reps <= 0) {
        return false
    } else if (weight == undefined || typeof weight != 'number' || weight <= 0) {
        return false
    } else if (unit == undefined || (unit != 'kgs' && unit != 'lbs')) {
        return false
    } else if (date == undefined || isDateValid(date) == false) {
        return false
    }
    return true
}

/**
* Check if date format is correct.
* @param {string} date
* Return true if the date format is MM-DD-YY where MM, DD and YY are 2 digit integers
*/
function isDateValid(date) {
    // Test using a regular expression. 
    // To learn about regular expressions see Chapter 6 of the text book
    const format = /^\d\d-\d\d-\d\d$/;
    return format.test(date);
}

/**
 * Create an exercise with the given parameters.
 * @param {string} name 
 * @param {number} reps 
 * @param {number} weight 
 * @param {string} unit 
 * @param {string} date 
 * @returns new exercise object
 */
const createExercise = async (name, reps, weight, unit, date) => {
    const exercise = new Exercise({ name: name, reps: reps, weight: weight, unit: unit, date: date });
    return exercise.save()
}

/**
 * Get all exercises in the collection.
 * @returns all exercise objects in an array
 */
const findExercises = async () => {
  const allExercises = Exercise.find()
  return allExercises.exec()
}

/**
 * Find exercise with the given _id.
 * @param {string} _id 
 * @returns exercise object
 */
const findOneExercise = async (_id) => {
  const query = Exercise.findOne({_id: _id})
  return query.exec()
}

/**
 * Update the given exercise properties for the exercise 
 * with the given _id.
 * @param {*} _id 
 * @param {*} properties 
 * @returns exercise object if updated, otherwise null
 */
const updateOneExercise = async (_id, properties) => {
  const result = await Exercise.findOneAndUpdate({ _id: _id }, properties, {
    new: true,
  });
  return result;
};

/**
 * Delete the exercise with the given _id.
 * @param {string} _id 
 * @returns count of deleted exercises
 */
const deleteOneExercise = async (_id) => {
  const result = await Exercise.deleteOne({_id: _id})
  return result.deletedCount;
};

export {
  connect,
  createModel,
  isValidReqBody,
  isDateValid,
  createExercise,
  findExercises,
  findOneExercise,
  updateOneExercise,
  deleteOneExercise,
};
