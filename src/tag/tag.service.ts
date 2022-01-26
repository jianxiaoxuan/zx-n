import { connection } from "../app/database/mysql";
import { TagModel } from "./tag.model";

/**
 * 创建标签
 */
 export const createTag = async (tag: TagModel) => {
  // 准备查询
  const statement = `
    INSERT INTO tag
    SET ?
  `;

  // 执行查询
  const [data] = await connection.promise().query(statement, tag);

  // 提供数据
  return data as any;
};

/**
 * 按名字查找标签
 */
 export const getTagByName = async (
  tagName: string
) => {
  // 准备查询
  const statement = `
    SELECT id, name 
    FROM tag
    WHERE name = ?
  `;

  // 执行查询
  const [data] = await connection.promise().query(statement, tagName);

  // 提供数据
  return data[0];
};


/**
 * 按标签 ID 调取教程内容
 */
 export const getCourseTagById = async (
  tagId: number
) => {
  // 准备查询
  const statement = `
    SELECT 
    course.id,
    course.short,
    course.title,
    tag.id
  FROM
    course
  LEFT JOIN
    course_tag ON course.id = course_tag.courseId
  LEFT JOIN
    tag ON course_tag.tagId = tag.id
  WHERE
    tag.id = ?
  `;

  // 执行查询
  const [data] = await connection.promise().query(statement, tagId);

  // 没找到内容
  if (!data[0].id) {
    throw new Error('NOT_FOUND');
  }

  // 提供数据
  return data;
};