import { UserCourse } from '../models/user-course-model';

export const getEnrolledCoursesByUserId = async (userId: number) => {
  return await UserCourse.query()
    .where('user_id', userId)
    .withGraphFetched('course');
};

export const getAllUserCourses = async () => {
  return await UserCourse.query()
    .withGraphFetched('[user, course]')
    .orderBy('enrolled_at', 'desc');
};
