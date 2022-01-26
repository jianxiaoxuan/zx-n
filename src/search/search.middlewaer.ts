import { Request, Response, NextFunction } from 'express';
import { POSTS_PER_PAGE } from '../app/app.config';

/**
 * 内容分页
 */
 export const paginate = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  // 当前页码
  const {page = 1} = request.query;

  // 每页内容数量
  const limit = POSTS_PER_PAGE || 30;

  // 计算出偏移量
  const offset = limit * ( parseInt(`${page}`, 10) - 1 );

  // 设置请求中的分页
  request.pagination = { limit, offset };

  // 下一步
  next();
};