const router = require("express").Router();
const userController = require("./controllers/userController");
const noteController = require("./controllers/noteController");
const cors = require("cors");

router.use(cors());

router.post("/register", userController.register);
router.post("/login", userController.login);
router.post(
  "/:username/notes",
  userController.isLoggedIn,
  noteController.create
);
router.get("/:username/notes", userController.getAllNotesByUsername);
router.get(
  "/:username/notes/:id",
  userController.isLoggedIn,
  noteController.getSingleNote
);
router.post(
  "/:username/notes/:id",
  userController.isLoggedIn,
  noteController.editNote
);

router.delete("/:username/notes/:id", noteController.deleteNote);
module.exports = router;
