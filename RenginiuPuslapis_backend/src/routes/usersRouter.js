const express = require("express");
const router = express.Router();
const {
  registerUser,
  getUser,
  loginUser,
  updateUser,
  deleteUserHandler,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

/* GET users listing. */
router.get("/get", protect, getUser);
/* Register user */
router.post("/register", registerUser);
/* Login user */
router.post("/login", loginUser);
/* Update user */
router.patch(["/update/:id", "/update"], protect, updateUser);

router.delete("/user/delete/:userId", protect, deleteUserHandler);

module.exports = router;
