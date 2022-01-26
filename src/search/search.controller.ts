import { Request, Response, NextFunction } from 'express';
import { searchTitle, searchTitleto } from './search.service';

/**
 * 搜索标题1
 */
 export const courseTitle = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    // 准备关键词
    const {name} = request.query;

    // 查询标题
    const courseTitle = await searchTitle({name:`${name}`},{pagination: request.pagination},{pagination: request.pagination});

    // 做出响应
    response.send(courseTitle);
  } catch (error) {
    next(error);
  }
};

/**
 * 搜索标题2
 */
 export const courseTitleto = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    // 准备关键词
    const {name} = request.query;

    // 查询标题
    const courseTitle = await searchTitleto({name:`${name}`},{pagination: request.pagination},{pagination: request.pagination});

    // 做出响应
    response.send(courseTitle);
  } catch (error) {
    next(error);
  }
};