import { Request, Response, NextFunction } from 'express';
import _ from 'lodash';
import { createImage, findImageById } from './image.service';

/**
 * 上传文件
 */
export const store = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  // 当前用户
  const {id: userId} = request.user;

  // 文件信息
  const imageInfo = _.pick(request.file, [
    'originalname',
    'mimetype',
    'filename',
  ]);

  try {
    // 保持文件信息
    const data = await createImage({
      ...imageInfo,
      userId
    })

    // 做出响应
    response.status(201).send(data);
  } catch (error) {
    next(error);
  }
}

/**
 * 文件服务
 */
 export const serve = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  // 从抵制参数里得到文件 ID
  const { imageId } = request.params;

  try {
    // 查找文件信息
    const image = await findImageById(parseInt(imageId, 10));

    // 做出响应
    response.sendFile(image.filename, {
      root: 'images',
      headers: {
        'Content-Type': image.mimetype,
      },
    });

  } catch (error) {
    next(error);
  }
};