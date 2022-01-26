import { connection } from "../app/database/mysql";
import { GetPostsOptions } from "../post/post.service";
import { CourseModel } from "./course.model";

/**
 * 获取教程内容列表
 */
export interface GetCoursesOptionsPagination {
  limit: number;
  offset: number;
}

export interface GetCoursesOptions {
  paginations?: GetCoursesOptionsPagination
}

export const getCourses = async (options: GetCoursesOptions) => {

  const {paginations:{limit, offset}} = options;

  // SQL 参数
  let params: Array<any> = [limit, offset];

  const statement = `
    SELECT
      course.id,
      course.title,
      course.short,
      course.content,
      JSON_OBJECT(
        'id', user.id,
        'name', user.name
      ) as user,
      CAST(
      IF(
        COUNT(tag.id),
        CONCAT(
          '[',
            GROUP_CONCAT(
              DISTINCT JSON_OBJECT(
                'id', tag.id,
                'name', tag.name
              )
            ),
          ']'
        ),
        NULL
      ) as JSON
    ) as tags,
    JSON_ARRAYAGG(
      IF(
        course_file.id,
        JSON_OBJECT(
        'id', course_file.id
        ),
        NULL
      )
    ) as files
    FROM course
    LEFT JOIN user
      ON user.id = course.userId
    LEFT JOIN course_file
      ON course_file.courseId = course.id
    LEFT JOIN
      course_tag ON course_tag.courseId = course.id
    LEFT JOIN
      tag ON course_tag.tagId = tag.id
    GROUP BY 
      course.id
    ORDER BY course.id DESC
    LIMIT ?
    OFFSET ?
  `;

  const [data] = await connection.promise().query(statement, params);

  return data;
};

/**
 * 创建教程内容
 */
 export const createCourse = async (
  course: CourseModel
) => {
  // 准备查询
  const statement = `
    INSERT INTO course
    SET ?
  `;

  // 执行查询
  const [data] = await connection.promise().query(statement, course);

  // 提供数据
  return data;
};

/**
 * 更新教程内容
 */
 export const updateCourse = async (courseId: number, course: CourseModel) => {
  // 准备查询
  const statement = `
    UPDATE course
    SET ?
    WHERE id = ?
  `;

  // 执行查询
  const [data] = await connection.promise().query(statement, [course, courseId]);

  // 提供数据
  return data;
};

/**
 * 删除教程内容
 */
 export const deleteCourse = async (courseId: number) => {
  // 准备查询
  const statement = `
    DELETE FROM course
    WHERE id = ?
  `;

  // 执行查询
  const [data] = await connection.promise().query(statement, courseId);

  // 提供数据
  return data;
};

/**
 * 按 ID 调取教程内容
 */
 export const getCourseById = async (
  courseId: number
) => {
  // 准备查询 
  const statement = `
    SELECT 
      course.id,
      course.title,
      course.content,
      course.short,
      tag.id as tagId,
      JSON_OBJECT(
        'id', course_file.id
      ) as file
      FROM course
      LEFT JOIN user
        ON user.id = course.userId
      LEFT JOIN course_file
        ON course_file.courseId = course.id
      LEFT JOIN
        course_tag ON course_tag.courseId = course.id
      LEFT JOIN
        tag ON course_tag.tagId = tag.id
      WHERE course.id = ?
  `;

  // 执行查询
  const [data] = await connection.promise().query(statement, courseId);

  // 没找到内容
  if (!data[0].id) {
    throw new Error('NOT_FOUND');
  }

  // 提供数据
  return data[0];
};

/**
 * 保存教程内容标签
 */
 export const createCourseTag = async (
  courseId: number, tagId: number
) => {
  // 准备查询
  const statement = `
    INSERT INTO course_tag (courseId, tagId)
    VALUES(?, ?)
  `;

  // 执行查询
  const [data] = await connection.promise().query(statement, [courseId, tagId]);

  // 提供数据
  return data;
};

/**
 * 检查教程内容标签
 */
 export const courseHasTag = async (
  courseId: number, tagId: number
) => {
  // 准备查询
  const statement = `
    SELECT * FROM course_tag
    WHERE courseId=? AND tagId=?
  `;

  // 执行查询
  const [data] = await connection.promise().query(statement, [courseId, tagId]);

  // 提供数据
  return data[0] ? true : false;
};

// /**
//  * 统计内容数量
//  */
//  export const getCoursesTotalCount = async (
//   options: GetPostsOptions
// ) => {
//   const {filter} = options;

//   // SQL 参数
//   let params = [filter.params];

//   console.log(filter.param);

//   // 准备查询
//   const statement = `
//     SELECT
//       COUNT(DISTINCT course.id) as total
//     FROM course
//     LEFT JOIN user
//       ON user.id = course.userId
//     LEFT JOIN course_file
//       ON course_file.courseId = course.id
//     LEFT JOIN
//       course_tag ON course_tag.courseId = course.id
//     LEFT JOIN
//       tag ON course_tag.tagId = tag.id
//     WHERE ${filter.sql}
//   `;

//   // 执行查询
//   const [data] = await connection.promise().query(statement, params);

//   // 提供结果
//   return data[0].total;
// };