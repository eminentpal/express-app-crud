const express = require("express");
const router = express.Router();
const {
  trainersList,
  newTrainer,
  updateTrainer,
  deleteTrainer,
} = require("../controllers/trainer");

router.route("/trainers").get(trainersList);
router.route("/trainers/new").post(newTrainer);
router.route("/trainers/:id").put(updateTrainer);
router.route("/trainers/:id").delete(deleteTrainer);

module.exports = router;
