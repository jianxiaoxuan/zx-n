import { Request, Response, NextFunction } from 'express';
import multer from 'multer';

/**
 * 创建一个 Multer
 */
const courseFileUpload = multer({
  dest: 'coursefile/',
});

/**
 * 文件拦截器
 */
export const courseFileInterceptor = courseFileUpload.single('file');