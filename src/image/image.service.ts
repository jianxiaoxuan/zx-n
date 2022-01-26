import { connection } from "../app/database/mysql";
import {ImageModel} from './image.model';

/**
 * 存储文件信息
 */
 export const createImage = async (
  image: ImageModel
) => {
  // 准备查询
  const statement = `
    INSERT INTO image
    SET ?
  `;

  // 执行查询
  const [data] = await connection.promise().query(statement, image);

  // 提供数据
  return data;
};

/**
 * 按 ID 查找文件
 */
 export const findImageById = async (
  imageId: number
) => {
  // 准备查询
  const statement = `
    SELECT * FROM image
    WHERE id = ?
  `;

  // 执行查询
  const [data] = await connection.promise().query(statement, imageId);

  // 提供数据
  return data[0];
};