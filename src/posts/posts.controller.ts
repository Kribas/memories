import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postService: PostsService) {}

  @Get()
  async getPosts(@Res() response) {
    try {
      const postData = await this.postService.getPosts();
      return response.status(HttpStatus.OK).json(postData);
    } catch (error) {
      return response.status(error.status).json(error.response);
    }
  }

  @Post()
  async createPost(@Res() response, @Body() createPostDto: CreatePostDto) {
    try {
      const newPost = await this.postService.createPost(createPostDto);
      return response.status(HttpStatus.CREATED).json(newPost);
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: Post not created!',
        error: 'Bad Request',
      });
    }
  }

  @Put('/:id')
  async updatePost(
    @Res() response,
    @Param('id') postId: string,
    @Body() updatePostDto: UpdateStudentDto,
  ) {
    try {
      const existingPost = await this.postService.updatePost(
        postId,
        updatePostDto,
      );
      return response.status(HttpStatus.OK).json(existingPost);
    } catch (error) {
      return response.status(error.status).json(error.response);
    }
  }

  @Delete('/:id')
  async deletePost(@Res() response, @Param('id') postId: string) {
    try {
      await this.postService.deletePost(postId);
      return response
        .status(HttpStatus.OK)
        .json({ message: 'Post deleted successfully' });
    } catch (error) {
      return response.status(error.status).json(error.message);
    }
  }
}
