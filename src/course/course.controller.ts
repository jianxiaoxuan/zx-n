import { Request, Response, NextFunction } from 'express';
import _ from 'lodash';
import { getCourses, createCourse, updateCourse, deleteCourse, getCourseById, createCourseTag, courseHasTag } from './course.service';
import { TagModel } from '../tag/tag.model';
import { getTagByName, createTag } from '../tag/tag.service';

/**
 * 教程内容列表
 */
 export const index = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  // try {
  //   // 统计内容数量
  //   const totalCount = await getCoursesTotalCount({filter: request.filter});

  //   // 设置响应头部
  //   response.header('X-Total-Count', totalCount);
  // } catch (error) {
  //   next(error);
  // }

  try {
    const courses = await getCourses({paginations: request.paginations});

    response.send(courses);
  } catch (error) {
    next(error);
  }
};

/**
 * 创建教程内容
 */
 export const store = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  // 准备数据
  const {title, short, content} = request.body;

  // 创建内容
  try {
    const data = await createCourse({title, short, content});
    response.status(201).send(data);
  } catch (error) {
    next(error);
  }
};

/**
 * 更新教程内容
 */
 export const update = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  // 获取教程内容 ID
  const {courseId} = request.params;

  // 准备数据
  const course = _.pick(request.body, ['title', 'short', 'content']);

  // 更新
  try {
    const data = await updateCourse(parseInt(courseId, 10), course);
    response.send(data);
  } catch (error) {
    next(error);
  }
};

/**
 * 删除教程内容
 */
 export const destroy = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  // 获取教程内容 ID
  const {courseId} = request.params;

  // 删除内容
  try {
    const data = await deleteCourse(parseInt(courseId, 10));
    response.send(data);
  } catch (error) {
    next(error);
  }
};

/**
 * 单个内容
 */
 export const show = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  // 准备数据
  const { courseId } = request.params;

  // 调取内容
  try {
    const course = await getCourseById(parseInt(courseId, 10));

    // 做出响应
    response.send(course);
  } catch (error) {
    next(error);
  }
};

/**
 * 添加教程内容标签
 */
 export const storeCourseTag = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  // 准备数据
  const {courseId} = request.params;
  const {name} = request.body;

  let tag: TagModel;

  // 查找标签
  try {
    tag = await getTagByName(name);
  } catch (error) {
    return next(error);
  }

  // 找到标签，验证内容标签
  if(tag) {
    try {
      const courseTag = await courseHasTag(parseInt(courseId, 10), tag.id);
      if(courseTag) return next(new Error('POST_ALREADY_HAS_THIS_TAG'));
    } catch (error) {
      return next(error);
    }
  }

  // 没找到标签，创建这个标签
  if (!tag) {
    try {
      const data = await createTag({name});
      tag = {id: data.insertId};
    } catch (error) {
      return next(error);
    }
  }

  // 给内容打上标签
  try {
    await createCourseTag(parseInt(courseId, 10), tag.id);
    response.sendStatus(201);
  } catch (error) {
    return next(error);
  }
};