import express from 'express';
import cors from 'cors';
import postRouter from '../post/post.router';
import userRouter from '../user/user.router';
import authRouter from '../auth/auth.router';
import fileRouter from '../file/file.router';
import coursefileRouter from '../coursefile/coursefile.router';
import tagRouter from '../tag/tag.router';
import searchRouter from '../search/search.router';
import imageRouter from '../image/image.router';
import courseRouter from '../course/course.router';
import { defaultErrorHandler } from './app.middleware';

/**
 * 创建应用
 */
const app = express();

/**
 * 跨域资源共享
 */
app.use(cors({
  origin: '*',
  exposedHeaders: 'X-Total-Count'
}));

/**
 * 处理 JSON
 */
app.use(express.json());

/**
 * 路由
 */
app.use(postRouter, courseRouter, userRouter, authRouter, fileRouter, coursefileRouter, tagRouter, imageRouter, searchRouter);

/**
 * 默认异常处理器
 */
app.use(defaultErrorHandler);

/**
 * 导出应用
 */
export default app;