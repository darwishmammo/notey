const router = require("express").Router();
const userController = require("./controllers/userController");
const noteController = require("./controllers/noteController");

router.post("/register", userController.register);
router.post("/login", userController.login);
router.post("/create-note", userController.isLoggedIn, noteController.create);

module.exports = router;
