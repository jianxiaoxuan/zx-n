import express from 'express';
import { authGuard } from '../auth/auth.middleware';
import * as imageController from './image.controller';
import { imageInterceptor } from './image.middleware';

const router = express.Router();

/**
 * 上传文件
 */
router.post('/images', authGuard, imageInterceptor, imageController.store);

/**
 * 文件服务
 */
 router.get('/images/:imageId/serve', imageController.serve);

/**
 * 导出路由
 */
export default router;