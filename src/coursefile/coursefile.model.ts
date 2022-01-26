export class CourseFileModel {
  id?: string;
  originalname: string;
  mimetype: string;
  filename: string;
  userId: number; 
  courseId?: number;
}