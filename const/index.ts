export interface Post {
  body: string;
  id: number;
  reactions: number;
  tags: string[];
  title: string;
  userId: number;
}

export interface Data {
  limit: number;
  posts: Post[];
  skip: number;
  total: number;
}
