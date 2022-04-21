const Member = require("../models/member");

exports.membersList = async (req, res) => {
  try {
    const members = await Member.find();

    // console.log(members);

    if (members.length === 0) {
      res.status(404).json({
        message: "No members found",
      });
    } else {
      res.status(200).json({
        success: true,
        members,
      });
    }
  } catch (error) {
    res.status(400).json({
      error: "Something went wrong!",
    });
  }
};

exports.newMember = async (req, res) => {
  // console.log(req.body);

  const {
    fullname,
    age,
    mobile,
    illness,
    hightWight,
    payment,
    package,
    trainer,
  } = req.body;

  try {
    const data = await Member.create({
      fullname,
      age,
      mobile,
      illness,
      hightWight,
      payment,
      package,
      trainer,
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

exports.updateMember = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    console.log(id);
    console.log("j");
    const member = await Member.findById(id);
    console.log("j");
    console.log({ mem: member });
    if (!member) {
      res.status(404).json({
        error: "No Member found with that ID!",
      });
    } else {
      const data = await Member.findByIdAndUpdate(id, req.body, {
        new: true,
        //        runValidators: true,
        //        useFindAndModify: fals
      });
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
exports.deleteMember = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const member = await Member.findById(id);
    console.log("df");
    if (!member) {
      res.status(404).json({
        error: "No member found with that ID!",
      });
    } else {
      const data = await Member.findByIdAndRemove(id);
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
