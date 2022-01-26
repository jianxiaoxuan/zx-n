import express from 'express';
import * as searchController from './search.controller';
import { paginate } from './search.middlewaer';

const router = express.Router();

/**
 * 搜索标题
 */
router.get('/search/courses/tag1', paginate, searchController.courseTitle);

/**
 * 搜索标题2
 */
 router.get('/search/courses/tag2', paginate, searchController.courseTitleto);

/**
 * 默认导出
 */
export default router;