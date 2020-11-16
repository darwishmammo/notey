const router = require("express").Router();
const userController = require("./controllers/userController");
const noteController = require("./controllers/noteController");

router.post("/register", userController.register);
router.post("/login", userController.login);
router.post(
  "/:username/notes",
  userController.isLoggedIn,
  noteController.create
);
router.get(
  "/:username/notes",
  userController.isLoggedIn,
  userController.getAllNotesByUsername
);
module.exports = router;
