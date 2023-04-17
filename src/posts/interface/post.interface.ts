export interface IPost extends Document {
  readonly title: string;
  readonly message: string;
  readonly creator: string;
  readonly tags: string[];
  readonly selectedFile: string;
  readonly likeCount: Number;
  readonly createdAt: Date;
}
