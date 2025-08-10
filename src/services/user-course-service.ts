
import { UserCourse } from '../models/user-course-model';
import * as userCourseRepository from '../repositories/user-course-repository';

export const enrollUserToCourse = async (userId: number, courseId: number) => {
  return await UserCourse.query().insert({
    user_id: userId,
    course_id: courseId
  });
};

export const getAllUserCourses = async () => {
  return await userCourseRepository.getAllUserCourses();
};
