const express = require("express");
const { register, login, profile, changePassword } = require("../controllers/adminController");
const router = express.Router();

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/profile').get(profile);
router.route('/changepassword').put(changePassword);

module.exports = router;