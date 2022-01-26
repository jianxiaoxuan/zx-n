import express from 'express';
import { authGuard } from '../auth/auth.middleware';
import * as courseFileController from './coursefile.controller';
import { courseFileInterceptor } from './coursefile.middleware';

const router = express.Router();

/**
 * 上传文件
 */
router.post('/coursefiles', authGuard, courseFileInterceptor, courseFileController.store);

/**
 * 文件服务
 */
router.get('/coursefiles/:fileId/serve', courseFileController.serve);

/**
 * 导出路由
 */
export default router;