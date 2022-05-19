const Trainer = require("../models/trainer");

exports.trainersList = async (req, res) => {
  try {
    // const trainers = await Trainer.find({ user: req.user.id });
    const trainers = await Trainer.find();

    console.log(trainers);
    // console.log(trainers);

    if (trainers.length === 0) {
      res.status(404).json({
        message: "No trainers found",
      });
    } else {
      res.status(200).json({
        success: true,
        trainers,
      });
    }
  } catch (error) {
    res.status(400).json({
      error: "Something went wrong!",
    });
  }
};

exports.newTrainer = async (req, res) => {
  // console.log(req.body);

  const { fullname, age, mobile, package, salary } = req.body;

  try {
    const data = await Trainer.create({
      fullname,
      age,
      mobile,

      package,
      salary,
      // user: req.user.id,
    });

    console.log(data);

    res.status(201).json({
      success: true,
      data,
    });
  } catch (err) {
    res.status(400).json({
      error: "Failed! Please try again later.",
    });
  }
};

exports.updateTrainer = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    console.log(id);
    console.log("j");
    const trainer = await Trainer.findById(id);
    console.log(trainer);
    if (!trainer) {
      res.status(404).json({
        error: "No trainer found with that ID!",
      });
    } else {
      const data = await Trainer.findByIdAndUpdate(id, req.body, {
        new: true,
        //        runValidators: true,
        //        useFindAndModify: fals
      });

      console.log(data);
      res.status(200).json({
        success: true,
        data,
      });
    }
  } catch (error) {
    res.status(400).json({ error: "Something went wrong" });
  }
};

//Api for delete request
exports.deleteTrainer = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const trainer = await Trainer.findById(id);
    console.log("df");
    if (!trainer) {
      res.status(404).json({
        error: "No trainer found with that ID!",
      });
    } else {
      const data = await Trainer.findByIdAndRemove(id);
      console.log(data);
      res.status(200).json({
        success: true,
      });
    }
  } catch (error) {
    res.status(400).json({
      error: "Something went wrong!",
    });
  }
};
