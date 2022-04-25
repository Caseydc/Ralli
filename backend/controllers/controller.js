//const { Participant } = require("../models/model_participant");
const { Participant } = require("../models/model_participant");
const { Rally } = require("../models/model_rally");

//For rendering the rally list
async function index(req, res) {
  try {
    const Rallies = await Rally.find();
    res.status(201);
    res.send(Rallies);
  } catch (e) {
    console.error(e);
    res.status(500);
  }
}

/* 
async function find (req, res) {
  try {
    const {id} = req.body;
    const oneTask = await ToDo.findById();
    res.status= 200;
    res.send(oneTask)
  } catch (e) {
    console.error(e);
    res.status = 500;
  }
}
*/

//Used in Rally List screen
async function createRally(req, res) {
  try {
    const { rallyName, marker, participants } = req.body;
    const newRally = await Rally.create({ rallyName, marker, participants });
    res.status(201);
    res.send(newRally);
  } catch (error) {
    console.error(error);
    res.status(500);
  }
}

// //For when new users join
// async function createParticipant(req, res) {
//   try {
//     const { userId, latitude, longitude } = req.body;
//     const newParticipant = await Participant.create({
//       userId,
//       latitude,
//       longitude,
//     });
//     res.status(201);
//     res.send(newParticipant);
//   } catch (error) {
//     console.error(error);
//     res.status(500);
//   }
// }

async function updateRally(req, res) {
  try {
    const { id } = req.params; //id of the rally
    const { rallyName, marker, participants } = req.body;
    const updateRally = await Rally.findByIdAndUpdate(id, {
      rallyName,
      marker,
      participants,
    });
    res.status(202);
    res.send(updateRally);
  } catch (error) {
    console.error(error);
    res.status(500);
  }
}

//Not needed at the moment
async function destroy(req, res) {
  try {
    const { id } = req.params;
    const deleteTask = await ToDo.findByIdAndDelete(id);
    res.status(204);
    res.send(deleteTask);
  } catch (error) {
    console.error(error);
    res.status(500);
  }
}
//change the res.status to function
module.exports = { index, createRally, updateRally };
