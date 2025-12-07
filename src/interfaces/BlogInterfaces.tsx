export interface HomeBlog {
  _id: string;
  title: string;
  description: string;
  category: string;
  views: number;
  image: string;
  created_at: string;
};

export interface BlogData {
  _id: string | null;
  title: string;
  description: string;
  image: string;
  views: number;
  category: string;
  likes: {
    blogId: string;
    userId: string;
  }[];
  comments: {
    _id: string;
    username: string;
    comment: string;
    blogId: string;
    userId: string;
  }[];
}