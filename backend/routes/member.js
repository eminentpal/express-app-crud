const express = require("express");
const router = express.Router();
const {
  membersList,
  newMember,
  updateMember,
  deleteMember,
} = require("../controllers/member");

router.route("/members").get(membersList);
router.route("/members/new").post(newMember);
router.route("/members/:id").put(updateMember);
router.route("/members/:id").delete(deleteMember);
module.exports = router;
