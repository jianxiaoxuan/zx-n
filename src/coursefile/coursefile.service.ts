import { connection } from '../app/database/mysql';
import { CourseFileModel } from './coursefile.model';

/**
 * 存储文件信息
 */
 export const createCourseFile = async (
  file: CourseFileModel
) => {
  // 准备查询
  const statement = `
    INSERT INTO course_file
    SET ?
  `;

  // 执行查询
  const [data] = await connection.promise().query(statement, file);

  // 提供数据
  return data;
};

/**
 * 按 ID 查找文件
 */
 export const findCourseFileById = async (
  fileId: number
) => {
  // 准备查询
  const statement = `
    SELECT * FROM course_file
    WHERE id = ?
  `;

  // 执行查询
  const [data] = await connection.promise().query(statement, fileId);

  // 提供数据
  return data[0];
};