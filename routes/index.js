const router = require("express").Router();

const StudentRoutes = require("./student");
const TeacherRoutes = require("./teacher");
const AdminRoutes = require("./admin");

router.use("/student", StudentRoutes);
router.use("/teacher", TeacherRoutes);
router.use("/admin", AdminRoutes);

module.exports = router;