export class FileModel {
  id?: string;
  originalname: string;
  mimetype: string;
  filename: string;
  size: number;
  url: string;
  userId: number;
  postId?: number;
}