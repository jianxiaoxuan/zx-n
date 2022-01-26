import { Request, Response, NextFunction } from 'express';
import multer from 'multer';

/**
 * 创建一个 Multer
 */
 const imageUpload = multer({
  dest: 'images/',
});

/**
 * 文件拦截器
 */
 export const imageInterceptor = imageUpload.single('file');