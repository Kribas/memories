import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { IPost } from './interface/post.interface';

@Injectable()
export class PostsService {
  constructor(@InjectModel('PostMessage') private postModel: Model<IPost>) {}

  async getPosts(): Promise<IPost[]> {
    try {
      const postMessages = await this.postModel.find();
      return postMessages;
    } catch (error) {
      throw new NotFoundException('Post data not found!');
    }
  }

  async createPost(createPostDto: CreatePostDto): Promise<IPost> {
    const newPost = await new this.postModel(createPostDto);
    return newPost.save();
  }

  async updatePost(
    postId: string,
    updatePostDto: UpdateStudentDto,
  ): Promise<IPost> {
    if (!mongoose.Types.ObjectId.isValid(postId))
      throw new HttpException(
        { status: HttpStatus.BAD_REQUEST, error: `${postId} already exists!` },
        HttpStatus.BAD_REQUEST,
      );
    const existingPost = await this.postModel.findByIdAndUpdate(
      postId,
      updatePostDto,
      { new: true },
    );
    return existingPost;
  }

  async deletePost(postId: string) {
    if (!mongoose.Types.ObjectId.isValid(postId))
      throw new HttpException(
        { status: HttpStatus.BAD_REQUEST, error: `${postId} already exists!` },
        HttpStatus.BAD_REQUEST,
      );
    await this.postModel.findByIdAndRemove(postId);
  }
}
