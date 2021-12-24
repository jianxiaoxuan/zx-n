import {TokenPayload} from '../src/auth/auth.interface';
import {GetPostsOptionsFilter} from '../src/post/post.service'

declare global {
  namespace Express {
    export interface Request {
      user: TokenPayload;
      sort: string;
      filter: GetPostsOptionsFilter;
    }
  }
}