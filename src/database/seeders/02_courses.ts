import 'tsconfig-paths/register';
import { Knex } from 'knex';
import { Course } from '../../models/course-model';

const bcrypt = require('bcrypt');

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex(Course.tableName).del();

  const data: Course[] = [
    {
        title: 'Test Course',
        slug: 'test course',
        mentor: 'Test Mentor',
        description: 'Test course pertama',
        image: 'https://res.cloudinary.com/dh6ubetfq/image/upload/v1754872891/courses/gphg0tswpc7rj1p2htdb.webp',
    },
  ];

  // Inserts seed entries
  await knex(Course.tableName).insert(data);
};