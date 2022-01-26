import { Request, Response, NextFunction } from 'express';
import _ from 'lodash';
import { createCourseFile, findCourseFileById } from './coursefile.service';

/**
 * 上传文件
 */
 export const store = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  console.log(request.file);
  // 当前用户
  const {id: userId} = request.user;

  // 所属内容
  const {course: courseId} = request.query;

  // 文件信息
  const fileInfo = _.pick(request.file, [
    'originalname',
    'mimetype',
    'filename'
  ]);

  try {
    // 保持文件信息
    const data = await createCourseFile({
      ...fileInfo,
      userId,
      courseId
    })

    // 做出响应
    response.status(201).send(data);
  } catch (error) {
    next(error);
  }
};

/**
 * 文件服务
 */
 export const serve = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  // 从抵制参数里得到文件 ID
  const { fileId } = request.params;

  try {
    // 查找文件信息
    const file = await findCourseFileById(parseInt(fileId, 10));

    // 做出响应
    response.sendFile(file.filename, {
      root: 'coursefile',
      headers: {
        'Content-Type': file.mimetype,
      },
    });

  } catch (error) {
    next(error);
  }
};