const { Course, Student, CourseStudent } = require('../models');

const enrollStudentToCourse = async (req, res, next) => {
  try {
    const { courseId, studentId, enrolledOn } = req.body;

    // Check if the course and student exist
    const course = await Course.findByPk(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    const student = await Student.findByPk(studentId);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Check if the student is already enrolled in the course
    const existingEnrollment = await CourseStudent.findOne({
      where: { CourseId: courseId, StudentId: studentId },
    });
    if (existingEnrollment) {
      return res.status(409).json({ message: 'Student is already enrolled in the course' });
    }

    // Create a new entry in the CourseStudent table to enroll the student to the course with the provided enrollment date
    const enrollment = await CourseStudent.create({
      CourseId: courseId,
      StudentId: studentId,
      EnrolledOn: enrolledOn, // Use the provided enrollment date from the request body
    });

    // Optionally, you can do something with the enrollment data or return it in the response
    return res.status(200).json({ message: 'Student enrolled to the course successfully', enrollment });
  } catch (error) {
    next(error);
  }
};

module.exports = { enrollStudentToCourse };
