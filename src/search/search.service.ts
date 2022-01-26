import { connection } from "../app/database/mysql";

/**
 * 搜索标题1
 */
interface SearchTitleOptions {
  name?: string;
}

export interface GetCoursesOptionsPagination {
  limit: number;
  offset: number;
}

export interface GetCourseOptions {
  pagination?: GetCoursesOptionsPagination;
}

export const searchTitle = async ( options: SearchTitleOptions, option: GetCourseOptions, ina: GetCourseOptions) => {
  // 结构选项
  const {name} = options;
  const {pagination: {limit}} = option;
  const {pagination: {offset}} = ina;

  // SQL 参数
  const params: Array<any> = [`%${name}%`];
  let param: Array<any> = [limit];
  let para: Array<any> = [offset];

  // 准备查询
  const statement = `
    SELECT 
      course.id,
      course.title,
      course.short,
      tag.id as tagId
    FROM
      course
    LEFT JOIN
      course_tag ON course.id = course_tag.courseId
    LEFT JOIN
      tag ON course_tag.tagId = tag.id
    WHERE
      tag.id = 1 AND course.title LIKE ?
    ORDER BY course.id DESC
    LIMIT ?
    OFFSET ?
  `;

  // 执行查询
  const [data] = await connection.promise().query(statement, [params, param, para ]);

  // 提供数据
  return data as any;
}

/**
 * 搜索标题2
 */
export const searchTitleto = async (options: SearchTitleOptions, option: GetCourseOptions, ina: GetCourseOptions) => {
  // 结构选项
  const {name} = options;
  const {pagination: {limit}} = option;
  const {pagination: {offset}} = ina;

  // SQL 参数
  const params: Array<any> = [`%${name}%`];
  let param: Array<any> = [limit];
  let para: Array<any> = [offset];

  // 准备查询
  const statement = `
    SELECT 
      course.id,
      course.title,
      course.short,
      tag.id as tagId
    FROM
      course
    LEFT JOIN
      course_tag ON course.id = course_tag.courseId
    LEFT JOIN
      tag ON course_tag.tagId = tag.id
    WHERE
      tag.id = 2 AND course.title LIKE ?
    ORDER BY course.id DESC
    LIMIT ?
    OFFSET ?
  `;

  // 执行查询
  const [data] = await connection.promise().query(statement, [params, param, para ]);

  // 提供数据
  return data as any;
}

