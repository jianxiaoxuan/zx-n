import express from 'express';
import { accessControl, authGuard } from '../auth/auth.middleware';
import * as courseController from './course.controller';
import { paginate } from './course.middleware';

const router = express.Router();

/**
 * 教程内容列表
 */
router.get('/courses', paginate, courseController.index);

/**
 * 创建教程内容
 */
router.post('/courses', authGuard, courseController.store);

/**
 * 更新教程内容
 */
router.patch('/courses/:courseId', authGuard, accessControl({ possession: true }), courseController.update);

/**
 * 删除教程内容
 */
router.delete('/courses/:courseId', authGuard, accessControl({ possession: true }), courseController.destroy);

/**
 * 单个教程内容
 */
router.get('/courses/:courseId', courseController.show);

/**
 * 添加教程内容标签
 */
router.post('/courses/:courseId/tag', authGuard, accessControl({possession: true}), courseController.storeCourseTag);

/**
 * 导出路由
 */
export default router;