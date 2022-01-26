import express from 'express';
import * as tagController from './tag.controller';
import { authGuard } from '../auth/auth.middleware';

const router = express.Router();

/**
 * 创建标签
 */
router.post('/tags', authGuard, tagController.store);

/**
 * 按标签 ID 查找内容列表
 */
 router.get('/courses/tag/:tagId', tagController.courseTagShow);

/**
 * 导出路由
 */
export default router;